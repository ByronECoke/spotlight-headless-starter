import { directus } from "./directus";
import { readItems } from "@directus/sdk";

type City = { slug: string; name: string };

type Topic = { slug: string; title: string };

export async function getAllCities(): Promise<City[]> {
  return directus.request(
    readItems("cities" as any, {
      fields: ["slug", "name"],
      filter: {
        status: { _eq: "published" },
        _or: [
          { publish_at: { _null: true } },
          { publish_at: { _lte: "$NOW" } },
        ],
      },
      sort: ["name"],
      limit: -1,
    }),
  );
}

export async function getCityBySlug(slug: string) {
  const rows = await directus.request(
    readItems("cities" as any, {
      fields: ["slug", "name", "summary", "hero_image.*"],
      filter: { slug: { _eq: slug }, status: { _eq: "published" } },
      limit: 1,
    }),
  );
  return rows?.[0] || null;
}

export async function getTopicsForCity(slug: string) {
  // Expand city_topics -> topic
  return directus.request(
    readItems("city_topics" as any, {
      fields: ["priority", "topic.slug", "topic.title"],
      filter: {
        status: { _eq: "published" },
        city: { cities_id: { slug: { _eq: slug } } },
      },
      sort: ["priority"],
      limit: -1,
    }) as any,
  );
}

export async function getBusinessesByCityTopic(
  citySlug: string,
  topicSlug: string,
) {
  return directus.request(
    readItems("businesses" as any, {
      fields: [
        "name",
        "slug",
        "website",
        "address",
        "logo.*",
        "seo_title",
        "seo_description",
      ],
      filter: {
        status: { _eq: "published" },
        city: { cities_id: { slug: { _eq: citySlug } } },
        topics: { core_topics_id: { slug: { _eq: topicSlug } } },
      },
      limit: -1,
    }) as any,
  );
}

export async function getArticleBySlug(slug: string) {
  const rows = await directus.request(
    readItems("articles" as any, {
      fields: [
        "title",
        "slug",
        "body",
        "cover_image.*",
        "seo_title",
        "seo_description",
        "city.slug",
        "topic.slug",
      ],
      filter: {
        slug: { _eq: slug },
        status: { _eq: "published" },
        _or: [
          { publish_at: { _null: true } },
          { publish_at: { _lte: "$NOW" } },
        ],
      },
      limit: 1,
    }),
  );
  return rows?.[0] || null;
}