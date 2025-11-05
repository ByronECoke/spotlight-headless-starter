// lib/queries.ts
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export type City = {
  slug: string;
  name: string;
};

export async function getAllCities(): Promise<City[]> {
  const rows = await directus.request(
    readItems('cities', {
      fields: ['slug', 'name'],
      sort: ['name'],
    })
  );
  // Directus SDK returns unknown/Record[] at compile time — assert to our shape
  return rows as unknown as City[];
}
