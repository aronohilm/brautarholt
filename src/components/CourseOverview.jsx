import { Wind, Sun, Map, Award } from 'lucide-react'
import { useLanguage } from '../LanguageContext'

const icons = [Map, Sun, Wind, Award]

export default function CourseOverview() {
  const { t } = useLanguage()
  const c = t.course

  return (
    <section id="course" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-xl mb-16 md:mb-20">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase mb-4 font-light">
            {c.eyebrow}
          </p>
          <h2
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            className="text-[#0d1f0d] text-4xl md:text-5xl font-light leading-tight mb-5"
          >
            {c.h2a}<br />{c.h2b}
          </h2>
          <div className="w-14 h-px bg-[#c9a84c] mb-5" />
          <p className="text-[#6b6b6b] text-base font-light leading-relaxed">
            {c.body}
          </p>
        </div>

        {/* Two-column layout: image left, features right */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Course image */}
          <div className="relative">
            <div className="gallery-item aspect-[4/5] md:aspect-[3/4]">
              <img
                src="public/hole 1 green.jpg"
                alt="Brautarholt golf fairway with Icelandic landscape"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-0 md:-right-6 bg-[#c9a84c] px-6 py-5 text-center shadow-xl">
              <div
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                className="text-[#0d1f0d] text-3xl font-light"
              >
                {c.badge1}
              </div>
              <div className="text-[#0d1f0d] text-[9px] tracking-[0.25em] uppercase font-medium mt-0.5">
                {c.badge2}
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 pt-4 md:pt-0">
            {c.features.map((f, i) => {
              const Icon = icons[i]
              return (
                <div key={f.title}>
                  <div className="w-10 h-10 flex items-center justify-center border border-[#c9a84c]/40 mb-4">
                    <Icon size={18} className="text-[#c9a84c]" strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    className="text-[#0d1f0d] text-xl font-light mb-2"
                  >
                    {f.title}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm font-light leading-relaxed">
                    {f.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
