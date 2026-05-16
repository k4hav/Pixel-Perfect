'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@k4hav',
    url: 'https://instagram.com/k4hav',
    color: '#E1306C',
    gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    handle: '@k4hav',
    url: 'https://x.com/k4hav',
    color: '#ffffff',
    gradient: 'linear-gradient(135deg, #1a1a1a, #333)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.856L1.718 2.25H8.04l4.26 5.632 5.944-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Telegram',
    handle: '@k4hav',
    url: 'https://t.me/k4hav',
    color: '#229ED9',
    gradient: 'linear-gradient(135deg, #0088cc, #229ED9)',
    icon: <Send size={20} />,
  },
  {
    name: 'GitHub',
    handle: '@k4hav',
    url: 'https://github.com/k4hav',
    color: '#f0f6fc',
    gradient: 'linear-gradient(135deg, #24292e, #40464e)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: '99px', padding: '6px 16px', marginBottom: '20px',
          }}>
            <MessageCircle size={13} color="#a78bfa" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#a78bfa', letterSpacing: '0.06em' }}>GET IN TOUCH</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800,
            color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.2,
          }}>
            Contact <span className="gradient-text">ƘҽՏհɑѵ</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Found a bug? Have a suggestion? Want to collaborate?
            Hit me up on any platform below — I respond fast. 🚀
          </p>
        </motion.div>

        {/* Social Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '14px', padding: '28px 20px', textDecoration: 'none',
                borderRadius: '20px', cursor: 'pointer',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${s.color}44`;
                e.currentTarget.style.boxShadow = `0 8px 40px ${s.color}22, inset 0 1px 0 rgba(255,255,255,0.15)`;
                e.currentTarget.style.background = `${s.color}10`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: '52px', height: '52px', borderRadius: '16px',
                background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', boxShadow: `0 4px 20px ${s.color}40`,
                flexShrink: 0,
              }}>
                {s.icon}
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {s.name}
                </div>
                <div style={{ fontSize: '12px', color: s.color, fontWeight: 600, opacity: 0.9 }}>
                  {s.handle}
                </div>
              </div>

              {/* Subtle shimmer on hover */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            </motion.a>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center', marginTop: '36px',
            fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7,
          }}
        >
          For bug reports, you can also open an issue on{' '}
          <a href="https://github.com/k4hav/Pixel-Perfect/issues" target="_blank" rel="noopener noreferrer"
            style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}
            onMouseEnter={e => e.target.style.textDecoration = 'underline'}
            onMouseLeave={e => e.target.style.textDecoration = 'none'}
          >GitHub Issues ↗</a>
        </motion.p>

      </div>
    </section>
  );
}
