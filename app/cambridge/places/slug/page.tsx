import PageShell from "@/components/PageShell";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export const revalidate = 60;

export default async function BusinessPage({
  params,
}: {
  params: { city: string; slug: string };
}) {
  const rows = await directus.request(
    readItems("businesses" as any, {
      fields: [
        "name",
        "slug",
        "website",
        "address",
        "description",
        "city.slug",
      ],
      filter: { slug: { _eq: params.slug }, status: { _eq: "published" } },
      limit: 1,
    }),
  );
  const b = rows?.[0];
  if (!b) return <PageShell title="Not found">Business not found.</PageShell>;
  return (
    <PageShell title={b.name}>
      <p>{b.address}</p>
      <p>
        <a href={b.website} target="_blank">
          Website
        </a>
      </p>
      <p>{b.description}</p>
    </PageShell>
  );
}