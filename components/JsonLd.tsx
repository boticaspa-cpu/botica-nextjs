/**
 * Server component — injects a JSON-LD <script> tag into the page <head>.
 * No 'use client' needed; runs at render time on the server.
 *
 * Usage:
 *   import { JsonLd } from '@/components/JsonLd';
 *   import { BOTICA_SPA_SCHEMA } from '@/lib/seo/schemas';
 *
 *   export default function Page() {
 *     return (
 *       <>
 *         <JsonLd data={BOTICA_SPA_SCHEMA} />
 *         <main>...</main>
 *       </>
 *     );
 *   }
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
