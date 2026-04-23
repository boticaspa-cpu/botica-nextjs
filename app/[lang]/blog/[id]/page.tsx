import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { JsonLd } from '@/components/JsonLd';
import { translations } from '@/lib/translations';
import type { Lang, LangParams } from '../../layout';

function safeIso(dateStr: string): string | undefined {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export async function generateStaticParams() {
  return ['en', 'es'].flatMap((lang) =>
    translations.en.blog.posts.map((post) => ({ lang, id: post.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];
  const post = t.blog.posts.find((p) => p.id === id);

  if (!post) return {};

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: isEs
      ? 'masaje playa del carmen, spa domicilio, bienestar riviera maya'
      : 'massage playa del carmen, in home spa, wellness riviera maya',
    canonical: isEs
      ? `https://www.boticaspa.com/es/blog/${id}`
      : `https://www.boticaspa.com/blog/${id}`,
    ogImage: post.image
      ? `https://www.boticaspa.com${post.image}`
      : 'https://www.boticaspa.com/og-image.jpg',
    ogType: 'article',
    publishedDate: safeIso(post.date),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const isEs = lang === 'es';
  const t = translations[isEs ? 'es' : 'en'];
  const post = t.blog.posts.find((p) => p.id === id);

  if (!post) notFound();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `https://www.boticaspa.com${post.image}` : undefined,
    datePublished: safeIso(post.date),
    author: { '@type': 'Organization', name: 'Botica Spa', url: 'https://www.boticaspa.com' },
    publisher: { '@type': 'Organization', name: 'Botica Spa', url: 'https://www.boticaspa.com' },
    url: isEs ? `https://www.boticaspa.com/es/blog/${id}` : `https://www.boticaspa.com/blog/${id}`,
  };

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Botica Spa', url: 'https://www.boticaspa.com' },
    { name: 'Blog', url: isEs ? 'https://www.boticaspa.com/es/blog' : 'https://www.boticaspa.com/blog' },
    { name: post.title, url: `https://www.boticaspa.com${isEs ? '/es' : ''}/blog/${id}` },
  ]);

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbs} />
      <main className="max-w-3xl mx-auto px-4 py-20">
        <Link
          href={isEs ? '/es/blog' : '/blog'}
          className="text-sm text-gray-500 hover:text-black mb-8 inline-block"
        >
          ← {t.blog.backToBlog}
        </Link>

        {post.image && (
          <div className="relative h-72 rounded-2xl overflow-hidden mb-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <p className="text-sm text-gray-400 mb-3">{post.date}</p>
        <h1 className="text-4xl font-bold mb-8 leading-tight">{post.title}</h1>

        <div className="prose prose-gray max-w-none">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-6 leading-relaxed text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 border border-gray-100 rounded-2xl p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">{t.blog.ctaBadge}</p>
          <h2 className="text-2xl font-bold mb-3">{t.blog.ctaTitle}</h2>
          <p className="text-gray-600 mb-6">{t.blog.ctaDesc}</p>
          <a
            href="https://wa.me/529842687428"
            className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            {t.blog.ctaWhatsapp}
          </a>
        </div>
      </main>
    </>
  );
}
