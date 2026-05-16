# ⚡ PixelPerfect — Image Optimizer

A premium, browser-based image optimizer built with **Next.js 15** and a macOS-inspired **Liquid Glass UI**. All processing happens locally in your browser — no uploads, no servers, 100% private.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

---

## ✨ Features

- 🗜️ **Compress** — Reduce file size with quality control & target size presets
- 📐 **Resize** — Change dimensions in **px, cm, mm, or inches** with DPI support
- 🔄 **Convert** — JPEG · PNG · WEBP · PDF format conversion
- 🎨 **Adjust** — Brightness, contrast, saturation, sharpness sliders
- 🔁 **Transform** — Rotate (0°/90°/180°/270°) and flip (horizontal/vertical)
- 📦 **Batch Processing** — Process multiple images at once
- 🔒 **100% Local** — No image ever leaves your browser
- 🌐 **Interactive 3D Background** — Powered by Spline

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Framer Motion |
| Styling | Tailwind CSS v4 + Custom CSS |
| 3D | Spline (iframe embed) |
| Image Processing | browser-image-compression |
| Icons | Lucide React |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Design system, glass UI tokens
│   ├── layout.js         # Root layout & metadata
│   └── page.js           # Main page
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── ToolPanel.jsx     # All 5 tool tabs (resize/compress/convert/adjust/transform)
│   ├── ResultPanel.jsx   # Preview + download
│   ├── BatchProcessor.jsx
│   ├── HowItWorks.jsx
│   ├── SplineBackground.jsx
│   └── Footer.jsx
└── lib/
    └── imageProcessor.js # Core processing logic
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📄 License

Copyright 2026 ƘҽՏհɑѵ. All Rights Reserved.
