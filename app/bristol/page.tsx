import SEO from '@/components/SEO'
import { localBusinessSchema } from '@/lib/schema'

export const metadata = {
  title: 'Media Company Bristol | Spotlight on Local – Bristol Media Hub',
  description: 'Podcast & media features for Bristol businesses. Get featured, sponsor episodes, and drive bookings.'
}

export default function BristolPage(){
  return (
    <div className="space-y-6">
      <SEO jsonLd={localBusinessSchema('Bristol','0117 000 0000')} />
      <h1 className="text-3xl font-bold">Media Company in Bristol for Local Brands &amp; Creators</h1>
      <div className="space-y-2">
        <p><strong>Tap to book a feature or sponsorship:</strong></p>
        <ul className="list-disc pl-5">
          <li>📞 <strong>Call:</strong> 0117 000 0000</li>
          <li>✉️ <strong>Enquiries:</strong> hello@spotlightonlocal.co.uk</li>
        </ul>
      </div>
      <p>
        We turn Bristol attention into bookings: podcast features, short-form video, and city-specific
        promotion that gives locals a reason to visit, call, or book.
      </p>

      <h2 className="text-xl font-semibold">Podcast Production – Bristol</h2>
      <p>Short paragraph about podcast production benefits and outcomes for Bristol businesses.</p>
      <a className="underline" href="/bristol/podcast-production">Go to Podcast Production →</a>

      <h2 className="text-xl font-semibold mt-6">Local Advertising – Bristol</h2>
      <p>Short paragraph about local ad placements, sponsor packages, and audience.</p>
      <a className="underline" href="/bristol/local-advertising">Go to Local Advertising →</a>

      <h2 className="text-xl font-semibold mt-6">Video Production – Bristol</h2>
      <p>Short paragraph about video shorts and reels creation from interviews.</p>
      <a className="underline" href="/bristol/video-production">Go to Video Production →</a>

      <hr className="my-6" />
      <h3 className="font-semibold">Find us</h3>
      <p>Embed your Google Business Profile map iframe here for Bristol.</p>
    </div>
  )
}
