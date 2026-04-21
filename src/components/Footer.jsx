import { useLanguage } from '../LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-wm">Brautarholt<em>.</em></div>
            <p className="foot-desc">{f.desc}</p>
          </div>

          <div className="foot-col">
            <h5>{f.visit.title}</h5>
            <ul>
              {f.visit.lines.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </div>

          <div className="foot-col">
            <h5>{f.contact.title}</h5>
            <ul>
              {f.contact.lines.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </div>

          <div className="foot-col">
            <h5>{f.explore.title}</h5>
            <ul>
              {f.explore.links.map(([label, href], i) => (
                <li key={i}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>{f.copy.replace('{year}', new Date().getFullYear())}</span>
          <span>{f.coords}</span>
          <span>{f.est}</span>
        </div>
      </div>
    </footer>
  )
}
