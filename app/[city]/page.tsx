// app/[city]/page.tsx
import PageShell from '@/components/PageShell';
import { getCityBySlug, type City } from '@/lib/queries';
import { getCityTopics, type CityTopic } from '@/lib/directus';

export const revalidate = 60;

type Params = { params: { city: string } };

export default async function CityPage({ params }: Params) {
  const citySlug = params.city;
  const city: City | null = await getCityBySlug(citySlug);
  const topics: CityTopic[] = await getCityTopics(citySlug);

  return (
    <PageShell title={city?.name ?? citySlug}>
      <p>{city?.summary ?? ''}</p>
      <ul>
        {topics.map((t) => {
          const label = t.topic.title ?? t.topic.name ?? t.topic.slug;
          return (
            <li key={t.topic.slug}>
              <a href={`/${citySlug}/topic/${t.topic.slug}`}>{label}</a>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}

// Pre-render the known cities
export async function generateStaticParams() {
  const { getAllCities } = await import('@/lib/queries');
  const cities = await getAllCities();
  return cities.map((c) => ({ city: c.slug }));
}
