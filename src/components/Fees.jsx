import { useLanguage } from '../LanguageContext'

export default function Fees({ onBook }) {
  const { t } = useLanguage()
  const f = t.fees

  return (
    <section className="fees-section" id="fees">
      <div className="wrap">
        <div className="fees-grid">
          <div>
            <div className="sec-eyebrow reveal">{f.eyebrow}</div>
            <h2 className="sec-title reveal d1">{f.h2} <em>{f.h2em}</em></h2>
            <p className="fee-copy-note reveal d2">{f.note}</p>
            <div style={{ marginTop: 40 }} className="reveal d3">
              <button className="btn-primary" onClick={onBook}>{f.cta}</button>
            </div>
          </div>
          <div className="fee-table reveal d2">
            {f.rows.map((row, i) => (
              <div className="fee-row" key={i}>
                <span className="fn">{row.n}</span>
                <span className="fnm">{row.nm}<small>{row.en}</small></span>
                <span className="fpr">{row.pr}<span>ISK</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
