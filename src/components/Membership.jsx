import { useLanguage } from '../LanguageContext'

export default function Membership() {
  const { t } = useLanguage()
  const m = t.membership

  return (
    <section className="mem-section" id="membership">
      <div className="wrap">
        <div className="mem-head">
          <div>
            <div className="sec-eyebrow reveal">{m.eyebrow}</div>
            <h2 className="sec-title reveal d1">{m.h2} <em>{m.h2em}</em></h2>
          </div>
          <p className="mem-head-note reveal d2">{m.note}</p>
        </div>
        <div className="mem-grid">
          {m.tiers.map((tier, i) => (
            <div className={`mem-card${tier.feat ? ' feat' : ''} reveal d${i}`} key={i}>
              <div className="mem-sub">{tier.tag}</div>
              <div className="mem-name">{tier.name}<em>{tier.it}</em></div>
              <div className="mem-inc">{tier.inc}</div>
              <div className="mem-price">
                <div className="amount">{tier.price}</div>
                <div className="curr">{m.unit}</div>
              </div>
              <div className="mem-cta-row">
                <span>{m.joinNow}</span>
                <span className="mem-plus" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
