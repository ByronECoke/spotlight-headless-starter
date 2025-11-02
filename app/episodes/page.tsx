import { parseStringPromise } from 'xml2js'
export const revalidate = 3600

type Episode = { title: string; link: string; pubDate: string; description: string }

async function getEpisodes(): Promise<Episode[]>{
  const rss = process.env.PODCAST_RSS
  if(!rss) return []
  const res = await fetch(rss, { next: { revalidate: 3600 } })
  if(!res.ok) return []
  const xml = await res.text()
  const data = await parseStringPromise(xml as unknown as string)
  const items = (data as any)?.rss?.channel?.[0]?.item || []
  return items.map((it:any)=>({ title:it.title?.[0]||'', link:it.link?.[0]||'#', pubDate:it.pubDate?.[0]||'', description:(it['itunes:summary']?.[0]||it.description?.[0]||'').replace(/<[^>]*>/g,'') }))
}
export default async function EpisodesPage(){
  const episodes: Episode[] = await getEpisodes()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest Podcast Episodes</h1>
      <p className="text-gray-700">This list updates automatically from your podcast RSS feed.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {episodes.slice(0,20).map((e: Episode, i: number)=>(
          <a key={i} href={e.link} className="border rounded-2xl p-4 hover:shadow-sm transition">
            <div className="font-semibold">{e.title}</div>
            <div className="text-sm text-gray-600 mt-1">{e.pubDate}</div>
            <p className="text-sm mt-2 line-clamp-3">{e.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
