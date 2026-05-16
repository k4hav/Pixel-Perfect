/**
 * Core image processing using Canvas API — runs 100% client-side.
 */

export async function processImage(imageData, settings) {
  return new Promise((resolve, reject) => {
    try {
      const img = new window.Image();
      img.onload = async () => {
        // Determine target dimensions
        let targetW = Number(settings.width) || img.naturalWidth;
        let targetH = Number(settings.height) || img.naturalHeight;

        // Create off-screen canvas
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');

        // Apply rotation
        const rotation = Number(settings.rotation) || 0;
        if (rotation === 90 || rotation === 270) {
          canvas.width = targetH;
          canvas.height = targetW;
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (rotation) ctx.rotate((rotation * Math.PI) / 180);
        if (settings.flipH) ctx.scale(-1, 1);
        if (settings.flipV) ctx.scale(1, -1);

        // CSS filter for brightness/contrast/saturation
        const brightness = settings.brightness ?? 100;
        const contrast = settings.contrast ?? 100;
        const saturation = settings.saturation ?? 100;
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

        ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
        ctx.restore();

        const fmt = (settings.outputFormat || 'JPEG').toUpperCase();

        // ── PDF: render canvas to JPEG data URL, embed via a hidden <a> print trick ──
        if (fmt === 'PDF') {
          const pdfBlob = await canvasToPDF(canvas);
          resolve({
            url: URL.createObjectURL(pdfBlob),
            size: pdfBlob.size,
            width: canvas.width,
            height: canvas.height,
            format: 'PDF',
          });
          return;
        }

        // Output mime
        const mimeType =
          fmt === 'PNG'  ? 'image/png'  :
          fmt === 'WEBP' ? 'image/webp' : 'image/jpeg';
        let quality = (settings.quality ?? 85) / 100;

        // Target size compression loop
        let dataUrl;
        if (settings.targetSizeKB && Number(settings.targetSizeKB) > 0) {
          const targetBytes = Number(settings.targetSizeKB) * (settings.targetSizeUnit === 'MB' ? 1024 * 1024 : 1024);
          let lo = 0.01, hi = 1.0;
          dataUrl = canvas.toDataURL(mimeType, hi);
          for (let iter = 0; iter < 16; iter++) {
            const mid = (lo + hi) / 2;
            const candidate = canvas.toDataURL(mimeType, mid);
            const bytes = Math.round((candidate.length * 3) / 4);
            if (bytes <= targetBytes) { lo = mid; dataUrl = candidate; }
            else hi = mid;
            if (hi - lo < 0.005) break;
          }
        } else {
          dataUrl = canvas.toDataURL(mimeType, quality);
        }

        // Convert dataUrl to Blob to get real size
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        resolve({
          url: URL.createObjectURL(blob),
          size: blob.size,
          width: canvas.width,
          height: canvas.height,
          format: fmt === 'JPG' ? 'JPG' : fmt,
        });
      };
      img.onerror = reject;
      img.src = imageData.url;
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Convert canvas to a valid PDF using jsPDF-compatible binary structure.
 * Creates a single-page PDF with the canvas image at full page size.
 */
async function canvasToPDF(canvas) {
  // Get canvas as JPEG data URL (high quality)
  const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.95);

  // Convert base64 to binary
  const base64 = jpegDataUrl.split(',')[1];
  const binaryStr = atob(base64);
  const imgBytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    imgBytes[i] = binaryStr.charCodeAt(i);
  }

  // PDF dimensions: convert px to points (72 pt/inch, assume 96dpi screen)
  // Scale so the image fits on an A4-ish page or use its own pixel size as points
  const W = canvas.width;
  const H = canvas.height;

  // Build PDF objects as byte arrays
  const enc = new TextEncoder();

  const obj1 = enc.encode('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  const obj2 = enc.encode('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  const obj3 = enc.encode(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}]\n   /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj\n`
  );

  const contentStr = `q\n${W} 0 0 ${H} 0 0 cm\n/Im1 Do\nQ\n`;
  const contentBytes = enc.encode(contentStr);
  const obj4 = enc.encode(`4 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n`);
  const obj4end = enc.encode('\nendstream\nendobj\n');

  const obj5header = enc.encode(
    `5 0 obj\n<< /Type /XObject /Subtype /Image\n   /Width ${W} /Height ${H}\n   /ColorSpace /DeviceRGB /BitsPerComponent 8\n   /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`
  );
  const obj5end = enc.encode('\nendstream\nendobj\n');

  // Calculate byte offsets for xref table
  const header = enc.encode('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  let offset = header.length;

  const offsets = [];
  const objects = [obj1, obj2, obj3];
  for (const o of objects) {
    offsets.push(offset);
    offset += o.length;
  }

  // obj4 = content stream
  offsets.push(offset);
  offset += obj4.length + contentBytes.length + obj4end.length;

  // obj5 = image stream
  offsets.push(offset);
  offset += obj5header.length + imgBytes.length + obj5end.length;

  const xrefOffset = offset;
  const xref = enc.encode(
    `xref\n0 6\n0000000000 65535 f \n` +
    offsets.map(o => `${String(o).padStart(10, '0')} 00000 n \n`).join('') +
    `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
  );

  // Concatenate all parts
  const parts = [
    header,
    obj1, obj2, obj3,
    obj4, contentBytes, obj4end,
    obj5header, imgBytes, obj5end,
    xref,
  ];

  const totalLen = parts.reduce((s, p) => s + p.length, 0);
  const result = new Uint8Array(totalLen);
  let pos = 0;
  for (const p of parts) {
    result.set(p, pos);
    pos += p.length;
  }

  return new Blob([result], { type: 'application/pdf' });
}
