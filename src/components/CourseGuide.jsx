import { useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

const holes = [
  {
    number: 1, par: 5, hcp: 5, metres: 508,
    tip: 'Aim in the middle of the fairway short of the three fairway bunkers. Don\'t be tempted into shortcuts on the second shot — if you\'re short, lay the next shot on the fairway below the slope. Use the slopes to feed your ball next to the pin.',
  },
  {
    number: 2, par: 3, hcp: 13, metres: 158,
    tip: 'Distance control is everything here. The right side of the green ejects balls away — miss left. Wind and low sun can both cause problems.',
  },
  {
    number: 3, par: 4, hcp: 9, metres: 375,
    tip: 'Rocky coastline to the right is out of bounds. Position your tee shot left of the ridge to open up a clear view of the green on your approach.',
  },
  {
    number: 4, par: 4, hcp: 15, metres: 330,
    tip: 'Risk/reward hole — a bold left line rewards you, but water beyond the green punishes over-hitting. Play within yourself in crosswind.',
  },
  {
    number: 5, par: 3, hcp: 1, metres: 190,
    tip: 'The toughest hole on the course. A long par 3 — in a headwind aim left to avoid the beach. Club selection is critical; underestimate the wind at your peril.',
  },
  {
    number: 6, par: 4, hcp: 11, metres: 360,
    tip: 'Water threatens both sides of the fairway. In a headwind, treat this as a par 5 and lay up. Patience is rewarded with a manageable approach.',
  },
  {
    number: 7, par: 4, hcp: 3, metres: 395,
    tip: 'A left-to-right dogleg with water on the right. Commit to a draw off the tee to set up the uphill second shot — avoid going right at all costs.',
  },
  {
    number: 8, par: 3, hcp: 17, metres: 143,
    tip: 'A central ridge divides the green into two distinct sections. Land on the correct shelf or three-putts will follow. Distance is the only key.',
  },
  {
    number: 9, par: 5, hcp: 7, metres: 492,
    tip: 'Choose your line around the central mount — right side gives the better angle into the green and a flatter approach. A birdie chance awaits the patient player.',
  },
  {
    number: 10, par: 3, hcp: 6, metres: 172,
    tip: 'Water on both sides makes this short par 3 more demanding than its length suggests. Aim centre green and take one extra club to stay out of trouble.',
  },
  {
    number: 11, par: 4, hcp: 14, metres: 345,
    tip: 'Aim in the middle of the fairway, short of the bunkers. Water guards the front of the green — flight the ball in high and land it softly.',
  },
  {
    number: 12, par: 4, hcp: 10, metres: 370,
    tip: 'Straight driving is rewarded. The water hazard before the green comes into play on your second shot — take enough club to clear it comfortably.',
  },
  {
    number: 13, par: 5, hcp: 16, metres: 480,
    tip: 'A three-shot hole for most. Position your second shot on the lower left of the fairway to open the ideal angle into the green for your approach.',
  },
  {
    number: 14, par: 3, hcp: 2, metres: 185,
    tip: 'The second hardest par 3. Distance control and reading the wind are everything. Low sun can blind you on the tee — have your line picked before you step up.',
  },
  {
    number: 15, par: 4, hcp: 12, metres: 385,
    tip: 'Rocky coastline to the left is out of bounds. Resist the tempting left line off the tee — the risks far outweigh the reward. Play right-centre and stay safe.',
  },
  {
    number: 16, par: 4, hcp: 4, metres: 415,
    tip: 'A long and demanding par 4. In a headwind, treat it as a par 5. The second shot distance is consistently deceptive — take two extra clubs when in doubt.',
  },
  {
    number: 17, par: 3, hcp: 18, metres: 140,
    tip: 'The easiest hole on the card. Aim slightly left of the flag and carry the bunkers cleanly. A good score here sets up a strong finish on 18.',
  },
  {
    number: 18, par: 5, hcp: 8, metres: 522,
    tip: 'A fitting finale. The right side of the fairway gives the best angle into the green. The fairway narrows significantly on your second shot — stay disciplined.',
  },
]

const totals = {
  par: holes.reduce((s, h) => s + h.par, 0),
  metres: holes.reduce((s, h) => s + h.metres, 0),
}

const PAR_COLORS = {
  3: { bg: 'bg-sky-800', text: 'text-sky-100', light: 'text-sky-700' },
  4: { bg: 'bg-[#0d1f0d]', text: 'text-[#c9a84c]', light: 'text-[#0d1f0d]' },
  5: { bg: 'bg-[#c9a84c]', text: 'text-[#0d1f0d]', light: 'text-[#c9a84c]' },
}

export default function CourseGuide({ onBack }) {
  const [selected, setSelected] = useState(0) // index into holes[]

  const hole = holes[selected]
  const parStyle = PAR_COLORS[hole.par]

  const prev = () => setSelected((i) => (i - 1 + 18) % 18)
  const next = () => setSelected((i) => (i + 1) % 18)

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* ── Page header ── */}
      <div className="relative h-44 md:h-52 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80&auto=format&fit=crop"
          alt="Brautarholt fairway"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0d1f0d]/72" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-7 max-w-7xl mx-auto w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/55 hover:text-white text-[11px] tracking-[0.2em] uppercase font-light mb-3 transition-colors w-fit"
          >
            <ArrowLeft size={12} />
            Back to Home
          </button>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase mb-1 font-light">Course Guide</p>
              <h1
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                className="text-white text-3xl md:text-4xl font-light"
              >
                Hole by Hole
              </h1>
            </div>
            <p className="text-white/40 text-xs font-light hidden md:block">
              Par {totals.par} · {totals.metres.toLocaleString()} metres
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Scorecard ── */}
        <section className="mb-12">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase mb-5 font-light">Scorecard</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#0d1f0d] text-white">
                  <th className="text-left px-4 py-3 text-[10px] tracking-[0.2em] uppercase font-medium">Hole</th>
                  {holes.map((h) => (
                    <th
                      key={h.number}
                      className={`px-0 py-3 text-[11px] font-medium text-center cursor-pointer transition-colors duration-150 ${
                        selected === h.number - 1
                          ? 'bg-[#c9a84c] text-[#0d1f0d]'
                          : 'hover:bg-white/10'
                      }`}
                      onClick={() => setSelected(h.number - 1)}
                    >
                      {h.number}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-[10px] tracking-[0.2em] uppercase font-medium text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-[#e8e4dc]">
                  <td className="px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase text-[#8a7e6e] font-light">Par</td>
                  {holes.map((h) => (
                    <td
                      key={h.number}
                      onClick={() => setSelected(h.number - 1)}
                      className={`py-2.5 text-center font-light text-sm cursor-pointer transition-colors duration-150 ${
                        selected === h.number - 1 ? 'bg-[#c9a84c]/15 font-medium' : 'hover:bg-[#f5f0e8]'
                      } ${h.par === 3 ? 'text-sky-700' : h.par === 5 ? 'text-[#b8941e]' : 'text-[#2a2a2a]'}`}
                    >
                      {h.par}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-center font-semibold text-[#0d1f0d]">{totals.par}</td>
                </tr>
                <tr className="bg-[#f9f6f0] border-b border-[#e8e4dc]">
                  <td className="px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase text-[#8a7e6e] font-light">HCP</td>
                  {holes.map((h) => (
                    <td
                      key={h.number}
                      onClick={() => setSelected(h.number - 1)}
                      className={`py-2.5 text-center text-[#6b6b6b] font-light text-sm cursor-pointer transition-colors ${
                        selected === h.number - 1 ? 'bg-[#c9a84c]/15' : 'hover:bg-[#f5f0e8]'
                      }`}
                    >
                      {h.hcp}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-center text-[#8a7e6e] font-light">—</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase text-[#8a7e6e] font-light">Metres</td>
                  {holes.map((h) => (
                    <td
                      key={h.number}
                      onClick={() => setSelected(h.number - 1)}
                      className={`py-2.5 text-center text-[#6b6b6b] font-light text-sm cursor-pointer transition-colors ${
                        selected === h.number - 1 ? 'bg-[#c9a84c]/15' : 'hover:bg-[#f5f0e8]'
                      }`}
                    >
                      {h.metres}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-center font-semibold text-[#0d1f0d]">{totals.metres.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#8a7e6e] text-xs font-light mt-2">
            Click any hole number or row to jump to that hole.
          </p>
        </section>

        {/* ── Hole selector pill strip ── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {holes.map((h, i) => (
            <button
              key={h.number}
              onClick={() => setSelected(i)}
              className={`shrink-0 w-10 h-10 text-sm font-light transition-all duration-200 border ${
                selected === i
                  ? 'bg-[#0d1f0d] text-white border-[#0d1f0d]'
                  : 'bg-white text-[#4a4a4a] border-[#d4cfc5] hover:border-[#0d1f0d] hover:text-[#0d1f0d]'
              }`}
            >
              {h.number}
            </button>
          ))}
        </div>

        {/* ── Hole detail panel ── */}
        <div className="bg-white border border-[#e8e4dc]">

          {/* Hole header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4dc]">
            <div className="flex items-center gap-5">
              <span
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                className="text-6xl font-light text-[#0d1f0d] leading-none"
              >
                {hole.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className={`text-[10px] tracking-[0.2em] uppercase font-medium px-2.5 py-0.5 w-fit ${parStyle.bg} ${parStyle.text}`}>
                  Par {hole.par}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8a7e6e] font-light">
                  Stroke Index {hole.hcp}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Distance badge */}
              <div className="text-right mr-4">
                <div
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  className="text-3xl font-light text-[#c9a84c] leading-none"
                >
                  {hole.metres}m
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#8a7e6e] font-light mt-0.5">
                  Championship tee
                </div>
              </div>

              {/* Prev / Next */}
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border border-[#d4cfc5] text-[#4a4a4a] hover:border-[#0d1f0d] hover:text-[#0d1f0d] transition-colors duration-200"
                aria-label="Previous hole"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border border-[#d4cfc5] text-[#4a4a4a] hover:border-[#0d1f0d] hover:text-[#0d1f0d] transition-colors duration-200"
                aria-label="Next hole"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Body: image left, info right */}
          <div className="grid md:grid-cols-2 gap-0">

            {/* Hole diagram image */}
            <div className="relative bg-[#f9f6f0] border-r border-[#e8e4dc] flex items-center justify-center min-h-72 md:min-h-96">
              <img
                key={hole.number}
                src={`/hole-images/hole-${hole.number}.png`}
                alt={`Hole ${hole.number} diagram`}
                className="w-full h-full object-contain max-h-[440px] p-4"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
              />
              {/* Placeholder shown when image is missing */}
              <div
                className="absolute inset-0 flex-col items-center justify-center text-center p-8 hidden"
                style={{ display: 'none' }}
              >
                <div
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  className="text-[#c9a84c] text-8xl font-light leading-none mb-4 opacity-20"
                >
                  {hole.number}
                </div>
                <p className="text-[#8a7e6e] text-xs font-light leading-relaxed max-w-xs">
                  Place your hole diagram here:
                </p>
                <code className="mt-2 text-[11px] text-[#c9a84c] bg-[#0d1f0d]/8 px-3 py-1.5 font-mono">
                  public/hole-images/hole-{hole.number}.png
                </code>
              </div>
            </div>

            {/* Info panel */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase font-light mb-4">
                  Playing Strategy
                </p>
                <p className="text-[#2a2a2a] text-base font-light leading-relaxed mb-8">
                  {hole.tip}
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { label: 'Par', value: hole.par },
                    { label: 'Metres', value: `${hole.metres}m` },
                    { label: 'Stroke Index', value: hole.hcp },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#f5f0e8] px-4 py-3 text-center">
                      <div
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                        className="text-2xl font-light text-[#0d1f0d]"
                      >
                        {s.value}
                      </div>
                      <div className="text-[9px] tracking-[0.2em] uppercase text-[#8a7e6e] font-light mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hole progress indicator */}
              <div>
                <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#8a7e6e] font-light mb-2">
                  <span>Hole {hole.number} of 18</span>
                  <span>{selected < 9 ? 'Front 9' : 'Back 9'}</span>
                </div>
                <div className="h-1 bg-[#e8e4dc] w-full">
                  <div
                    className="h-1 bg-[#c9a84c] transition-all duration-300"
                    style={{ width: `${((selected + 1) / 18) * 100}%` }}
                  />
                </div>

                {/* Prev / next full labels */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={prev}
                    className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#0d1f0d] transition-colors font-light"
                  >
                    <ChevronLeft size={14} />
                    Hole {holes[(selected - 1 + 18) % 18].number}
                  </button>
                  <button
                    onClick={next}
                    className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#0d1f0d] transition-colors font-light"
                  >
                    Hole {holes[(selected + 1) % 18].number}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#0d1f0d] mt-12 p-10 text-center">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase mb-3 font-light">Ready to Play?</p>
          <h3
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            className="text-white text-3xl font-light mb-6"
          >
            Book Your Tee Time
          </h3>
          <button
            onClick={onBack}
            className="px-8 py-3.5 bg-[#c9a84c] hover:bg-[#e8c97e] text-[#0d1f0d] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200"
          >
            Return to Homepage
          </button>
        </div>

      </div>
    </div>
  )
}
