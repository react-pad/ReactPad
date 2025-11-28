import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Optimize package imports for faster dev builds (works with Turbopack)
  // This enables tree-shaking and reduces bundle size during development
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-label",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@privy-io/react-auth",
      "@tanstack/react-query",
      "lucide-react",
      "wagmi",
      "viem",
    ],
  },
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
};

export default nextConfig;
