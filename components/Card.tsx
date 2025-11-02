import Link from 'next/link'
export function Card({ title, subtitle, href }: { title:string; subtitle?:string; href?:string }){
  const content = (
    <div className="border rounded-2xl p-4 hover:shadow-sm transition">
      <div className="font-semibold">{title}</div>
      {subtitle ? <div className="text-sm text-gray-600 mt-1">{subtitle}</div> : null}
    </div>
  )
  return href ? <Link href={href}>{content}</Link> : content
}
