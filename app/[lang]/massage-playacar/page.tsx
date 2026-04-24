import type { Metadata } from 'next';
import type { LangParams } from '../layout';
import { generateCityMetadata, CityPageContent } from '@/lib/city-page';

export const generateMetadata = ({ params }: { params: Promise<LangParams> }): Promise<Metadata> =>
  generateCityMetadata(params, 'playacar');

export default function Page({ params }: { params: Promise<LangParams> }) {
  return <CityPageContent params={params} city="playacar" />;
}
