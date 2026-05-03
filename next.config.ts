import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "lucide-react"],
  },
};

export default nextConfig;
