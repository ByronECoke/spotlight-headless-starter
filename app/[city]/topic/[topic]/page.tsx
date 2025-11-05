// app/[city]/topic/[topic]/page.tsx
import PageShell from '@/components/PageShell';
import { getBusinessesByCityAndTopic, type BusinessLite } from '@/lib/directus';

export const revalidate = 60;

type Params = { params: { city: string; topic: string } };

export default async function TopicPage({ params }: Params) {
  const { city, topic } = params;
  const businesses: BusinessLite[] = await getBusinessesByCityAndTopic(city, topic);

  return (
    <PageShell title={`${city} / ${topic}`}>
      <ul>
        {businesses.map((b) => (
          <li key={b.slug}>
            <a href={`/${city}/places/${b.slug}`}>{b.name}</a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

// (Optional) pre-render per-topic pages
export async function generateStaticParams() {
  const { getAllCities } = await import('@/lib/queries');
  const { getCityTopics } = await import('@/lib/directus');

  const cities = await getAllCities();
  const pairs: { city: string; topic: string }[] = [];
  for (const c of cities) {
    const topics = await getCityTopics(c.slug);
    for (const t of topics) {
      pairs.push({ city: c.slug, topic: t.topic.slug });
    }
  }
  return pairs;
}