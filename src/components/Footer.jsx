'use client';

import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '60px 24px 40px', background: 'rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div className="btn-glass btn-primary-glass" style={{ width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="white" />
              </div>
              <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Pixel<span className="gradient-text">Perfect</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              Resize, compress, and convert images. 100% free, no signup, fully private.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Tools</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Resize Image', 'Compress Image', 'Convert Format', 'Adjust Colors', 'Rotate & Flip'].map(t => (
                <li key={t}>
                  <a href="#tools" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#a78bfa'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{t}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>More</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[{ label: 'How It Works', href: '#how-it-works' }, { label: 'Batch Processing', href: '#batch' }].map(t => (
                <li key={t.label}>
                  <a href={t.href} style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#a78bfa'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{t.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Copyright 2026 ƘҽՏհɑѵ. All Rights Reserved.
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            All processing done locally.
          </span>
        </div>
      </div>
    </footer>
  );
}
