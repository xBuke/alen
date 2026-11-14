import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "orguljarstvo-kvaternik.hr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    // Sekcija Projekti uklonjena (studeni 2026.) — stari linkovi vode na galeriju.
    return [
      { source: "/projekti", destination: "/galerija", permanent: true },
      { source: "/projekti/:path*", destination: "/galerija", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
