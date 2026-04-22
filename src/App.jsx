import { useState, useEffect, useRef } from 'react'
import { LanguageProvider } from './LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Architects from './components/Architects'
import PhotoBanner from './components/PhotoBanner'
import Awards from './components/Awards'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Hours from './components/Hours'
import Midnight from './components/Midnight'
import Membership from './components/Membership'
import Fees from './components/Fees'
import SignatureHole from './components/SignatureHole'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import PaymentModal from './components/PaymentModal'

function Cursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef()

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
      }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isBook = el?.closest('button, a, [data-cursor="book"]')
      if (ringRef.current) {
        ringRef.current.classList.toggle('expanded', !!isBook)
      }
    }
    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`
      }
      raf.current = requestAnimationFrame(lerp)
    }
    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(lerp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div className="cur-dot" ref={dotRef} />
      <div className="cur-ring" ref={ringRef} />
    </>
  )
}

function ProgressBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setW(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="progress-bar" style={{ width: `${w}%` }} />
}

function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}

function PaymentReturn() {
  const params = new URLSearchParams(window.location.search)
  const status = params.get('payment')
  const [visible, setVisible] = useState(!!status)

  useEffect(() => {
    if (status) {
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [status])

  if (!visible) return null

  return (
    <div className="modal-overlay open" onClick={() => setVisible(false)}>
      <div className="modal-backdrop" />
      <div className="modal-box" role="dialog" aria-modal="true" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <button className="modal-close" onClick={() => setVisible(false)} aria-label="Close" />
        {status === 'success' ? (
          <>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
            <h2 className="modal-title">Greiðsla <em>staðfest.</em></h2>
            <p style={{ marginTop: '1rem', opacity: 0.6 }}>Velkomin í Brautarholt. Staðfesting verður send á netfangið þitt.</p>
          </>
        ) : (
          <>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✕</div>
            <h2 className="modal-title">Greiðslu <em>aflýst.</em></h2>
            <p style={{ marginTop: '1rem', opacity: 0.6 }}>Engin greiðsla var tekin. Þú getur reynt aftur hvenær sem er.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [paymentTier, setPaymentTier] = useState(null)

  return (
    <LanguageProvider>
      <Cursor />
      <ProgressBar />
      <RevealObserver />
      <Navbar onBook={() => setBookingOpen(true)} />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <Marquee />
        <About />
        {/*<Architects />*/}
        <PhotoBanner />
        <Awards />
        <Gallery />
        <Location />
        <Hours />
        <Midnight />
        <Membership onJoin={(tier) => setPaymentTier(tier)} />
        <Fees onBook={() => setBookingOpen(true)} />
        <SignatureHole />
        <FinalCTA onBook={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <PaymentReturn />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <PaymentModal
        open={!!paymentTier}
        tier={paymentTier}
        onClose={() => setPaymentTier(null)}
      />
    </LanguageProvider>
  )
}
