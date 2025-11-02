export default function HomePage(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bringing Local Stories to Life Across the UK</h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        Discover the people, places, and professionals that make your city thrive.
        Spotlight on Local connects audiences with trusted local experts through podcasts,
        video features, and digital storytelling that turn attention into real-world bookings.
      </p>
      <div className="flex gap-3">
        <a className="px-4 py-2 rounded-2xl bg-black text-white" href="/apply">Apply to Be Featured</a>
        <a className="px-4 py-2 rounded-2xl border" href="/sponsor">Sponsor an Episode</a>
      </div>
    </div>
  )
}
