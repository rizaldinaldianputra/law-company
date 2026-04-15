import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg", "@prisma/client"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'storage.zelixa.my.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.zelixa.my.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
