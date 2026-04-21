import { Calendar, Clock, Users, ChevronRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../LanguageContext'

const timeSlots = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '14:00', '14:30', '15:00',
]

const today = new Date().toISOString().split('T')[0]

export default function BookingCTA() {
  const { t } = useLanguage()
  const b = t.booking

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [players, setPlayers] = useState('2')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!date || !time) return
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const isValid = date && time

  return (
    <section
      id="booking"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="booking-heading"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="public/overshot.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0d1f0d]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left: headline */}
          <div>
            <p className="text-[#e8c97e] text-[11px] tracking-[0.35em] uppercase mb-5 font-light">
              {b.eyebrow}
            </p>
            <h2
              id="booking-heading"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              className="text-white text-4xl md:text-5xl font-light leading-tight mb-6"
            >
              {b.h2a}<br />
              <em className="italic text-[#c9a84c]">{b.h2em}</em>
            </h2>
            <div className="w-14 h-px bg-[#c9a84c]/50 mb-6" aria-hidden="true" />
            <p className="text-white/80 text-base font-light leading-relaxed mb-8">
              {b.body}
            </p>
            <ul className="space-y-3 text-sm text-white/75 font-light" aria-label="Key information">
              {b.bullets.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: booking form */}
          <div
            className="bg-white/5 border border-white/10 backdrop-blur-sm p-8"
            role="group"
            aria-labelledby="form-heading"
          >
            <h3
              id="form-heading"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              className="text-white text-2xl font-light mb-6"
            >
              {b.formTitle}
            </h3>

            <div className="space-y-5">

              {/* Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="flex items-center gap-2 text-white/75 text-xs tracking-[0.2em] uppercase mb-2 font-light"
                >
                  <Calendar size={13} className="text-[#c9a84c]" aria-hidden="true" />
                  {b.dateLabel} <span className="text-[#c9a84c]" aria-hidden="true">*</span>
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  aria-required="true"
                  className="w-full bg-white/8 border border-white/20 text-white px-4 py-3 text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-colors duration-200"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="booking-time"
                  className="flex items-center gap-2 text-white/75 text-xs tracking-[0.2em] uppercase mb-2 font-light"
                >
                  <Clock size={13} className="text-[#c9a84c]" aria-hidden="true" />
                  {b.timeLabel} <span className="text-[#c9a84c]" aria-hidden="true">*</span>
                </label>
                <select
                  id="booking-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  aria-required="true"
                  className="w-full bg-[#0d1f0d] border border-white/20 text-white px-4 py-3 text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="">{b.timeDefault}</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* Players */}
              <fieldset>
                <legend className="flex items-center gap-2 text-white/75 text-xs tracking-[0.2em] uppercase mb-2 font-light w-full">
                  <Users size={13} className="text-[#c9a84c]" aria-hidden="true" />
                  {b.playersLabel}
                </legend>
                <div className="grid grid-cols-4 gap-2" role="group">
                  {['1', '2', '3', '4'].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPlayers(n)}
                      aria-pressed={players === n}
                      className={`py-3 min-h-[48px] text-sm font-light border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:ring-offset-1 focus:ring-offset-transparent cursor-pointer ${
                        players === n
                          ? 'bg-[#c9a84c] border-[#c9a84c] text-[#0d1f0d] font-medium'
                          : 'bg-transparent border-white/20 text-white/80 hover:border-[#c9a84c]/70 hover:text-white'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* CTA */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isValid || loading}
                aria-disabled={!isValid || loading}
                aria-busy={loading}
                className="w-full py-4 min-h-[52px] bg-[#c9a84c] hover:bg-[#e8c97e] disabled:opacity-50 disabled:cursor-not-allowed text-[#0d1f0d] text-sm font-medium tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-center gap-2 mt-2 hover:shadow-lg hover:shadow-[#c9a84c]/25 focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    {b.ctaLoading}
                  </>
                ) : (
                  <>
                    {b.cta}
                    <ChevronRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-white/60 text-xs text-center font-light">
                {b.trust}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
