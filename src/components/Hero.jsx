import { useEffect, useRef } from 'react'
import { useLanguage } from '../LanguageContext'

export default function Hero({ onBook }) {
  const { t } = useLanguage()
  const h = t.hero
  const imgRef = useRef()

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const onScroll = () => {
      img.style.transform = `translateY(${-window.scrollY * 0.22}px) scale(1.1)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero">
      <div className="hero-img" ref={imgRef}>
        <img
          src="overshot.webp"
          alt=""
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <div className="hero-content wrap">
        <span className="hero-tag"><span>{h.tag}</span></span>

        <h1 className="hero-h1">
          {h.words.map((word, i) => (
            <span key={i} className="word">
              <span className="inner" style={word.endsWith('.') || word.includes('holur') || word.includes('holes') ? { fontStyle: 'italic', color: 'var(--sand)' } : {}}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub">{h.sub}</p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onBook}>
            {h.cta1} <span className="arr" />
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {h.cta2} <span className="arr" />
          </button>
        </div>
      </div>

      <div className="hero-stats">
        {h.stats.map((s) => (
          <div className="hero-stat" key={s.n}>
            <div className="n">{s.n}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.3em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          {h.scroll}
        </span>
      </div>
    </section>
  )
}
