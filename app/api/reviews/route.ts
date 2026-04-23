import { NextResponse } from 'next/server';

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CachedReviews {
  data: GoogleReview[];
  fetchedAt: number;
}

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

let cache: CachedReviews | null = null;

async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID ?? 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // fallback

  if (!apiKey) {
    console.warn('GOOGLE_MAPS_SERVER_KEY not set — returning empty reviews');
    return [];
  }

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
    { next: { revalidate: 3600 } } // Next.js ISR cache
  );

  if (!res.ok) return [];

  const json = await res.json();
  return (json.result?.reviews ?? []) as GoogleReview[];
}

export async function GET() {
  // In-memory cache to avoid hammering the Places API
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache.data);
  }

  const reviews = await fetchGoogleReviews();
  cache = { data: reviews, fetchedAt: Date.now() };

  return NextResponse.json(reviews, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
