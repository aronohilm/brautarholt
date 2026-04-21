import { useLanguage } from '../LanguageContext'

export default function Architects() {
  const { t } = useLanguage()
  const a = t.architects

  return (
    <section className="arch-section">
      <div className="wrap">
        <div className="sec-eyebrow reveal">{a.eyebrow}</div>
        <h2 className="sec-title reveal d1">
          {a.h2} <em>{a.h2em}</em>
        </h2>
        <div className="arch-grid">
          {a.cards.map((card, i) => (
            <div className={`arch-card reveal d${i}`} key={card.no}>
              <div className="arch-no">{card.no}</div>
              <div className="arch-name">{card.name}<em>{card.it}</em></div>
              <div className="arch-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
