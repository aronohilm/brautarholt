import { useEffect, useState } from 'react'
import { useLanguage } from '../LanguageContext'

const COUNTRIES = [
  'Ísland',
  'Danmörk', 'Finnland', 'Noregur', 'Svíþjóð',
  'Þýskaland', 'Austurríki', 'Sviss',
  'Bretland', 'Írland',
  'Frakkland', 'Belgía', 'Holland', 'Lúxemborg',
  'Spánn', 'Portúgal', 'Ítalía', 'Grikkland',
  'Pólland', 'Tékkland', 'Slóvakía', 'Ungverjaland',
  'Rúmenía', 'Búlgaría', 'Króatía', 'Slóvenía',
  'Eistland', 'Lettland', 'Litáen',
  'Bandaríkin', 'Kanada', 'Mexíkó',
  'Brasilía', 'Argentína', 'Kólumbía',
  'Ástralía', 'Nýja-Sjáland',
  'Japan', 'Kína', 'Suður-Kórea', 'Indland',
  'Suður-Afríka', 'Marokkó', 'Egyptaland',
]

function GatewayPreview({ onBack }) {
  return (
    <div className="gateway-page">
      <button className="gateway-back-btn" onClick={onBack}>
        <span className="gateway-back-arrow">←</span> Til baka
      </button>
      <div className="gateway-img-wrap">
        <img src="/payment_gateway.png" alt="Straumur greiðslugátt" />
      </div>
    </div>
  )
}

export default function PaymentModal({ open, tier, onClose }) {
  const { t } = useLanguage()
  const p = t.payment
  const [form, setForm] = useState({
    fornafn: '', eftirnafn: '', land: '', heimilisfang: '',
    baejarfelag: '', postnumer: '', kennitala: '',
    fyrirtaeki: '', simanumer: '', netfang: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showGateway, setShowGateway] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setShowGateway(false); onClose() } }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setShowGateway(false)
      setError(null)
      setLoading(false)
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Demo: show gateway preview
    // In production: replace with real API call below
    setTimeout(() => {
      setLoading(false)
      setShowGateway(true)
    }, 700)

    /*
    // Production payment flow — uncomment when Straumur keys are configured:
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, tier }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
    */
  }

  if (!open) return null

  if (showGateway) {
    return <GatewayPreview onBack={() => setShowGateway(false)} />
  }

  return (
    <div className="pay-page">
      {/* ── Left panel ── */}
      <div className="pay-page-left">
        <button className="pay-page-close" onClick={onClose} aria-label="Close">
          <span>←</span> Til baka
        </button>

        <div className="pay-page-brand">
          Brautarholt <em>·</em> Kjalarnes
        </div>

        {tier && (
          <div className="pay-page-tier">
            <div className="ppt-tag">{tier.tag}</div>
            <div className="ppt-name">{tier.name}<em>{tier.it}</em></div>
            <div className="ppt-price">
              {tier.price} <span>ISK · Á ári</span>
            </div>
            <div className="ppt-inc">{tier.inc}</div>
          </div>
        )}

        <div className="pay-page-trust">
          <div className="ppt-trust-row">
            <span className="ppt-trust-dot" />
            GSÍ aðild innifalin
          </div>
          <div className="ppt-trust-row">
            <span className="ppt-trust-dot" />
            Fullur aðgangur 1. maí – 30. sept.
          </div>
          <div className="ppt-trust-row">
            <span className="ppt-trust-dot" />
            Öruggar greiðslur í gegnum Straumur
          </div>
        </div>

        <div className="pay-page-coord">N 64°14′ · W 21°49′</div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="pay-page-right">
        <div className="pay-page-form-wrap">
          <button className="pay-page-mobile-back" onClick={onClose}>
            <span>←</span> Til baka
          </button>
          <h2 className="pay-page-title">{p.title} <em>{p.titleEm}</em></h2>
          <div className="pay-page-sub">{p.tag}</div>

          <form onSubmit={handleSubmit}>
            <div className="modal-row">
              <div className="modal-field">
                <label>{p.fornafn}</label>
                <input type="text" value={form.fornafn} onChange={set('fornafn')} required />
              </div>
              <div className="modal-field">
                <label>{p.eftirnafn}</label>
                <input type="text" value={form.eftirnafn} onChange={set('eftirnafn')} required />
              </div>
            </div>

            <div className="modal-field">
              <label>{p.land}</label>
              <select value={form.land} onChange={set('land')} required>
                <option value="" disabled>{p.landPlaceholder}</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="modal-field">
              <label>{p.heimilisfang}</label>
              <input type="text" value={form.heimilisfang} onChange={set('heimilisfang')} required />
            </div>

            <div className="modal-row">
              <div className="modal-field">
                <label>{p.baejarfelag}</label>
                <input type="text" value={form.baejarfelag} onChange={set('baejarfelag')} required />
              </div>
              <div className="modal-field">
                <label>{p.postnumer}</label>
                <input type="text" value={form.postnumer} onChange={set('postnumer')} required />
              </div>
            </div>

            <div className="modal-field">
              <label>{p.kennitala}</label>
              <input
                type="text"
                value={form.kennitala}
                onChange={set('kennitala')}
                placeholder="000000-0000"
                required
              />
            </div>

            <div className="modal-field">
              <label>{p.fyrirtaeki} <span className="pay-optional">{p.optional}</span></label>
              <input type="text" value={form.fyrirtaeki} onChange={set('fyrirtaeki')} />
            </div>

            <div className="modal-row">
              <div className="modal-field">
                <label>{p.simanumer}</label>
                <input type="tel" value={form.simanumer} onChange={set('simanumer')} required />
              </div>
              <div className="modal-field">
                <label>{p.netfang}</label>
                <input type="email" value={form.netfang} onChange={set('netfang')} required />
              </div>
            </div>

            {error && <div className="modal-error">{error}</div>}

            <button type="submit" className="pay-page-submit" disabled={loading}>
              {loading ? '···' : p.submit}
            </button>
            <div className="modal-note">{p.note}</div>
          </form>
        </div>
      </div>
    </div>
  )
}
