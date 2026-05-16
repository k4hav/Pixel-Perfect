'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-glass' : ''}`}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <motion.a href="#" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{ textDecoration: 'none' }} className="flex items-center gap-3">
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center btn-glass btn-primary-glass"
            animate={{ boxShadow: ['0 4px 24px rgba(167,139,250,0.3)', '0 4px 40px rgba(167,139,250,0.6)', '0 4px 24px rgba(167,139,250,0.3)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Zap size={17} color="white" />
          </motion.div>
          <span className="text-xl font-bold text-white">
            Pixel<span className="gradient-text">Perfect</span>
          </span>
        </motion.a>


        {/* Right: Start Editing */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <motion.a
            href="#tools"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="btn-glass btn-primary-glass shimmer-btn"
            style={{
              textDecoration: 'none', color: 'white', borderRadius: '14px',
              padding: '10px 22px', fontSize: '14px', fontWeight: 700,
              whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            Start Editing
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
