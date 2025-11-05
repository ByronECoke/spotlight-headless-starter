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

export const directus = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN_PUBLIC));

/** Types */
export type CityTopic = {
  id: string;
  topic: { slug: string; title?: string | null; name?: string | null };
};

export type BusinessLite = {
  id: string;
  name: string;
  slug: string;
};

/** Helpers */
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

export async function getCityTopics(citySlug: string): Promise<CityTopic[]> {
  return (await directus.request(
    readItems('city_topics', {
      filter: { city: { slug: { _eq: citySlug } } },
      limit: 100,
      fields: ['id', 'topic.slug', 'topic.title', 'topic.name'],
      sort: ['topic.title', 'topic.name'],
    })
  )) as unknown as CityTopic[];
}

export async function getBusinessesByCityAndTopic(
  citySlug: string,
  topicSlug: string
): Promise<BusinessLite[]> {
  return (await directus.request(
    readItems('businesses', {
      filter: {
        city: { slug: { _eq: citySlug } },
        // Change 'business_topics' to your actual M2M alias if different
        business_topics: { topic: { slug: { _eq: topicSlug } } },
      },
      fields: ['id', 'name', 'slug'],
      limit: 100,
      sort: ['name'],
    })
  )) as unknown as BusinessLite[];
}

export async function getSiteConfig() {
  try {
    return await directus.request(readSingleton('site_config'));
  } catch {
    return null;
  }
}