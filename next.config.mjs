/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://my.spline.design https://prod.spline.design;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
