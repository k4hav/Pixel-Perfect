<div align="center">

<img src="https://img.shields.io/badge/⚡-PixelPerfect-7c3aed?style=for-the-badge&labelColor=0a0a1a" alt="PixelPerfect" />

# PixelPerfect — Image Optimizer

**A premium, browser-based image processing tool with a macOS Liquid Glass UI.**  
Compress · Resize · Convert · Adjust · Transform — all locally, zero uploads.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-a78bfa?style=flat-square)](LICENSE)

</div>

---

## 🌟 Overview

**PixelPerfect** is a fully client-side image optimization suite that runs entirely in your browser. Upload any image and instantly compress it, resize it to exact pixel/cm/mm/inch dimensions, convert between formats, fine-tune brightness/contrast/saturation, or transform it with rotations and flips — then download the result in one click.

No servers. No file uploads. No API keys. Your images never leave your device.

---

## ✨ Features

### 🗜️ Compress
- Adjustable quality slider (1–100%)
- Quick presets: **Web**, **Print**, **Max Quality**, **Tiny**
- Target file size input (KB / MB) with smart presets (`<20KB`, `<50KB`, `<100KB`…)
- Real-time size savings display with animated progress bar

### 📐 Resize
- Input dimensions in **Pixels, Centimeters, Millimeters, or Inches**
- Live unit conversion powered by DPI (dots per inch)
- DPI presets: 72 · 96 · 150 · 300 · 600 + custom DPI input
- Aspect ratio lock with a single click

### 🔄 Convert
- Output formats: **JPEG · PNG · WEBP · PDF**
- Visual format selector with format guide
- Lossless PNG, high-efficiency WEBP, print-ready PDF

### 🎨 Adjust
- **Brightness** (0–200%)
- **Contrast** (0–200%)
- **Saturation** (0–200%)
- **Sharpness** (−100 to +100)
- One-click reset to defaults

### 🔁 Transform
- **Rotate**: 0° · 90° · 180° · 270°
- **Flip**: Horizontal & Vertical
- Non-destructive transforms applied at export

### 📦 Batch Processing
- Upload and process multiple images at once
- Individual progress tracking per file
- Bulk download all results

### 🔒 Privacy-First
- Zero network requests for image data
- All processing happens via the Canvas API in-browser
- No accounts, no tracking, no ads

---

## 🖥️ UI & Design

- **macOS Liquid Glass** aesthetic — frosted glass panels, depth blur, soft shadows
- **Interactive 3D background** — rotating Spline scene with auto-play
- **Framer Motion** — spring-physics micro-animations on every interaction
- **Fully animated** — buttons, tab transitions, progress bars, download indicators
- **Dark mode only** — deep `#04040f` base with purple/violet accent system

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/image-optimizer.git

# 2. Navigate into the project
cd image-optimizer

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
image-optimizer/
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css        # Design system — CSS tokens, glass UI, animations
│   │   ├── layout.js          # Root layout, metadata, fonts
│   │   └── page.js            # Main page — orchestrates all components
│   ├── components/
│   │   ├── Navbar.jsx         # Fixed top navbar with logo + CTA
│   │   ├── Hero.jsx           # Hero section with stats
│   │   ├── ImageUploader.jsx  # Drag-and-drop file upload zone
│   │   ├── ToolPanel.jsx      # 5-tab tool panel (resize/compress/convert/adjust/transform)
│   │   ├── ResultPanel.jsx    # Preview, stats, download button
│   │   ├── BatchProcessor.jsx # Multi-file processing queue
│   │   ├── HowItWorks.jsx     # Feature explainer section
│   │   ├── SplineBackground.jsx # 3D iframe background
│   │   └── Footer.jsx         # Footer with copyright
│   └── lib/
│       └── imageProcessor.js  # Core Canvas API image processing logic
├── .gitignore
├── package.json
├── next.config.mjs
└── README.md
```

---

## 🏗️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 + Vanilla CSS |
| **Animations** | Framer Motion 11 |
| **3D Scene** | Spline Design (iframe) |
| **Image Processing** | browser-image-compression + Canvas API |
| **Icons** | Lucide React |
| **Font** | Inter (Google Fonts) |

---

## 📦 Build for Production

```bash
npm run build   # Build optimized production bundle
npm start       # Serve the production build
```

---

## 🌐 Deploy on Vercel

The fastest way to deploy — zero configuration needed:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy manually:
```bash
npm install -g vercel
vercel --prod
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

```
Copyright 2026 ƘҽՏհɑѵ. All Rights Reserved.
```

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with 💜 by **ƘҽՏհɑѵ**

⭐ Star this repo if you found it useful!

</div>
