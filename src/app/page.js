'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertCircle } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ImageUploader from '@/components/ImageUploader';
import ToolPanel from '@/components/ToolPanel';
import ResultPanel from '@/components/ResultPanel';
import HowItWorks from '@/components/HowItWorks';
import BatchProcessor from '@/components/BatchProcessor';
import Footer from '@/components/Footer';
import { processImage } from '@/lib/imageProcessor';
import SplineBackground from '@/components/SplineBackground';

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageLoad = (imgData) => { setImage(imgData); setResult(null); setError(null); };
  const handleClear = () => { setImage(null); setResult(null); setError(null); };

  const handleProcess = async (settings) => {
    if (!image) return;
    setProcessing(true);
    setError(null);
    try {
      const res = await processImage(image, settings);
      setResult(res);
    } catch (err) {
      setError('Processing failed. Try a different image or settings.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <SplineBackground />

      <main style={{ position: 'relative', zIndex: 3, minHeight: '100vh' }}>
        <Navbar />
        <Hero />

        {/* ═══ TOOL SECTION ═══ */}
        <section id="tools" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>

            {/* Section Header — all centered */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 18px', borderRadius: '100px', marginBottom: '20px',
                background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.22)',
                color: '#a78bfa', fontSize: '13px', fontWeight: 600,
              }}>
                <Sparkles size={13} />
                AI Image Tools
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900,
                color: 'var(--text-primary)', lineHeight: 1.08,
                letterSpacing: '-0.03em', marginBottom: '14px',
              }}>
                All Tools.{' '}
                <span className="gradient-text">One Place.</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.6 }}>
                Upload your image, tweak settings, download instantly.
              </p>
            </motion.div>

            {/* Image Uploader */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '20px' }}
            >
              <ImageUploader onImageLoad={handleImageLoad} uploadedImage={image} onClear={handleClear} />
            </motion.div>

            {/* Tool Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{ marginBottom: '20px' }}
            >
              <ToolPanel image={image} onProcess={handleProcess} processing={processing} result={result} />
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    marginBottom: '16px', padding: '14px 18px', borderRadius: '16px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444',
                  }}
                >
                  <AlertCircle size={16} />
                  <span style={{ fontSize: '14px' }}>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  <ResultPanel original={image} result={result} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        <HowItWorks />
        <BatchProcessor />
        <Footer />
      </main>
    </>
  );
}
