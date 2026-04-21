import { useLanguage } from '../LanguageContext'

export default function Midnight() {
  const { t } = useLanguage()
  const m = t.midnight

  return (
    <section className="midnight-section" id="midnight">
      <div className="aurora">
        <div className="aurora-band" />
        <div className="aurora-band" />
        <div className="aurora-band" />
      </div>
      <div className="wrap midnight-content">
        <div className="mid-grid">
          <div>
            <div className="mid-tag reveal">{m.eyebrow}</div>
            <h2 className="mid-h reveal d1">
              {m.h2a}<br /><em>{m.h2em}</em>
            </h2>
            <p className="mid-sub reveal d2">{m.sub}</p>
            <div className="mid-facts reveal d3">
              {m.facts.map((f, i) => (
                <div className="mid-fact" key={i}>
                  <span className="idx">0{i + 1}</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48 }} className="reveal d4">
              <button className="btn-primary">{m.cta}</button>
            </div>
          </div>

          <div className="sun-diagram reveal d3">
            <svg viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(196,174,126,.08)" strokeWidth="1" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(196,174,126,.06)" strokeWidth="1" />
              <circle cx="150" cy="150" r="60" fill="none" stroke="rgba(196,174,126,.1)" strokeWidth="1" />
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2 - Math.PI / 2
                const x1 = 150 + 130 * Math.cos(angle)
                const y1 = 150 + 130 * Math.sin(angle)
                const x2 = 150 + 142 * Math.cos(angle)
                const y2 = 150 + 142 * Math.sin(angle)
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(196,174,126,.3)" strokeWidth={i % 3 === 0 ? 1.5 : 0.5} />
              })}
              {[[0,'00'],[6,'06'],[12,'12'],[18,'18']].map(([h, lbl]) => {
                const angle = (h / 24) * Math.PI * 2 - Math.PI / 2
                return <text key={h} x={150 + 118 * Math.cos(angle)} y={150 + 118 * Math.sin(angle)}
                  fill="rgba(196,174,126,.5)" fontSize="9" fontFamily="JetBrains Mono"
                  textAnchor="middle" dominantBaseline="middle">{lbl}</text>
              })}
              {/* Arc showing light window 22:00 – 02:00 */}
              <path
                d={`M${150 + 80*Math.cos((22/24)*Math.PI*2-Math.PI/2)} ${150+80*Math.sin((22/24)*Math.PI*2-Math.PI/2)} A 80 80 0 0 1 ${150+80*Math.cos((2/24)*Math.PI*2-Math.PI/2)} ${150+80*Math.sin((2/24)*Math.PI*2-Math.PI/2)}`}
                fill="none" stroke="#C4AE7E" strokeWidth="3" opacity=".6" />
              <circle cx="150" cy="150" r="18" fill="#C4AE7E" opacity=".9" />
              <circle cx="150" cy="150" r="10" fill="#F5E6C8" />
              <text x="150" y="228" fill="rgba(196,174,126,.7)" fontSize="8"
                fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1.5">
                1 JÚN – 20 JÚL
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
