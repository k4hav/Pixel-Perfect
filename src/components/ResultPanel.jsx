'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, ZoomIn, ZoomOut, RotateCcw, Eye, Sparkles, TrendingDown } from 'lucide-react';
import { useState } from 'react';

export default function ResultPanel({ original, result }) {
  const [zoom, setZoom] = useState(1);

  if (!result) return null;

  const fmt = (b) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / (1024 * 1024)).toFixed(2)} MB`;
  };

  const savings = original
    ? Math.round(((original.size - result.size) / original.size) * 100)
    : 0;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = result.url;
    const ext = result.format.toLowerCase().replace('jpeg', 'jpg');
    const baseName = original?.name?.replace(/\.[^/.]+$/, '') || 'image';
    a.download = `${baseName}_optimized.${ext}`;
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="tool-card"
      style={{ overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={16} style={{ color: '#a78bfa' }} />
          <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>Result Preview</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { icon: <ZoomOut size={13} />, action: () => setZoom(z => Math.max(0.5, z - 0.25)) },
            { icon: <RotateCcw size={13} />, action: () => setZoom(1) },
            { icon: <ZoomIn size={13} />, action: () => setZoom(z => Math.min(3, z + 0.25)) },
          ].map((btn, i) => (
            <motion.button key={i} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
              onClick={btn.action}
              style={{
                width: '32px', height: '32px', borderRadius: '10px', border: 'none',
                background: 'rgba(255,255,255,0.07)', color: 'var(--text-secondary)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            >{btn.icon}</motion.button>
          ))}
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', minWidth: '36px', textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {/* Preview */}
      <div style={{
        minHeight: '220px', maxHeight: '360px', overflow: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'repeating-conic-gradient(rgba(255,255,255,0.04) 0% 25%, transparent 0% 50%) 0 0 / 18px 18px',
        padding: '16px',
      }}>
        <motion.img
          src={result.url}
          alt="Result"
          animate={{ scale: zoom }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ maxWidth: '100%', maxHeight: '330px', objectFit: 'contain', borderRadius: '8px' }}
        />
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        {[
          { label: 'Dimensions', value: `${result.width} × ${result.height}` },
          { label: 'File Size', value: fmt(result.size) },
          { label: 'Format', value: result.format },
          {
            label: 'Saved',
            value: savings > 0 ? `↓ ${savings}%` : savings < 0 ? `↑ ${Math.abs(savings)}%` : '—',
            color: savings > 0 ? '#10b981' : savings < 0 ? '#ef4444' : 'var(--text-primary)',
          },
        ].map((s, i) => (
          <div key={s.label} style={{
            textAlign: 'center', padding: '14px 8px',
            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: s.color || 'var(--text-primary)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {original && (
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Original: {fmt(original.size)}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Result: {fmt(result.size)}</span>
          </div>
          <div style={{ height: '6px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${Math.min(100, (result.size / original.size) * 100)}%` }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              style={{
                height: '100%', borderRadius: '6px',
                background: savings > 20
                  ? 'linear-gradient(90deg, #059669, #10b981)'
                  : 'linear-gradient(90deg, #7c3aed, #a78bfa)',
              }}
            />
          </div>
        </div>
      )}

      {/* ═══ PREMIUM DOWNLOAD BUTTON ═══ */}
      <div style={{ padding: '16px 20px' }}>
        <motion.button
          whileHover={{ scale: 1.025, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDownload}
          style={{
            width: '100%', padding: '16px 24px', borderRadius: '18px', border: 'none',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            color: 'white', fontSize: '16px', fontWeight: 800, letterSpacing: '-0.01em',
            boxShadow: '0 8px 32px rgba(16,185,129,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          {/* Shimmer sweep */}
          <span style={{
            position: 'absolute', top: 0, left: '-70%', width: '50%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
            transform: 'skewX(-20deg)',
            animation: 'shimmer-sweep 2.5s infinite',
            pointerEvents: 'none',
          }} />
          <motion.span
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Download size={20} />
          </motion.span>
          <span style={{ position: 'relative', zIndex: 1 }}>Download Optimized Image</span>
          {savings > 0 && (
            <span style={{
              position: 'relative', zIndex: 1,
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
              padding: '3px 10px', borderRadius: '100px', fontSize: '13px', fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              −{savings}%
            </span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
