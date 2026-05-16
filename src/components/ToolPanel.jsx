'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, FileType, Sliders, RotateCw, FlipHorizontal, Check, Lock, Unlock } from 'lucide-react';

const TABS = [
  { id: 'resize', label: 'Resize', icon: Maximize2 },
  { id: 'compress', label: 'Compress', icon: Minimize2 },
  { id: 'convert', label: 'Convert', icon: FileType },
  { id: 'adjust', label: 'Adjust', icon: Sliders },
  { id: 'transform', label: 'Transform', icon: RotateCw },
];
const UNITS = ['px', 'cm', 'mm', 'in'];
const DPI_PRESETS = [72, 96, 150, 300, 600];
const FORMAT_OPTIONS = ['JPEG', 'PNG', 'WEBP', 'PDF'];

/* ─── Shared styles (defined OUTSIDE component so they're stable) ─── */
const inputBase = {
  width: '100%', padding: '11px 46px 11px 14px', borderRadius: '12px', fontSize: '14px',
  fontWeight: 500, outline: 'none', background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.10)', color: 'var(--text-primary)',
  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.25)', transition: 'border-color 0.2s, box-shadow 0.2s',
  WebkitAppearance: 'none', MozAppearance: 'textfield', boxSizing: 'border-box',
};
const labelBase = {
  fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px',
};
const focusIn = (e) => {
  e.target.style.borderColor = 'rgba(167,139,250,0.55)';
  e.target.style.boxShadow = '0 0 0 3px rgba(167,139,250,0.13), inset 0 2px 8px rgba(0,0,0,0.25)';
};
const focusOut = (e) => {
  e.target.style.borderColor = 'rgba(255,255,255,0.10)';
  e.target.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.25)';
};

/* ─── Pill button helper ─── */
function Pill({ label, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.07, y: -1 }} whileTap={{ scale: 0.93 }}
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      style={{
        padding: '7px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 700,
        cursor: 'pointer', border: 'none', transition: 'all 0.22s',
        background: active ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.06)',
        color: active ? 'white' : 'var(--text-secondary)',
        boxShadow: active ? '0 4px 20px rgba(124,58,237,0.4)' : 'none',
        border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
      }}>{label}
    </motion.button>
  );
}

/* ─── Range slider ─── */
function RangeSlider({ label, value, onChange, min, max, unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#7c3aed' }} />
    </div>
  );
}

