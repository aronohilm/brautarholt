import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'

export default function Navbar({ onNavigate, currentPage, onBook }) {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navItems = [
    { label: t.nav.course, href: '#about' },
    { label: t.nav.rankings, href: '#awards' },
    { label: t.nav.midnight, href: '#midnight' },
    { label: t.nav.membership, href: '#membership' },
    { label: t.nav.fees, href: '#fees' },
    { label: t.nav.courseGuide, page: 'course-guide' },
  ]

  const handleNav = (item) => {
    setMenuOpen(false)
    if (item.page) {
      onNavigate?.(item.page)
    } else if (item.href) {
      if (currentPage !== 'home') {
        onNavigate?.('home')
        setTimeout(() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }), 100)
      } else {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <button onClick={() => { setMenuOpen(false); onNavigate?.('home') }} className="wordmark">
          Brautarholt<em> Golf</em>
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className={`nav-link-item ${item.page && currentPage === item.page ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}

          <div className="lang-toggle">
            <button onClick={() => setLang('is')} className={`lang-btn ${lang === 'is' ? 'active' : ''}`} aria-label="Íslenska">
              🇮🇸 IS
            </button>
            <button onClick={() => setLang('en')} className={`lang-btn ${lang === 'en' ? 'active' : ''}`} aria-label="English">
              🇬🇧 EN
            </button>
          </div>

          <button className="btn-book-nav" onClick={onBook}>
            {t.nav.bookNow} <span className="arr" />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="lang-toggle" style={{ display: 'none' }} id="mobile-lang">
            <button onClick={() => setLang('is')} className={`lang-btn ${lang === 'is' ? 'active' : ''}`}>🇮🇸</button>
            <button onClick={() => setLang('en')} className={`lang-btn ${lang === 'en' ? 'active' : ''}`}>🇬🇧</button>
          </div>
          <button
            className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ cursor: 'none' }}
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { #mobile-lang { display: flex !important; } }
      `}</style>

      {menuOpen && (
        <div className="mobile-nav-panel">
          {navItems.map((item) => (
            <button key={item.label} className="mobile-nav-link" onClick={() => handleNav(item)}>
              {item.label}
            </button>
          ))}
          <button className="mobile-nav-link" onClick={() => { setMenuOpen(false); onBook() }}>
            {t.nav.bookNow}
          </button>
          <div style={{ display: 'flex', gap: 0, marginTop: 24 }}>
            <div className="lang-toggle">
              <button onClick={() => setLang('is')} className={`lang-btn ${lang === 'is' ? 'active' : ''}`}>🇮🇸 IS</button>
              <button onClick={() => setLang('en')} className={`lang-btn ${lang === 'en' ? 'active' : ''}`}>🇬🇧 EN</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
