import { useLanguage } from '../LanguageContext'

export default function Marquee() {
  const { t } = useLanguage()
  const items = t.marquee
  const doubled = [...items, ...items]

  return (
    <div className="marquee">
      <div className="mq-track">
        {doubled.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  )
}
