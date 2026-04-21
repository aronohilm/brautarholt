import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../LanguageContext'

function CountUp({ target, duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref = useRef()

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 4)
        setVal(Math.floor(ease * target))
        if (p < 1) requestAnimationFrame(step)
        else setVal(target)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [target, duration])

  return <span ref={ref}>{val}</span>
}

export default function Awards() {
  const { t } = useLanguage()
  const a = t.awards

  return (
    <section className="awards-section" id="awards">
      <div className="wrap">
        <div className="awards-intro">
          <div className="sec-eyebrow centered reveal">{a.eyebrow}</div>
          <h2 className="sec-title reveal d1" style={{ marginTop: 16 }}>
            {a.h2a}<br /><em>{a.h2em}</em>
          </h2>
        </div>
      </div>

      <div className="awards-duo">
        <div className="award-card reveal">
          <div className="award-src">{a.card1.src}</div>
          <span className="award-num">#<CountUp target={62} /></span>
          <div className="award-denom">{a.card1.denom} <em>{a.card1.denomem}</em></div>
          <div className="award-foot">{a.card1.foot}</div>
        </div>
        <div className="award-card reveal d1">
          <div className="award-src">{a.card2.src}</div>
          <span className="award-num">#<CountUp target={61} /></span>
          <div className="award-denom">{a.card2.denom} <em>{a.card2.denomem}</em></div>
          <div className="award-foot">{a.card2.foot}</div>
        </div>
      </div>
    </section>
  )
}
