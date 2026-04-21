import { useState } from 'react'
import { useLanguage } from '../LanguageContext'

// Tees: [blue(championship), white(medal), yellow(forward), red(ladies)]
const holes = [
  { number: 1,  par: 4, hcp: 5,  tees: [385, 360, 330, 295],
    tip_is: 'Míðaðu á miðju fairway, stutt af þremur fairway-bunkerum. Vertu ekki freistuð af skammhlaupi á öðrum skotinu — ef þú ert stuttur, leggðu næsta skot niður undir brekku. Hlaupið spilar til vinstri og nýtir náttúrulegar útlínur til að fæða boltann að pinnanum.',
    tip_en: 'Aim for the centre of the fairway, short of the three fairway bunkers. Don\'t be tempted into shortcuts on the second shot — if you are short, lay the next shot below the slope. The approach plays left, using natural contours to feed the ball toward the pin.' },
  { number: 2,  par: 3, hcp: 13, tees: [158, 148, 136, 118],
    tip_is: 'Nákvæmni í fjarlægð er allt hér. Hægri hlið granarsvæðisins kastar boltum á braut — mættu til vinstri. Vindur og lágur sól geta báðar valdið vandræðum.',
    tip_en: 'Distance control is everything here. The right side of the green ejects balls away — miss left. Wind and low sun can both cause problems.' },
  { number: 3,  par: 4, hcp: 9,  tees: [375, 350, 322, 284],
    tip_is: 'Bergið á hægri hlið er utan marka. Settu skot af tee til vinstri af hryggjum til að opna upp skýra sýn á granarsvæðið á aðkomunum.',
    tip_en: 'Rocky coastline to the right is out of bounds. Position your tee shot left of the ridge to open up a clear view of the green on your approach.' },
  { number: 4,  par: 4, hcp: 15, tees: [330, 308, 283, 252],
    tip_is: 'Áhættu/verðlaun hola — djarf skot til vinstri gefur þér verðlaun, en vatn á bak við granarsvæðið refsir ofspegli. Spilaðu innan þinnar getu í þvervindi.',
    tip_en: 'Risk/reward hole — a bold left line rewards you, but water beyond the green punishes over-hitting. Play within yourself in crosswind.' },
  { number: 5,  par: 3, hcp: 1,  tees: [190, 178, 163, 144],
    tip_is: 'Erfiðasta holan á völlinum. Löng par 3 — í mótvindum mættu til vinstri til að forðast strandirnar. Kylfuval er lykilatriði; vanræktu vindinn á eigin ábyrgð.',
    tip_en: 'The toughest hole on the course. A long par 3 — in a headwind aim left to avoid the beach. Club selection is critical; underestimate the wind at your peril.' },
  { number: 6,  par: 4, hcp: 11, tees: [360, 337, 309, 275],
    tip_is: 'Vatn ógnað á báðar hliðar fairway. Í mótvindum, farðu með þetta sem par 5 og leggðu upp. Þolinmæði gefur þér stjórnanlega nálgun.',
    tip_en: 'Water threatens both sides of the fairway. In a headwind, treat this as a par 5 and lay up. Patience is rewarded with a manageable approach.' },
  { number: 7,  par: 4, hcp: 3,  tees: [395, 369, 339, 303],
    tip_is: 'Vinstri-til-hægri doglegur með vatn á hægri hlið. Skuldbindtu þig til draw af tee til að setja upp uppstigandi annað skot — forðastu hægri hlið af öllum kröftum.',
    tip_en: 'A left-to-right dogleg with water on the right. Commit to a draw off the tee to set up the uphill second shot — avoid going right at all costs.' },
  { number: 8,  par: 3, hcp: 17, tees: [143, 134, 123, 108],
    tip_is: 'Miðlæg hryggur skiptir granarsvæðinu í tvo aðskilda hluta. Lendaðu á réttu hillunni eða þriggja-puttarar munu fylgja. Fjarlægð er eina lykillinn.',
    tip_en: 'A central ridge divides the green into two distinct sections. Land on the correct shelf or three-putts will follow. Distance is the only key.' },
  { number: 9,  par: 5, hcp: 7,  tees: [492, 460, 422, 378],
    tip_is: 'Veldu línu þína um miðlæga hæð — hægri hlið gefur betri horn inn í granarsvæðið og flatar nálgun. Birdie tækifæri bíður þolinmæða leikmanna.',
    tip_en: 'Choose your line around the central mount — right side gives the better angle into the green and a flatter approach. A birdie chance awaits the patient player.' },
  { number: 10, par: 3, hcp: 6,  tees: [172, 161, 148, 130],
    tip_is: 'Vatn á báðum hliðum gerir þessa stuttu par 3 erfiðari en lengd hennar gefur til kynna. Mættu á miðju granarsvæðis og taktu eina aukakylfu til að vera öruggur.',
    tip_en: 'Water on both sides makes this short par 3 more demanding than its length suggests. Aim centre green and take one extra club to stay out of trouble.' },
  { number: 11, par: 4, hcp: 14, tees: [345, 322, 296, 264],
    tip_is: 'Míðaðu á miðju fairway, stutt af bunkerum. Vatn gæðir framlæga hlið granarsvæðisins — flýgðu boltann inn hátt og lendaðu mjúkt.',
    tip_en: 'Aim in the middle of the fairway, short of the bunkers. Water guards the front of the green — flight the ball in high and land it softly.' },
  { number: 12, par: 4, hcp: 10, tees: [370, 346, 318, 284],
    tip_is: 'Bein akstursleið er verðlaunuð. Vatnshindrunin fyrir granarsvæðið kemur í leik á öðru skotinu — taktu nóg af kylfu til að komast yfir hana örugglega.',
    tip_en: 'Straight driving is rewarded. The water hazard before the green comes into play on your second shot — take enough club to clear it comfortably.' },
  { number: 13, par: 5, hcp: 16, tees: [480, 449, 412, 368],
    tip_is: 'Þriggja skota hola fyrir flesta. Settu annað skotið á neðri vinstri hlið fairway til að opna upp bestu horn inn í granarsvæðið.',
    tip_en: 'A three-shot hole for most. Position your second shot on the lower left of the fairway to open the ideal angle into the green for your approach.' },
  { number: 14, par: 3, hcp: 2,  tees: [185, 173, 159, 140],
    tip_is: 'Önnur erfiðasta par 3. Fjarlægðarstjórnun og lestur vindsins er allt. Lágur sól getur blindað þig á tee — hafðu línu þína valda áður en þú stígur upp.',
    tip_en: 'The second hardest par 3. Distance control and reading the wind are everything. Low sun can blind you on the tee — have your line picked before you step up.' },
  { number: 15, par: 4, hcp: 12, tees: [385, 360, 331, 295],
    tip_is: 'Bergið á vinstri hlið er utan marka. Mótstaðist freistinguna á vinstri línu af tee — áhættan er langt umfram verðlaunin. Spilaðu hægri-miðja og vertu öruggur.',
    tip_en: 'Rocky coastline to the left is out of bounds. Resist the tempting left line off the tee — the risks far outweigh the reward. Play right-centre and stay safe.' },
  { number: 16, par: 4, hcp: 4,  tees: [415, 388, 356, 319],
    tip_is: 'Löng og krefjandi par 4. Í mótvindum, farðu með þetta sem par 5. Fjarlægðin á öðru skotinu er stöðugt blekkjandi — taktu tvær aukakylfu þegar í vafa.',
    tip_en: 'A long and demanding par 4. In a headwind, treat it as a par 5. The second shot distance is consistently deceptive — take two extra clubs when in doubt.' },
  { number: 17, par: 3, hcp: 18, tees: [140, 131, 120, 106],
    tip_is: 'Auðveldasta holan. Mættu lítið til vinstri af flagga og berðu bunkeranna hreinlega. Góð einkunn hér setur upp sterka endanloka á 18.',
    tip_en: 'The easiest hole on the card. Aim slightly left of the flag and carry the bunkers cleanly. A good score here sets up a strong finish on 18.' },
  { number: 18, par: 5, hcp: 8,  tees: [522, 488, 448, 401],
    tip_is: 'Hentugur lokaþáttur. Hægri hlið fairway gefur bestu hornið inn í granarsvæðið. Fairwayið þrengist verulega á öðru skotinu — vertu agaður.',
    tip_en: 'A fitting finale. The right side of the fairway gives the best angle into the green. The fairway narrows significantly on your second shot — stay disciplined.' },
]

