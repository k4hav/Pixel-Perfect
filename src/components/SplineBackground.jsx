'use client';

import { useState } from 'react';

// Using iframe embed — this scene uses a binary payload, not a .splinecode file
const SPLINE_EMBED_URL = 'https://my.spline.design/rotatinginteractiveherosection-JV0DbF4sb4HLwVlTJUYCiqw8/';

export default function SplineBackground() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Spline iframe — full screen fixed background */}
      <div
        className="spline-bg"
        style={{ pointerEvents: 'none' }}
      >
        <iframe
          src={SPLINE_EMBED_URL}
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.6s ease',
          }}
          title="3D Background"
          loading="eager"
          allow="autoplay"
        />
      </div>

      {/* Semi-transparent overlay so content is readable */}
      <div className="spline-overlay" />

      {/* Gradient fade to hide Spline watermark — no ugly black strip */}
      <div className="spline-watermark-cover" />
    </>
  );
}
