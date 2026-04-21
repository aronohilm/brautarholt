import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  const info = [
    { icon: MapPin, label: c.address, value: 'Brautarholtsvegur, 112 Reykjavík, Iceland' },
    { icon: Phone, label: c.phone, value: '+354 567 8000' },
    { icon: Mail, label: c.email, value: 'golf@gbr.is' },
    { icon: Clock, label: c.hours, value: c.hoursValue },
  ]

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase mb-4 font-light">
            {c.eyebrow}
          </p>
          <h2
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            className="text-[#0d1f0d] text-4xl md:text-5xl font-light leading-tight"
          >
            {c.h2}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left: info + map */}
          <div>
            <div className="space-y-6 mb-10">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-[#c9a84c]/40">
                    <Icon size={16} className="text-[#c9a84c]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a7e6e] font-light mb-0.5">
                      {label}
                    </p>
                    <p className="text-[#2a2a2a] text-sm font-light">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded map */}
            <div className="w-full h-64 md:h-72 overflow-hidden">
              <iframe
                title="Brautarholt Golf Club map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1738.9!2d-22.0!3d64.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d62278f3e2e289%3A0x5e4d05d8b8a8b8b8!2sBrautarholt%20Golf%20Club!5e0!3m2!1sen!2sis!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full gap-4 py-12">
                <div className="w-12 h-12 flex items-center justify-center bg-[#0d1f0d]">
                  <Mail size={20} className="text-[#c9a84c]" />
                </div>
                <h3
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  className="text-[#0d1f0d] text-3xl font-light"
                >
                  {c.successTitle}
                </h3>
                <p className="text-[#6b6b6b] text-sm font-light leading-relaxed">
                  {c.successBody}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-[#c9a84c] text-sm font-light underline underline-offset-4 cursor-pointer"
                >
                  {c.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  className="text-[#0d1f0d] text-2xl font-light mb-6"
                >
                  {c.formTitle}
                </h3>

                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#8a7e6e] font-light block mb-2">
                    {c.nameLabel}
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={c.namePlaceholder}
                    className="w-full border border-[#d4cfc5] bg-white px-4 py-3 text-sm text-[#2a2a2a] font-light placeholder:text-[#b0a898] focus:outline-none focus:border-[#0d1f0d] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#8a7e6e] font-light block mb-2">
                    {c.emailLabel}
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={c.emailPlaceholder}
                    className="w-full border border-[#d4cfc5] bg-white px-4 py-3 text-sm text-[#2a2a2a] font-light placeholder:text-[#b0a898] focus:outline-none focus:border-[#0d1f0d] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#8a7e6e] font-light block mb-2">
                    {c.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={c.messagePlaceholder}
                    className="w-full border border-[#d4cfc5] bg-white px-4 py-3 text-sm text-[#2a2a2a] font-light placeholder:text-[#b0a898] focus:outline-none focus:border-[#0d1f0d] transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0d1f0d] hover:bg-[#1a3a1a] text-white text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200 cursor-pointer"
                >
                  {c.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
