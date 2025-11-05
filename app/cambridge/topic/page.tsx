import { PageShell } from '@/components/PageShell';
import { getBusinessesByCityAndTopic, type BusinessLite } from '@/lib/directus';

export default async function Page({
  params,
}: {
  params: { city: string; topic: string };
}) {
  // Fetch businesses from Directus based on city + topic
  const businesses: BusinessLite[] = await getBusinessesByCityAndTopic(
    params.city,
    params.topic
  );

  return (
    <PageShell title={`${params.city} / ${params.topic}`}>
      <ul>
        {businesses.map((b) => (
          <li key={b.slug}>
            <a href={`/${params.city}/places/${b.slug}`}>{b.name}</a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}