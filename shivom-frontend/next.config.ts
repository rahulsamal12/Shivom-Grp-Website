import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "swiper"],
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apishivom.visital.co.in",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'shivomgroup.com',
      },
      {
        protocol: 'https',
        hostname: 'api.shivomgroup.com',
      }
    ],
  },
};

export default nextConfig;
