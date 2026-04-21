import { useLanguage } from '../LanguageContext'

export default function Stats() {
  const { t } = useLanguage()
  const s = t.stats

  const stats = [
    { value: '1933', label: s.founded },
    { value: '18', label: s.holes },
    { value: '#61', label: s.ranked },
    { value: '5,870m', label: s.length },
  ]

  return (
    <section id="stats" className="bg-[#0d1f0d] py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                className="text-[#c9a84c] text-4xl md:text-5xl font-light mb-2"
              >
                {s.value}
              </div>
              <div className="text-white/55 text-xs tracking-[0.2em] uppercase font-light">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
