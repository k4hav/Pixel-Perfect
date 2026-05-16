'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Rocket, ImageIcon } from 'lucide-react';

const stats = [
  { value: '5', label: 'Edit Modes' },
  { value: '100%', label: 'Free' },
  { value: '0', label: 'Upload' },
  { value: '∞', label: 'No Limits' },
];

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '110px 24px 60px',
    }}>

      {/* Floating Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '28px' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="btn-glass btn-primary-glass"
          style={{
            width: '72px', height: '72px', borderRadius: '22px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <ImageIcon size={32} color="white" />
        </motion.div>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ marginBottom: '24px' }}
      >
        <span className="badge-glass">
          <Sparkles size={12} style={{ color: '#a78bfa' }} />
          AI-Powered · Client-Side · 100% Private
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.04,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
          maxWidth: '820px',
        }}
      >
        Stop Suffering Over<br />
        <span className="gradient-text">Image Uploads</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '18px', lineHeight: 1.65,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '520px', marginBottom: '44px',
        }}
      >
        Resize, compress, convert &amp; optimize — for government forms, passports, exams &amp; social media. No signup. Instant.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}
      >
        <motion.a
          href="#tools"
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="btn-primary shimmer-btn"
          style={{
            textDecoration: 'none', color: 'white',
            padding: '15px 32px', borderRadius: '16px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '16px', fontWeight: 700,
          }}
        >
          Start Editing Free <ArrowRight size={18} />
        </motion.a>
        <motion.a
          href="#how-it-works"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="btn-glass"
          style={{
            textDecoration: 'none', color: 'rgba(255,255,255,0.85)',
            padding: '15px 32px', borderRadius: '16px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '16px', fontWeight: 600,
          }}
        >
          How It Works
        </motion.a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + i * 0.08 }}
            whileHover={{ y: -4, scale: 1.06 }}
            className="glass-card"
            style={{ padding: '16px 28px', textAlign: 'center', minWidth: '100px' }}
          >
            <div className="gradient-text" style={{ fontSize: '26px', fontWeight: 900 }}>{stat.value}</div>
            <div style={{ fontSize: '12px', marginTop: '4px', color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
