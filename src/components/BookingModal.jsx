import { useEffect } from 'react'
import { useLanguage } from '../LanguageContext'

export default function BookingModal({ open, onClose }) {
  const { t } = useLanguage()
  const b = t.booking

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose() }}>
      <div className="modal-backdrop" />
      <div className="modal-box" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close" />
        <h2 className="modal-title">{b.title} <em>{b.titleEm}</em></h2>
        <div className="modal-sub">{b.tag}</div>

        <form onSubmit={(e) => { e.preventDefault(); onClose() }}>
          <div className="modal-row">
            <div className="modal-field">
              <label>{b.dateLabel}</label>
              <input type="date" required />
            </div>
            <div className="modal-field">
              <label>{b.playersLabel}</label>
              <select>
                {b.playerOptions.map((o, i) => <option key={i}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>{b.teeLabel}</label>
              <input type="time" defaultValue="09:00" required />
            </div>
            <div className="modal-field">
              <label>{b.holesLabel}</label>
              <select>
                {b.holeOptions.map((o, i) => <option key={i}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="modal-field">
            <label>{b.nameLabel}</label>
            <input type="text" required />
          </div>
          <div className="modal-field">
            <label>{b.contactLabel}</label>
            <input type="text" placeholder={b.contactPlaceholder} required />
          </div>
          <button type="submit" className="modal-submit">{b.submit}</button>
          <div className="modal-note">{b.note}</div>
        </form>
      </div>
    </div>
  )
}
