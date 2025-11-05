// lib/directus.ts
import {
  createDirectus,
  rest,
  staticToken,
  readItems,
  readSingleton,
} from '@directus/sdk';

const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN_PUBLIC = process.env.DIRECTUS_TOKEN_PUBLIC!;

// Single Directus client (browser-safe because it's a public read token)
export const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN_PUBLIC));

// Example helpers — use as needed
export async function getCity(slug: string) {
  const rows = await directus.request(
    readItems('cities', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ['id', 'slug', 'name', 'summary', 'hero_image.*'],
    })
  );
  return rows?.[0] ?? null;
}

export async function getBusiness(citySlug: string, placeSlug: string) {
  const rows = await directus.request(
    readItems('businesses', {
      filter: {
        slug: { _eq: placeSlug },
        city: { slug: { _eq: citySlug } },
      },
      limit: 1,
      fields: [
        'id',
        'name',
        'slug',
        'summary',
        'city.slug',
        'hero_image.*',
        'categories.*',
      ],
    })
  );
  return rows?.[0] ?? null;
}

// Example: site-wide config singleton (if you made one)
export async function getSiteConfig() {
  try {
    return await directus.request(readSingleton('site_config'));
  } catch {
    return null;
  }
}

// Types for City Topics
export type CityTopic = {
  id: string;
  topic: {
    slug: string;
    // depending on your table it might be "title" or "name"
    title?: string | null;
    name?: string | null;
  };
};

// Fetch topics for a given city (joins city_topics → core_topics)
export async function getCityTopics(citySlug: string): Promise<CityTopic[]> {
  return directus.request(
    readItems('city_topics', {
      filter: { city: { slug: { _eq: citySlug } } },
      limit: 100,
      // ask Directus for the nested fields you use in the UI
      fields: ['id', 'topic.slug', 'topic.title', 'topic.name'],
      sort: ['topic.title', 'topic.name'],
    })
  ) as unknown as CityTopic[];
}
