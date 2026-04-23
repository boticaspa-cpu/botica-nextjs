import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/JsonLd';
import { BOTICA_SPA_SCHEMA } from '@/lib/seo/schemas';
import { translations } from '@/lib/translations';
import type { Lang, LangParams } from '../layout';

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return generateSEOMetadata({
    title: isEs
      ? 'Blog de Bienestar | Masajes y Spa | Botica Spa Playa del Carmen'
      : 'Wellness Blog | Massage & Spa Tips | Botica Spa Playa del Carmen',
    description: isEs
      ? 'Guías de bienestar, consejos de masajes y todo sobre el spa a domicilio en Playa del Carmen. Escrito por los expertos de Botica Spa.'
      : 'Wellness guides, massage tips, and everything about in-home spa in Playa del Carmen. Written by the Botica Spa experts.',
    keywords: isEs
      ? 'blog bienestar, masajes playa del carmen, spa domicilio, guías masaje'
      : 'wellness blog, massage playa del carmen, in home spa, massage guides',
    canonical: isEs
      ? 'https://www.boticaspa.com/es/blog'
      : 'https://www.boticaspa.com/blog',
    ogImage: 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'website',
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];

  return (
    <>
      <JsonLd data={BOTICA_SPA_SCHEMA} />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">{t.blog.badge}</p>
        <h1 className="text-4xl font-bold mb-12">{t.blog.title}</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.blog.posts.map((post) => (
            <Link
              key={post.id}
              href={isEs ? `/es/blog/${post.id}` : `/blog/${post.id}`}
              className="group block border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.image && (
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                <h2 className="font-semibold text-lg mb-2 leading-snug">{post.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-medium underline underline-offset-4">
                  {t.blog.readMore}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
