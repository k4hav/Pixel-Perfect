import "./globals.css";

export const metadata = {
  title: "PixelPerfect — AI Image Optimizer & Editor",
  description: "Resize, compress, convert & optimize images for Aadhaar, PAN, Passport, government forms, JEE/NEET, LinkedIn, and more. Free, fast, and AI-powered.",
  keywords: "image resize, compress image, convert image, passport photo, aadhaar photo resize, pan card photo, image optimizer, photo compressor",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: "PixelPerfect — AI Image Optimizer",
    description: "Make any image upload-ready in seconds. No signup required.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
