'use client';

import { motion } from 'framer-motion';

const PRESETS = [
  {
    category: '🇮🇳 Government India',
    items: [
      { name: 'Aadhaar Card', icon: '🪪', width: 200, height: 200, format: 'JPEG', maxKB: 50, dpi: 96, note: '< 50KB, JPG' },
      { name: 'PAN Card', icon: '💳', width: 213, height: 213, format: 'JPEG', maxKB: 100, dpi: 96, note: '< 100KB, JPG' },
      { name: 'Voter ID Photo', icon: '🗳️', width: 150, height: 200, format: 'JPEG', maxKB: 50, dpi: 96, note: '< 50KB' },
      { name: 'Ration Card', icon: '📋', width: 200, height: 250, format: 'JPEG', maxKB: 100, dpi: 96, note: '< 100KB' },
    ]
  },
  {
    category: '📸 Passport & Travel',
    items: [
      { name: 'Passport Photo', icon: '🛂', width: 413, height: 531, format: 'JPEG', maxKB: 500, dpi: 300, note: '35×45mm, 300 DPI' },
      { name: 'Visa Photo', icon: '✈️', width: 600, height: 600, format: 'JPEG', maxKB: 200, dpi: 300, note: '2×2 inch, 300 DPI' },
      { name: 'OCI Card', icon: '🌐', width: 413, height: 531, format: 'JPEG', maxKB: 300, dpi: 300, note: '35×45mm' },
    ]
  },
  {
    category: '🎓 Exam & Education',
    items: [
      { name: 'JEE / NEET', icon: '📐', width: 200, height: 230, format: 'JPEG', maxKB: 200, dpi: 96, note: '10–200KB, JPG' },
      { name: 'NTA / CUET', icon: '📝', width: 200, height: 230, format: 'JPEG', maxKB: 100, dpi: 96, note: '< 100KB, JPG' },
      { name: 'UPSC CSE', icon: '⚖️', width: 200, height: 230, format: 'JPEG', maxKB: 300, dpi: 96, note: '< 300KB, JPG' },
      { name: 'Gate / CAT', icon: '🧠', width: 200, height: 230, format: 'JPEG', maxKB: 500, dpi: 96, note: '< 500KB' },
    ]
  },
  {
    category: '💼 Professional',
    items: [
      { name: 'LinkedIn Profile', icon: '🔵', width: 400, height: 400, format: 'PNG', maxKB: 8000, dpi: 72, note: '400×400, < 8MB' },
      { name: 'Resume Photo', icon: '📄', width: 330, height: 420, format: 'JPEG', maxKB: 200, dpi: 150, note: '3.5×4.5 cm' },
      { name: 'Signature', icon: '✍️', width: 600, height: 200, format: 'PNG', maxKB: 100, dpi: 96, note: 'Transparent BG' },
    ]
  },
  {
    category: '📱 Social Media',
    items: [
      { name: 'Instagram Post', icon: '📷', width: 1080, height: 1080, format: 'JPEG', maxKB: 5000, dpi: 72, note: '1080×1080' },
      { name: 'WhatsApp DP', icon: '💬', width: 500, height: 500, format: 'JPEG', maxKB: 5000, dpi: 72, note: '500×500' },
      { name: 'Facebook Cover', icon: '📘', width: 851, height: 315, format: 'JPEG', maxKB: 5000, dpi: 72, note: '851×315' },
      { name: 'Twitter/X Header', icon: '🐦', width: 1500, height: 500, format: 'JPEG', maxKB: 5000, dpi: 72, note: '1500×500' },
    ]
  },
];

export default function PresetsPanel({ onSelectPreset }) {
  return (
    <section id="presets" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', color: '#7c3aed' }}
        >
          ⚡ Ready-Made Presets
        </div>
        <h2 className="text-4xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>
          One Click. <span className="gradient-text">Perfect Size.</span>
        </h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Select any preset to auto-fill all settings — no manual math required.
        </p>
      </motion.div>

      <div className="space-y-10">
        {PRESETS.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.08 }}
          >
            <h3
              className="text-base font-bold mb-4"
              style={{ color: 'var(--text-secondary)', letterSpacing: '0.02em' }}
            >
              {group.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {group.items.map((preset, pi) => (
                <motion.div
                  key={preset.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectPreset(preset)}
                  className="preset-card cursor-pointer group"
                >
                  <div className="text-3xl mb-2">{preset.icon}</div>
                  <div className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {preset.name}
                  </div>
                  <div
                    className="text-xs px-2 py-1 rounded-full inline-block font-medium"
                    style={{
                      background: 'rgba(124,58,237,0.1)',
                      color: '#7c3aed',
                    }}
                  >
                    {preset.note}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
