import PageShell from "@/components/PageShell";
import { getArticleBySlug } from "@/lib/queries";

export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const a = await getArticleBySlug(params.slug);
  if (!a) return <PageShell title="Not found">Article not found.</PageShell>;
  return (
    <PageShell title={a.seo_title ?? a.title ?? a.name ?? a.slug}>
      {/* Simple render; replace with your MD/blocks renderer */}
      <article dangerouslySetInnerHTML={{ __html: a.body }} />
    </PageShell>
  );
}