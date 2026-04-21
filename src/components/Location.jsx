import { useLanguage } from '../LanguageContext'

export default function Location() {
  const { t } = useLanguage()
  const l = t.location

  return (
    <section className="location-section">
      <div className="wrap">
        <div className="loc-grid">
          <div>
            <div className="sec-eyebrow reveal">{l.eyebrow}</div>
            <h2 className="loc-headline reveal d1">
              {l.h2}<br /><em>{l.h2em}</em>
            </h2>
            <p className="loc-body reveal d2">{l.body}</p>
            <div className="loc-detail reveal d3">
              <div className="lk">{l.detail1k}</div>
              <div className="lv">{l.detail1v}</div>
            </div>
            <div className="loc-detail reveal d3" style={{ marginTop: 12 }}>
              <div className="lk">{l.detail2k}</div>
              <div className="lv" style={{ fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '.1em' }}>
                N 64°14′ · W 21°49′
              </div>
            </div>
          </div>

          <div className="loc-map reveal d2">
            <div className="map-compass">N</div>
            <svg viewBox="0 0 400 500">
              <rect width="400" height="500" fill="#070f15" />
              <g fill="none" stroke="#1F3A44" strokeWidth=".8">
                {[80, 130, 180, 230, 280, 340].map((y) => (
                  <path key={y} d={`M0,${y} Q100,${y - 10} 200,${y + 8} T400,${y}`} />
                ))}
              </g>
              <path d="M0,370 L50,350 L100,340 L160,325 L200,305 L245,285 L285,270 L320,268 L340,278 L330,310 L300,340 L255,360 L200,375 L150,388 L100,406 L50,428 L0,445 Z" fill="#141e15" stroke="#1f2e1a" strokeWidth="1" />
              <path d="M240,490 L290,478 L360,482 L400,480 L400,500 L240,500 Z" fill="#0e180f" />
              <g transform="translate(248,272)">
                <ellipse cx="35" cy="25" rx="60" ry="35" fill="none" stroke="#4E5E44" strokeWidth=".8" strokeDasharray="2 2" opacity=".7" />
                <g fill="#4E5E44" opacity=".8">
                  <ellipse cx="10" cy="8" rx="16" ry="3.5" transform="rotate(18)" />
                  <ellipse cx="42" cy="3" rx="12" ry="3" transform="rotate(-15 42 3)" />
                  <ellipse cx="68" cy="18" rx="11" ry="3" transform="rotate(38 68 18)" />
                  <ellipse cx="48" cy="42" rx="13" ry="3" transform="rotate(-8 48 42)" />
                  <ellipse cx="18" cy="48" rx="11" ry="3" transform="rotate(28 18 48)" />
                </g>
                <circle cx="35" cy="25" r="5" fill="#C4AE7E" />
                <circle cx="35" cy="25" r="12" fill="none" stroke="#C4AE7E" strokeWidth=".6" opacity=".5" />
                <circle cx="35" cy="25" r="22" fill="none" stroke="#C4AE7E" strokeWidth=".4" opacity=".25" />
              </g>
              <text x="282" y="266" fill="#C4AE7E" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1.5">BRAUTARHOLT</text>
              <text x="295" y="475" fill="#5a7045" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1">REYKJAVÍK</text>
              <text x="55" y="190" fill="#1F3A44" fontSize="11" fontFamily="Cormorant Garamond" fontStyle="italic" opacity=".9">Faxaflói</text>
              <path d="M0,455 L120,425 L185,398 L240,375 L268,330" fill="none" stroke="#C4AE7E" strokeWidth=".6" strokeDasharray="3 3" opacity=".45" />
              <g transform="translate(175,448)">
                <rect x="-28" y="-10" width="56" height="20" rx="10" fill="#0a0e0f" stroke="#C4AE7E" strokeWidth=".5" />
                <text x="0" y="5" fill="#C4AE7E" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1">30 MIN</text>
              </g>
              <text x="20" y="28" fill="rgba(196,174,126,.5)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.5">N 64°14′</text>
            </svg>
            <div className="map-legend"><b>BRAUTARHOLT</b>Kjalarnes · 162 Reykjavík · Iceland</div>
          </div>
        </div>
      </div>
    </section>
  )
}
