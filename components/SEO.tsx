'use client'
import Script from 'next/script'
export default function SEO({ jsonLd }: { jsonLd?: object }){
  if(!jsonLd) return null
  return <Script id="ld-json" type="application/ld+json">{JSON.stringify(jsonLd)}</Script>
}
