import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img1.hscicdn.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
