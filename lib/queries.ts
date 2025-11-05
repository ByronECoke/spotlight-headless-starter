// lib/queries.ts
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

/** City types & queries */
export type City = {
  slug: string;
  name: string;
  summary?: string | null;
  hero_image?: any;
};

export async function getAllCities(): Promise<City[]> {
  const rows = await directus.request(
    readItems('cities', {
      fields: ['slug', 'name'],
      sort: ['name'],
    })
  );
  return rows as unknown as City[];
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const rows = await directus.request(
    readItems('cities', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ['slug', 'name', 'summary', 'hero_image.*'],
    })
  );
  return (rows as unknown as City[])[0] ?? null;
}

/** Article types & queries */
export type Article = {
  slug: string;
  // Depending on your schema, title may be 'title' or 'name'
  title?: string | null;
  name?: string | null;
  summary?: string | null;
  body?: string | null;     // if your collection uses 'body'
  content?: string | null;  // or 'content'
  hero_image?: any;
};

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await directus.request(
    readItems('articles', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: [
        'slug',
        'title',
        'name',
        'summary',
        'body',
        'content',
        'hero_image.*',
      ],
    })
  );
  return (rows as unknown as Article[])[0] ?? null;
}