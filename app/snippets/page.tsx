import { parseStringPromise } from 'xml2js'
export const revalidate = 3600

type Vid = { title: string; videoId: string; published: string; link: string; thumbnail: string }

async function getVideos(): Promise<Vid[]>{
  const channel = process.env.YT_CHANNEL_ID
  if(!channel) return []
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`, { next: { revalidate: 3600 } })
  if(!res.ok) return []
  const xml = await res.text()
  const data = await parseStringPromise(xml as unknown as string)
  const entries = (data as any)?.feed?.entry || []
  return entries.map((en:any)=>({ title:en.title?.[0]||'', videoId:en['yt:videoId']?.[0]||'', published:en.published?.[0]||'', link:en.link?.[0]?.$.href||'#', thumbnail:`https://i.ytimg.com/vi/${en['yt:videoId']?.[0]}/hqdefault.jpg` }))
}
export default async function SnippetsPage(){
  const vids: Vid[] = await getVideos()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Daily Video Snippets</h1>
      <p className="text-gray-700">Pulled automatically from your YouTube channel’s RSS (latest 20).</p>
      <div className="grid md:grid-cols-3 gap-4">
        {vids.slice(0,20).map((v: Vid, i: number)=>(
          <a key={i} href={v.link} className="group border rounded-2xl overflow-hidden hover:shadow-sm transition">
            <img src={v.thumbnail} alt={v.title} className="w-full aspect-video object-cover" />
            <div className="p-3">
              <div className="font-semibold line-clamp-2 group-hover:underline">{v.title}</div>
              <div className="text-xs text-gray-500 mt-1">{v.published}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
