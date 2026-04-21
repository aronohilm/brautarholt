import { useLanguage } from '../LanguageContext'

export default function PhotoBanner() {
  const { t } = useLanguage()
  const p = t.photoBanner

  return (
    <div className="photo-banner">
      <img src="nature-golfing-iceland-1024x640.webp" alt="Brautarholt cliff course" />
      <div className="photo-overlay-text wrap">
        <h2 className="reveal">{p.h2a} <em>{p.h2em}</em></h2>
        <p className="reveal d2">{p.p}</p>
      </div>
    </div>
  )
}
