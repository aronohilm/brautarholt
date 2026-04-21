import { useLanguage } from '../LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section className="about-section" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <div className="sec-eyebrow reveal">{a.eyebrow}</div>
            <h2 className="sec-title reveal d1" style={{ marginBottom: 44 }}>
              {a.h2} <em>{a.h2em}</em>
            </h2>
            <div className="about-body">
              <p className="reveal d1">{a.p1}</p>
              <p className="reveal d2 muted">{a.p2}</p>
            </div>
            <div className="about-meta">
              {a.metaRows.map((row) => (
                <div className="meta-row" key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">{row.v}<small>{row.s}</small></span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-img reveal d2">
            <img src="/Screenshot%202026-04-20%20at%2022.22.16.png" alt="Brautarholt golf course" />
            <div className="about-img-caption">{a.caption}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
