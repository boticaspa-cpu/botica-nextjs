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

        // ES: translate public Spanish slugs → internal English directory names
        { source: '/es/masajes',                    destination: '/es/massages' },
        { source: '/es/masajes/:slug*',             destination: '/es/massages/:slug*' },
        { source: '/es/sobre-nosotros',             destination: '/es/about' },
        { source: '/es/contacto',                   destination: '/es/contact' },
        { source: '/es/preguntas-frecuentes',       destination: '/es/faq' },
        { source: '/es/masaje-puerto-aventuras',    destination: '/es/massage-puerto-aventuras' },
        { source: '/es/masaje-puerto-morelos',      destination: '/es/massage-puerto-morelos' },
        { source: '/es/masaje-akumal',              destination: '/es/massage-akumal' },
        { source: '/es/masaje-playacar',            destination: '/es/massage-playacar' },

        // EN: all non-prefixed paths → /en/path
        {
          source: '/:path((?!en|es|api|_next|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\..*).*)',
          destination: '/en/:path',
        },
      ],
    };
  },
};

export default nextConfig;
