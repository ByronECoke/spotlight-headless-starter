import SEO from '@/components/SEO'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Podcast Production Bristol | Spotlight on Local – Bristol Media Hub',
  description: 'End-to-end podcast production in Bristol. Recording, editing, shorts, and distribution.'
}

export default function ServicePage(){
  return (
    <div className="space-y-6">
      <SEO jsonLd={serviceSchema('Podcast Production','Bristol')} />
      <h1 className="text-3xl font-bold">Podcast Production in Bristol for Local Brands &amp; Creators</h1>
      <p>
        You’re here because you need a clear, fast way to plan, record, and publish a podcast that
        actually drives bookings.
      </p>
      <ul className="list-disc pl-5">
        <li>📞 <strong>Call:</strong> 0117 000 0000</li>
        <li>🔗 <a className="underline" href="/apply">Book a Feature Call</a></li>
      </ul>

      <h2 className="text-xl font-semibold">What’s included</h2>
      <ul className="list-disc pl-5">
        <li>Recording support (remote or on-location)</li>
        <li>Editing and mastering</li>
        <li>5–15 short-form video clips</li>
        <li>Distribution and GBP post copy</li>
      </ul>

      <h2 className="text-xl font-semibold">FAQs</h2>
      <p><strong>How soon can we record?</strong> Usually within 7–10 days.</p>
      <p><strong>Do you do one-off features?</strong> Yes—sponsor or guest features available.</p>

      <hr className="my-6" />
      <a className="underline" href="/bristol">Back to Bristol hub</a>
    </div>
  )
}
