'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Download, Loader, CheckCircle, Layers } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function BatchProcessor() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [quality, setQuality] = useState(80);

  const onDrop = useCallback((accepted) => {
    const newFiles = accepted.map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f, name: f.name, size: f.size, status: 'pending', resultUrl: null, resultSize: null,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });
  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id));

  const processAll = async () => {
    setProcessing(true);
    for (const f of files) {
      if (f.status === 'done') continue;
      setFiles(prev => prev.map(x => x.id === f.id ? { ...x, status: 'processing' } : x));
      try {
        const compressed = await imageCompression(f.file, { maxSizeMB: 5, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: quality / 100 });
        const url = URL.createObjectURL(compressed);
        setFiles(prev => prev.map(x => x.id === f.id ? { ...x, status: 'done', resultUrl: url, resultSize: compressed.size } : x));
      } catch {
        setFiles(prev => prev.map(x => x.id === f.id ? { ...x, status: 'error' } : x));
      }
    }
    setProcessing(false);
  };

  const downloadAll = () => {
    files.filter(f => f.status === 'done').forEach((f, i) => {
      setTimeout(() => {
        const a = document.createElement('a'); a.href = f.resultUrl; a.download = `optimized_${f.name}`; a.click();
      }, i * 300);
    });
  };

  const fmt = b => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <section id="batch" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)', marginBottom: '64px' }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 18px', borderRadius: '100px', marginBottom: '18px',
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', color: '#06b6d4',
            fontSize: '13px', fontWeight: 600,
          }}>
            <Layers size={13} /> Batch Processing
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900,
            color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '12px',
          }}>
            Process <span style={{ background: 'linear-gradient(135deg,#06b6d4,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Multiple Images</span> at Once
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            Upload dozens of images, compress them all, download in one click.
          </p>
        </motion.div>

        {/* Quality Slider */}
        <div className="tool-card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Compression Quality</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{quality}%</span>
          </div>
          <input type="range" min={20} max={100} value={quality}
            onChange={e => setQuality(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#7c3aed' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Smaller files</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Better quality</span>
          </div>
        </div>

        {/* Dropzone */}
        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.01 }}
          style={{
            borderRadius: '18px', padding: '36px 24px', textAlign: 'center', cursor: 'pointer',
            border: `2px dashed ${isDragActive ? '#7c3aed' : 'rgba(255,255,255,0.12)'}`,
            background: isDragActive ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.03)',
            marginBottom: '16px', transition: 'all 0.25s',
          }}
        >
          <input {...getInputProps()} />
          <Upload size={28} style={{ color: 'var(--text-muted)', display: 'block', margin: '0 auto 12px' }} />
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', fontSize: '15px' }}>
            {isDragActive ? 'Drop images here!' : 'Drop multiple images here'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>or click to browse — unlimited files</p>
        </motion.div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="tool-card" style={{ overflow: 'hidden', marginBottom: '16px' }}
            >
              <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{files.length} image{files.length !== 1 ? 's' : ''} queued</span>
                <button onClick={() => setFiles([])} style={{ fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}>Clear all</button>
              </div>
              <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                {files.map(f => (
                  <motion.div key={f.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {fmt(f.size)}
                        {f.status === 'done' && f.resultSize && <span style={{ marginLeft: '8px', color: '#10b981', fontWeight: 600 }}>→ {fmt(f.resultSize)} (−{Math.round((1 - f.resultSize / f.size) * 100)}%)</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {f.status === 'pending' && <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Pending</span>}
                      {f.status === 'processing' && <Loader size={15} style={{ color: '#7c3aed', animation: 'spin 1s linear infinite' }} />}
                      {f.status === 'done' && <CheckCircle size={15} style={{ color: '#10b981' }} />}
                      {f.status === 'error' && <span style={{ fontSize: '12px', color: '#ef4444' }}>Error</span>}
                      {f.status === 'done' && (
                        <a href={f.resultUrl} download={`optimized_${f.name}`}>
                          <Download size={14} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
                        </a>
                      )}
                      <button onClick={() => removeFile(f.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={14} style={{ color: 'var(--text-muted)' }} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {files.length > 0 && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={processAll} disabled={processing}
              className="btn-primary"
              style={{ flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, opacity: processing ? 0.6 : 1 }}
            >
              {processing ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</> : '⚡ Compress All'}
            </motion.button>
            {files.some(f => f.status === 'done') && (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={downloadAll}
                className="btn-download"
                style={{ flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: 700 }}
              >
                <Download size={16} /> Download All
              </motion.button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