/* ─── Number input — uses LOCAL state while typing, commits on blur ─── */
function NumInput({ label, value, onChange, step = 1, suffix }) {
  // Keep a local string the user is actively typing; only convert on blur
  const [localVal, setLocalVal] = useState(String(value ?? ''));
  const [focused, setFocused] = useState(false);

  // When external value changes (e.g. aspect ratio update), sync if not focused
  useEffect(() => {
    if (!focused) setLocalVal(String(value ?? ''));
  }, [value, focused]);

  return (
    <div style={{ flex: 1 }}>
      {label && <label style={labelBase}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          step={step}
          value={focused ? localVal : (value ?? '')}
          onChange={e => setLocalVal(e.target.value)}
          onFocus={e => {
            setFocused(true);
            setLocalVal(String(value ?? ''));
            setTimeout(() => e.target.select(), 0);
            focusIn(e);
          }}
          onBlur={e => {
            setFocused(false);
            onChange(e.target.value);  // commit on blur
            focusOut(e);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.target.blur(); }
          }}
          style={inputBase}
        />
        {suffix && (
          <span style={{
            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
            fontSize: '11px', color: 'var(--text-muted)', pointerEvents: 'none',
          }}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function ToolPanel({ image, onProcess, processing }) {
  const [activeTab, setActiveTab] = useState('resize');
  const [unit, setUnit] = useState('px');
  const [settings, setSettings] = useState({
    width: '', height: '', maintainAspect: false, dpi: 96, customDpi: '',
    quality: 85, targetSizeKB: '', targetSizeUnit: 'KB',
    outputFormat: 'JPEG', brightness: 100, contrast: 100,
    sharpness: 0, saturation: 100, rotation: 0, flipH: false, flipV: false,
  });

  useEffect(() => {
    if (image) setSettings(s => ({ ...s, width: image.width || '', height: image.height || '' }));
  }, [image]);

  const toUnit = useCallback((px) => {
    const n = Number(px); if (!n || !settings.dpi) return '';
    switch (unit) {
      case 'cm': return ((n / settings.dpi) * 2.54).toFixed(2);
      case 'mm': return ((n / settings.dpi) * 25.4).toFixed(1);
      case 'in': return (n / settings.dpi).toFixed(3);
      default: return n;
    }
  }, [unit, settings.dpi]);

  const fromUnit = useCallback((val) => {
    const n = parseFloat(val); if (!n && n !== 0) return '';
    if (!settings.dpi || unit === 'px') return Math.round(n);
    switch (unit) {
      case 'cm': return Math.round((n / 2.54) * settings.dpi);
      case 'mm': return Math.round((n / 25.4) * settings.dpi);
      case 'in': return Math.round(n * settings.dpi);
      default: return Math.round(n);
    }
  }, [unit, settings.dpi]);

  const update = useCallback((key, val) => setSettings(s => {
    const next = { ...s, [key]: val };
    if (key === 'width' && s.maintainAspect && image && image.width)
      next.height = Math.round(val / (image.width / image.height));
    if (key === 'height' && s.maintainAspect && image && image.height)
      next.width = Math.round(val * (image.width / image.height));
    return next;
  }), [image]);

  /* ─ RESIZE tab ─ */
  const renderResize = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Unit switcher */}
      <div>
        <label style={labelBase}>Unit</label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {UNITS.map(u => (
            <motion.button key={u} whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
              onMouseDown={e => e.preventDefault()} onClick={() => setUnit(u)}
              style={{
                flex: 1, padding: '9px 4px', borderRadius: '11px', fontWeight: 700,
                fontSize: '13px', cursor: 'pointer', border: 'none', transition: 'all 0.22s',
                background: unit === u ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.06)',
                color: unit === u ? 'white' : 'var(--text-secondary)',
                boxShadow: unit === u ? '0 4px 16px rgba(124,58,237,0.4)' : 'none',
              }}>{u.toUpperCase()}</motion.button>
          ))}
        </div>
      </div>

      {/* Width / Lock / Height */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
        <NumInput
          label="Width"
          value={unit === 'px' ? settings.width : toUnit(settings.width)}
          onChange={val => update('width', fromUnit(val))}
          step={unit === 'px' ? 1 : 0.01}
          suffix={unit}
        />
        <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
          onMouseDown={e => e.preventDefault()}
          onClick={() => update('maintainAspect', !settings.maintainAspect)}
          style={{
            width: '40px', height: '40px', borderRadius: '12px', border: 'none', cursor: 'pointer',
            flexShrink: 0, marginBottom: '2px', transition: 'all 0.2s',
            background: settings.maintainAspect ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${settings.maintainAspect ? 'rgba(167,139,250,0.5)' : 'rgba(255,255,255,0.1)'}`,
            color: settings.maintainAspect ? '#a78bfa' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{settings.maintainAspect ? <Lock size={14} /> : <Unlock size={14} />}
        </motion.button>
        <NumInput
          label="Height"
          value={unit === 'px' ? settings.height : toUnit(settings.height)}
          onChange={val => update('height', fromUnit(val))}
          step={unit === 'px' ? 1 : 0.01}
          suffix={unit}
        />
      </div>

      {/* DPI presets */}
      <div>
        <label style={labelBase}>DPI (Resolution)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {DPI_PRESETS.map(d => (
            <Pill key={d} label={String(d)} active={settings.dpi === d && !settings.customDpi}
              onClick={() => update('dpi', d)} />
          ))}
        </div>
        <NumInput
          value={settings.customDpi}
          onChange={val => { update('customDpi', val); if (val) update('dpi', Number(val)); }}
          suffix="dpi"
          step={1}
        />
      </div>
    </div>
  );

  /* ─ COMPRESS tab ─ */
  const renderCompress = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <RangeSlider label="Quality" value={settings.quality} onChange={v => update('quality', v)} min={1} max={100} unit="%" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {[{ label: 'Web (75%)', q: 75 }, { label: 'Print (90%)', q: 90 }, { label: 'Max (95%)', q: 95 }, { label: 'Tiny (40%)', q: 40 }].map(p => (
          <Pill key={p.label} label={p.label} active={settings.quality === p.q} onClick={() => update('quality', p.q)} />
        ))}
      </div>
      <div>
        <label style={labelBase}>Target File Size</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <input type="number" placeholder="e.g. 50" value={settings.targetSizeKB}
                onChange={e => update('targetSizeKB', e.target.value)}
                onFocus={e => { e.target.select(); focusIn(e); }} onBlur={focusOut}
                style={inputBase} />
            </div>
          </div>
          <select value={settings.targetSizeUnit} onChange={e => update('targetSizeUnit', e.target.value)}
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '12px', color: 'var(--text-primary)', padding: '11px 14px', outline: 'none', cursor: 'pointer', fontWeight: 600 }}>
            <option>KB</option><option>MB</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
          {['20 KB', '50 KB', '100 KB', '200 KB', '500 KB', '1 MB'].map(s => {
            const [num, u] = s.split(' ');
            return (
              <Pill key={s} label={`<${s}`} active={settings.targetSizeKB === num && settings.targetSizeUnit === u}
                onClick={() => { update('targetSizeKB', num); update('targetSizeUnit', u); }} />
            );
          })}
        </div>
      </div>
    </div>
  );

  /* ─ CONVERT tab ─ */
  const renderConvert = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={labelBase}>Output Format</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {FORMAT_OPTIONS.map(fmt => (
            <motion.button key={fmt} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }}
              onMouseDown={e => e.preventDefault()} onClick={() => update('outputFormat', fmt)}
              style={{
                padding: '16px', borderRadius: '14px', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                background: settings.outputFormat === fmt ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${settings.outputFormat === fmt ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                color: settings.outputFormat === fmt ? 'white' : 'var(--text-secondary)',
                boxShadow: settings.outputFormat === fmt ? '0 6px 24px rgba(124,58,237,0.4)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.22s',
              }}>{settings.outputFormat === fmt && <Check size={14} />}{fmt}
            </motion.button>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Format Guide</p>
        <p style={{ fontSize: '12px', lineHeight: 1.75, color: 'var(--text-muted)' }}>
          <b style={{ color: '#a78bfa' }}>JPEG</b> — Photos, forms, passports. Smallest size.<br />
          <b style={{ color: '#a78bfa' }}>PNG</b> — Transparent backgrounds, logos, lossless.<br />
          <b style={{ color: '#a78bfa' }}>WEBP</b> — Web-optimized, 30% smaller than JPEG.<br />
          <b style={{ color: '#a78bfa' }}>PDF</b> — Document & exam submissions.
        </p>
      </div>
    </div>
  );

  /* ─ ADJUST tab ─ */
  const renderAdjust = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <RangeSlider label="Brightness" value={settings.brightness} onChange={v => update('brightness', v)} min={0} max={200} unit="%" />
      <RangeSlider label="Contrast" value={settings.contrast} onChange={v => update('contrast', v)} min={0} max={200} unit="%" />
      <RangeSlider label="Saturation" value={settings.saturation} onChange={v => update('saturation', v)} min={0} max={200} unit="%" />
      <RangeSlider label="Sharpness" value={settings.sharpness} onChange={v => update('sharpness', v)} min={-100} max={100} unit="" />
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        onMouseDown={e => e.preventDefault()}
        onClick={() => setSettings(s => ({ ...s, brightness: 100, contrast: 100, saturation: 100, sharpness: 0 }))}
        style={{ padding: '10px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
      >Reset to Default</motion.button>
    </div>
  );

  /* ─ TRANSFORM tab ─ */
  const renderTransform = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={labelBase}>Rotate</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 90, 180, 270].map(deg => (
            <Pill key={deg} label={`${deg}°`} active={settings.rotation === deg} onClick={() => update('rotation', deg)} />
          ))}
        </div>
      </div>
      <div>
        <label style={labelBase}>Flip</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[{ key: 'flipH', label: '⇔ Horizontal' }, { key: 'flipV', label: '⇕ Vertical' }].map(({ key, label }) => (
            <motion.button key={key} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95 }}
              onMouseDown={e => e.preventDefault()} onClick={() => update(key, !settings[key])}
              style={{
                flex: 1, padding: '11px', borderRadius: '12px', fontWeight: 600, fontSize: '13px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: settings[key] ? 'rgba(167,139,250,0.14)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${settings[key] ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: settings[key] ? '#a78bfa' : 'var(--text-secondary)', transition: 'all 0.22s',
              }}>{label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  const tabContent = {
    resize: renderResize, compress: renderCompress,
    convert: renderConvert, adjust: renderAdjust, transform: renderTransform,
  };

  return (
    <div className="tool-card">
      {/* Tab bar */}
      <div style={{
        display: 'flex', overflowX: 'auto', gap: '4px', padding: '10px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.07)', scrollbarWidth: 'none',
      }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button key={tab.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
              onMouseDown={e => e.preventDefault()} onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}
            ><Icon size={13} /><span>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tabContent[activeTab]?.()}
          </motion.div>
        </AnimatePresence>

        {/* Process button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
          onClick={() => onProcess(settings)}
          disabled={!image || processing}
          onMouseDown={e => e.preventDefault()}
          className="btn-primary shimmer-btn"
          style={{
            width: '100%', marginTop: '22px', padding: '15px 24px', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontSize: '15px', fontWeight: 700, opacity: (!image || processing) ? 0.5 : 1, cursor: !image ? 'not-allowed' : 'pointer',
          }}
        >{processing ? '⚙️ Processing…' : '✨ Apply & Preview'}
        </motion.button>
      </div>
    </div>
  );
}
