/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // 🔥 CRITICAL PERFORMANCE FIX: Enable SWC Minifier & Compression
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Optimize package imports and tree-shaking
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "date-fns",
      "@heroicons/react",
      "react-icons",
    ],
  },


  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    domains: ["res.cloudinary.com", "ui-avatars.com", "images.unsplash.com", "yattra tutors.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3011",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3010",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3010",
        pathname: "/api/v1/uploads/**",
      },
      {
        protocol: "https",
        hostname: "yattra tutors.com",
        pathname: "/api/v1/uploads/**",
      },
      {
        protocol: "https",
        hostname: "yattra tutors.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
});
