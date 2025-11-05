// app/[city]/places/[slug]/page.tsx
import PageShell from '@/components/PageShell';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const revalidate = 60;

type Params = { params: { city: string; slug: string } };

export default async function PlacePage({ params }: Params) {
  const rows = await directus.request(
    readItems('businesses', {
      filter: { slug: { _eq: params.slug }, city: { slug: { _eq: params.city } } },
      limit: 1,
      fields: ['name', 'slug', 'summary', 'hero_image.*'],
    })
  );

  const b = rows?.[0] as { name?: string; slug: string; summary?: string } | undefined;
  if (!b) return <PageShell title="Not found">Place not found.</PageShell>;

  return (
    <PageShell title={b.name ?? b.slug}>
      <p>{b.summary ?? ''}</p>
    </PageShell>
  );
}