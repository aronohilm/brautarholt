import { useLanguage } from '../LanguageContext'

export default function FinalCTA({ onBook }) {
  const { t } = useLanguage()
  const f = t.finalCta

  return (
    <section className="cta-final">
      <div className="cta-bg" />
      <div className="cta-content">
        <div className="sec-eyebrow centered reveal">{f.eyebrow}</div>
        <h2 className="cta-title reveal d1">
          {f.h2a}<br /><em>{f.h2em}</em>
        </h2>
        <p className="cta-sub reveal d2">{f.sub}</p>
        <div className="cta-btns reveal d3">
          <button className="btn-primary" onClick={onBook}>{f.cta1}</button>
          <a href="#membership" className="btn-ghost">{f.cta2}</a>
          <a href="tel:5666045" className="btn-ghost">{f.cta3}</a>
        </div>
      </div>
    </section>
  )
}
