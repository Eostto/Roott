import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // permite un build de test în alt folder, fără să oprească `npm run dev`
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
