import { Star, Quote } from 'lucide-react'
import { useLanguage } from '../LanguageContext'

const testimonials = [
  {
    name: 'James Harrington',
    origin: 'Edinburgh, Scotland',
    handicap: 'HCP 8',
    quote:
      'The most unique round of golf I\'ve ever played. The midnight sun, the volcanic rock, the silence — it\'s otherworldly. Brautarholt is now permanently on my bucket list.',
    stars: 5,
  },
  {
    name: 'Marta Lindqvist',
    origin: 'Stockholm, Sweden',
    handicap: 'HCP 14',
    quote:
      'As a Scandinavian I thought I knew Nordic golf. I was wrong. The course challenges you in every way imaginable — wind, terrain, beauty. I\'m already planning my return.',
    stars: 5,
  },
  {
    name: 'Robert Keane',
    origin: 'Dublin, Ireland',
    handicap: 'HCP 5',
    quote:
      'Ranked 61st in Europe and honestly I\'d argue it deserves higher. The greens are immaculate, the staff exceptional, and the views from hole 14 are simply unreal.',
    stars: 5,
  },
]

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-[#c9a84c] fill-[#c9a84c]" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()
  const r = t.testimonials

  return (
    <section className="py-20 md:py-28 bg-[#0d1f0d]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase mb-4 font-light">
            {r.eyebrow}
          </p>
          <h2
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            className="text-white text-4xl md:text-5xl font-light leading-tight"
          >
            {r.h2}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimony) => (
            <div
              key={testimony.name}
              className="bg-white/5 border border-white/8 p-8 flex flex-col hover:bg-white/8 transition-colors duration-300"
            >
              <Quote size={28} className="text-[#c9a84c]/40 mb-4" strokeWidth={1} />
              <p className="text-white/75 text-base font-light leading-relaxed flex-1 mb-6 italic">
                "{testimony.quote}"
              </p>
              <div className="border-t border-white/10 pt-5">
                <StarRow count={testimony.stars} />
                <div className="mt-3">
                  <p className="text-white text-sm font-light">{testimony.name}</p>
                  <p className="text-white/45 text-xs font-light mt-0.5">
                    {testimony.origin} · {testimony.handicap}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
          <div>
            <div
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              className="text-[#c9a84c] text-3xl font-light"
            >
              4.9
            </div>
            <div className="text-white/45 text-xs tracking-[0.2em] uppercase mt-1">
              {r.avgRating}
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/15" />
          <div>
            <div
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              className="text-[#c9a84c] text-3xl font-light"
            >
              2,400+
            </div>
            <div className="text-white/45 text-xs tracking-[0.2em] uppercase mt-1">
              {r.rounds}
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/15" />
          <div>
            <div
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              className="text-[#c9a84c] text-3xl font-light"
            >
              Golf Digest
            </div>
            <div className="text-white/45 text-xs tracking-[0.2em] uppercase mt-1">
              {r.bestCourse}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
