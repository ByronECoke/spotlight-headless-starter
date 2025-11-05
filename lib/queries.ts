// lib/queries.ts
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

// re-export/get shim so older pages keep working
import { getCityTopics as _getCityTopics, type CityTopic } from '@/lib/directus';
export type { CityTopic } from '@/lib/directus';
export async function getTopicsForCity(citySlug: string): Promise<CityTopic[]> {
  return _getCityTopics(citySlug);
}

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
  title?: string | null;
  name?: string | null;
  summary?: string | null;
  body?: string | null;       // html/markdown field (optional)
  content?: string | null;    // alternate body field (optional)
  seo_title?: string | null;  // <-- add this
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
        'seo_title',     // <-- make sure we fetch it
        'hero_image.*',
      ],
    })
  );
  return (rows as unknown as Article[])[0] ?? null;
}