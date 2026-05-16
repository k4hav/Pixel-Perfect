'use client';

import { motion } from 'framer-motion';
import { Upload, Sliders, Download, Sparkles } from 'lucide-react';

const STEPS = [
  { step: '01', icon: Upload, title: 'Drop Your Image', desc: 'Drag & drop or click. JPG, PNG, WEBP, GIF, BMP supported.', color: '#667eea' },
  { step: '02', icon: Sparkles, title: 'Adjust Settings', desc: 'Set width, height, DPI, quality, format or transforms.', color: '#7c3aed' },
  { step: '03', icon: Sliders, title: 'Processes Instantly', desc: 'All processing in your browser. Lightning fast, 100% private.', color: '#ec4899' },
  { step: '04', icon: Download, title: 'Download & Submit', desc: 'Get your perfectly optimized image, ready for any platform.', color: '#10b981' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)', marginBottom: '64px' }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 18px', borderRadius: '100px', marginBottom: '18px',
            background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.22)', color: '#60a5fa',
            fontSize: '13px', fontWeight: 600,
          }}>
            🚀 Super Simple
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900,
            color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '12px',
          }}>
            How It <span className="gradient-text-blue">Works</span>
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto' }}>
            4 steps. Under 30 seconds. No technical knowledge needed.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="tool-card"
                style={{ padding: '24px', borderTop: `3px solid ${step.color}` }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px',
                }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${step.color}18`,
                  }}>
                    <Icon size={18} style={{ color: step.color }} />
                  </div>
                  <span style={{ fontSize: '28px', fontWeight: 900, color: `${step.color}30` }}>{step.step}</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
