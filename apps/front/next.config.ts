import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/_api/:path*',
        destination: `${process.env.URL_BACKEND}/:path*`,
        permanent: false,
      },
    ];
  },
  output: 'standalone'
};

export default nextConfig;
