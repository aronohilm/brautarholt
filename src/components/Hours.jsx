import { useLanguage } from '../LanguageContext'

export default function Hours() {
  const { t } = useLanguage()
  const hours = t.hours

  return (
    <section className="hours-band">
      <div className="wrap">
        <div className="hours-grid">
          {hours.map((h, i) => (
            <div className={`reveal d${i}`} key={i}>
              <div className="hour-k">{h.k}</div>
              <div className="hour-big">{h.big}<em>{h.big2}</em></div>
              <div className="hour-note">{h.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
