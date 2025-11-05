import PageShell from '@/components/PageShell';
import { getArticleBySlug } from '@/lib/queries';

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const a = await getArticleBySlug(params.slug);
  if (!a) return <PageShell title="Not found">Article not found.</PageShell>;

  // Safe fallbacks for title and HTML body
  const title: string = a.seo_title ?? a.title ?? a.name ?? a.slug;
  const html: string = a.body ?? a.content ?? '';

  return (
    <PageShell title={title}>
      {/* Replace with your real MD/blocks renderer when ready */}
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </PageShell>
  );
}
