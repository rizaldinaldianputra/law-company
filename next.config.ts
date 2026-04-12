import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg", "@prisma/client"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ejcbhupncuwcmcqoqede.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
