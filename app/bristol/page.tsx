import { getAllCities, getCityBySlug, getTopicsForCity } from "@/lib/queries";
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
  const topics = await getTopicsForCity(params.city);
  return (
    <PageShell title={city.name}>
      <p>{city.summary}</p>
      <ul>
        {topics.map((t: any) => (
          <li key={t.topic.slug}>
            <a href={`/${params.city}/${t.topic.slug}`}>{t.topic.title}</a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}