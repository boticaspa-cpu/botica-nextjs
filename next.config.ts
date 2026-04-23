import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'boticaspa.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Root → /en
        { source: '/', destination: '/en' },
        // English paths without prefix → /en/...
        {
          source: '/:path((?!en|es|api|_next|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\..*).*)',
          destination: '/en/:path',
        },
      ],
    };
  },
};

export default nextConfig;
