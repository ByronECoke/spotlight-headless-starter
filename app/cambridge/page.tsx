import { getAllCities, getCityBySlug, getTopicsForCity } from "@/lib/queries";
import { getCity, getCityTopics, type CityTopic } from "@/lib/directus";
import PageShell from "@/components/PageShell";

export const revalidate = 60; // fallback ISR

export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((c) => ({ city: c.slug }));
}

export default async function CityPage({
  params,
}: {
  params: { city: string };
}) {
  const city = await getCityBySlug(params.city);
  if (!city) return <PageShell title="Not found">City not found.</PageShell>;
  const topics: CityTopic[] = await getCityTopics(params.city);
  return (
    <PageShell title={city.name}>
      <p>{city.summary}</p>
      <ul>
        {topics.map((t) => {
          const label = t.topic.title ?? t.topic.name ?? t.topic.slug;
          return (
            <li key={t.topic.slug}>
              <a href={`/${params.city}/${t.topic.slug}`}>{label}</a>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}