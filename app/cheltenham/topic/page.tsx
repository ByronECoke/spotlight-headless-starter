import { getAllCities, getBusinessesByCityTopic } from "@/lib/queries";
import PageShell from "@/components/PageShell";

export const revalidate = 60;

export async function generateStaticParams() {
  // Prebuild only city routes; topic pages will build on-demand
  const cities = await getAllCities();
  return cities.flatMap((c) => [] as any); // keep params empty → on-demand ISR
}

export default async function TopicPage({
  params,
}: {
  params: { city: string; topic: string };
}) {
  const businesses = await getBusinessesByCityTopic(params.city, params.topic);
  return (
    <PageShell title={`${params.city} / ${params.topic}`}>
      <ul>
        {businesses.map((b: any) => (
          <li key={b.slug}>
            <a href={`/${params.city}/places/${b.slug}`}>{b.name}</a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}