const TEE_COLORS = ['#4A90D9', '#E8E8E8', '#E8C84A', '#D94A4A']

const parColor = (par) => par === 3 ? 'p3' : par === 5 ? 'p5' : ''

export default function SignatureHole() {
  const [active, setActive] = useState(0)
  const { lang } = useLanguage()
  const hole = holes[active]

  const prev = () => setActive((i) => (i - 1 + 18) % 18)
  const next = () => setActive((i) => (i + 1) % 18)

  const is = lang === 'is'
  const eyebrow  = is ? '10 · Völlurinn hola fyrir holu' : '10 · The Course Hole by Hole'
  const heading  = is ? <>Átján holur við <em>brún jarðar.</em></> : <>Eighteen holes on <em>the edge.</em></>
  const tipLabel = is ? 'Leikráð' : 'Playing Strategy'
  const holeWord = is ? 'Hola' : 'Hole'
  const teeNames = is
    ? ['Blár · Meistarar', 'Hvítur · Medal', 'Gulur · Framur', 'Rauður']
    : ['Blue · Championship', 'White · Medal', 'Yellow · Forward', 'Red']

  return (
    <section className="hole-section" id="course">
      <div className="wrap hole-section-head">
        <div className="sec-eyebrow reveal">{eyebrow}</div>
        <h2 className="sec-title reveal d1">{heading}</h2>
      </div>

      {/* ── Tab strip ── */}
      <div className="hole-tabs">
        {holes.map((h, i) => (
          <button
            key={h.number}
            className={`hole-tab${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`${holeWord} ${h.number}`}
          >
            <span className="ht-n">{String(h.number).padStart(2, '0')}</span>
            <span className={`ht-par ${parColor(h.par)}`}>Par {h.par}</span>
          </button>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="wrap">
        <div className="hole-main">

          {/* Image panel */}
          <div className="hole-img-panel">
            <img
              key={hole.number}
              src={`/hole-images/hole-${hole.number}.png`}
              alt={`${holeWord} ${hole.number} diagram`}
            />
            <div className="hole-big-num">{String(hole.number).padStart(2, '0')}</div>
          </div>

          {/* Info panel */}
          <div>
            <div className="hole-eyebrow">{holeWord} {String(hole.number).padStart(2, '0')} · Kjalarnes</div>
            <h3 className="hole-title">
              {holeWord} {hole.number} — <em>Par {hole.par}</em>
            </h3>

            {/* Main stats */}
            <div className="hole-stats">
              <div>
                <div className="hs-k">Par</div>
                <div className="hs-v">{hole.par}</div>
              </div>
              <div>
                <div className="hs-k">HCP</div>
                <div className="hs-v">{hole.hcp}</div>
              </div>
            </div>

            {/* Tee distances */}
            <div className="hole-tees">
              {hole.tees.map((dist, i) => (
                <div className="hole-tee" key={i}>
                  <div className="tee-dot" style={{ background: TEE_COLORS[i] }} />
                  <div className="tee-name">{teeNames[i].split(' · ')[0]}</div>
                  <div className="tee-dist">{dist}</div>
                  <div className="tee-unit">m</div>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="hole-tip-label">{tipLabel}</div>
            <p className="hole-desc">{is ? hole.tip_is : hole.tip_en}</p>

            {/* Progress + nav */}
            <div className="hole-progress">
              <div className="hole-progress-track">
                <div
                  className="hole-progress-fill"
                  style={{ width: `${((active + 1) / 18) * 100}%` }}
                />
              </div>
              <div className="hole-nav-btns">
                <button className="hnb prev" onClick={prev}>
                  <span className="hnb-arr" />
                  {holeWord} {String(holes[(active - 1 + 18) % 18].number).padStart(2, '0')}
                </button>
                <span className="hole-count">{active + 1} / 18</span>
                <button className="hnb next" onClick={next}>
                  {holeWord} {String(holes[(active + 1) % 18].number).padStart(2, '0')}
                  <span className="hnb-arr" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
