// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const runtime = 'nodejs';         // one definition only
export const dynamic = 'force-dynamic';  // one definition only

export const metadata = {
  title: 'Spotlight on Local – Media Network',
  description: 'Local media & podcast features that turn attention into bookings.',
};

async function getCities() {
  try {
    const rows = await directus.request(
      readItems('cities' as any, {
        fields: ['slug', 'name'],
        sort: ['name'],
        filter: { status: { _eq: 'published' } },
        limit: 100,
      })
    );
    if (Array.isArray(rows) && rows.length) {
      return rows.map((r: any) => ({ slug: r.slug, name: r.name }));
    }
  } catch {
    // swallow any Directus error
  }
  return [
    { slug: 'bristol', name: 'Bristol' },
    { slug: 'cheltenham', name: 'Cheltenham' },
    { slug: 'cambridge', name: 'Cambridge' },
  ];
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cities = await getCities();

  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container py-4 flex items-center gap-4">
            <a href="/" className="font-bold">Spotlight on Local</a>
            <nav className="text-sm text-gray-600 flex gap-4">
              {cities.map((c) => (
                <a key={c.slug} href={`/${c.slug}`}>{c.name}</a>
              ))}
              <a href="/episodes">Episodes</a>
              <a href="/snippets">Snippets</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t mt-16">
          <div className="container py-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Spotlight on Local
          </div>
        </footer>
      </body>
    </html>
  );
}
