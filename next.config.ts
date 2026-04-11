import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg"],
  serverActions: {
    bodySizeLimit: '20mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/lawfirm/**',
      },
    ],
  },
};

export default nextConfig;
