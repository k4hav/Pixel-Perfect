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

        // Output format
        const fmt = settings.outputFormat || 'JPEG';
        const mimeType = fmt === 'PNG' ? 'image/png' : fmt === 'WEBP' ? 'image/webp' : 'image/jpeg';
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

        // Handle PDF (wrap image in basic PDF)
        if (fmt === 'PDF') {
          const pdfBlob = await imageToPDF(dataUrl, canvas.width, canvas.height);
          resolve({
            url: URL.createObjectURL(pdfBlob),
            size: pdfBlob.size,
            width: canvas.width,
            height: canvas.height,
            format: 'PDF',
          });
          return;
        }

        resolve({
          url: URL.createObjectURL(blob),
          size: blob.size,
          width: canvas.width,
          height: canvas.height,
          format: fmt,
        });
      };
      img.onerror = reject;
      img.src = imageData.url;
    } catch (e) {
      reject(e);
    }
  });
}

/** Minimal PDF wrapper using raw PDF syntax */
async function imageToPDF(dataUrl, width, height) {
  // Convert pixels to PDF points (1 pt = 1/72 inch, use 72 dpi)
  const ptW = width;
  const ptH = height;
  const imgData = dataUrl.split(',')[1]; // base64
  const pdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 ${ptW} ${ptH}]/Contents 4 0 R/Resources<</XObject<</I1 5 0 R>>>>>>endobj
4 0 obj<</Length 32>>stream
q ${ptW} 0 0 ${ptH} 0 0 cm /I1 Do Q
endstream endobj
5 0 obj<</Type/XObject/Subtype/Image/Width ${width}/Height ${height}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${imgData.length}>>stream
${atob(imgData)}
endstream endobj
xref
0 6
trailer<</Size 6/Root 1 0 R>>
startxref
0
%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
}
