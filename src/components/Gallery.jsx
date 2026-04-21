import { useLanguage } from '../LanguageContext'

const images = [
  { src: '/Screenshot%202026-04-20%20at%2022.22.05.png' },
  { src: '/Screenshot%202026-04-20%20at%2022.22.24.png' },
  { src: '/Screenshot%202026-04-20%20at%2022.23.06.png' },
]

export default function Gallery() {
  const { t } = useLanguage()
  const g = t.gallery

  return (
    <section className="gallery-section">
      <div className="wrap gallery-head">
        <div className="sec-eyebrow reveal">{g.eyebrow}</div>
        <h2 className="sec-title reveal d1">
          {g.h2} <em>{g.h2em}</em>
        </h2>
      </div>

      <div className="gallery-track">
        {images.map((img, i) => (
          <div className="gallery-item" key={i}>
            <img src={img.src} alt={g.captions[i]} loading="lazy" />
            <div className="gi-idx">0{i + 1} / 03</div>
            <div className="gi-cap">{g.captions[i]}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
