import { useEffect, useState } from 'react'

const TARGET = new Date('2026-12-15T18:00:00')

function formatRemaining(ms) {
  if (ms < 0) return { days: 0, hours: 0, mins: 0, secs: 0 }
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60
  return { days, hours, mins, secs }
}

function Countdown({ target }) {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    setMounted(true)
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) {
    return (
      <div className="countdown-block">
        <div className="count-item"><span className="count-num">--</span><span className="count-label">DAYS</span></div>
        <div className="count-item"><span className="count-num">--</span><span className="count-label">HRS</span></div>
        <div className="count-item"><span className="count-num">--</span><span className="count-label">MINS</span></div>
        <div className="count-item"><span className="count-num">--</span><span className="count-label">SECS</span></div>
      </div>
    )
  }

  const rem = formatRemaining(target - now)

  return (
    <div className="countdown-block">
      <div className="count-item"><span className="count-num">{rem.days}</span><span className="count-label">DAYS</span></div>
      <div className="count-item"><span className="count-num">{String(rem.hours).padStart(2, '0')}</span><span className="count-label">HRS</span></div>
      <div className="count-item"><span className="count-num">{String(rem.mins).padStart(2, '0')}</span><span className="count-label">MINS</span></div>
      <div className="count-item"><span className="count-num">{String(rem.secs).padStart(2, '0')}</span><span className="count-label">SECS</span></div>
    </div>
  )
}

function FallingEmojis({ count = 12 }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: (Math.random() * 6).toFixed(2) + 's',
        duration: (8 + Math.random() * 10).toFixed(2) + 's',
        size: 12 + Math.round(Math.random() * 18)
      }))
    )
  }, [count])

  return (
    <div className="emoji-layer" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="emoji"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animationDelay: it.delay,
            animationDuration: it.duration
          }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}

export default function Home() {
  const [opened, setOpened] = useState(false)

  return (
    <div className={opened ? 'page-root page-root--reception' : 'page-root'}>
      <FallingEmojis />

      {!opened ? (
        <main className="welcome-shell">
          <div className="welcome-copy">
            <h1 className="welcome-heading">A celebration, sealed for you</h1>
            <p className="welcome-names">
              <span className="welcome-name welcome-name--first">Arvinth</span>
              <span className="welcome-ampersand">&amp;</span>
              <span className="welcome-name welcome-name--last">Mohanapriya</span>
            </p>
          </div>

          <div className="invitation-envelope" aria-label="welcome invitation">
            <svg className="envelope-folds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 0 0 L 100 100 M 100 0 L 0 100" />
            </svg>
            <button className="seal-btn" onClick={() => setOpened(true)} aria-label="Open invitation">
              <span className="seal-letter">A</span>
              <span className="seal-divider">|</span>
              <span className="seal-letter">M</span>
            </button>
          </div>

          <p className="seal-hint">✦ Tap the seal to open ✦</p>
        </main>
      ) : (
        <main className="invitation-shell">
          <section className="reception-card">
            <div className="badge">வரவேற்பு</div>
            <h1 className="hero-title">Reception</h1>

            <div className="info-card">
              <div className="decor decor-left">✦</div>
              <div className="decor decor-right">✦</div>

              <p className="event-date">TUESDAY, 15 DECEMBER 2026</p>
              <h2 className="venue-name">K. C. Thirumana Mandapam</h2>
              <p className="time-line">6:00 PM TO 9:00 PM</p>

              <p className="address">
                Marudhamalai Rd, Karai Gounder Layout, Mappillai Layout, Kongu Nagar,
                Kalveermapalayam, Coimbatore, Tamil Nadu 641046
              </p>

              <p className="invite-copy">
                <h3>We’re getting ready for forever — we’d love to hear you say, “I’ll be there!”❤️ </h3>
                Join us for an evening of love, laughter, and togetherness as we celebrate our new beginning.
              </p>
            </div>

            <div className="location-bar">
              <div className="location-copy">
                <p className="location-label">LOCATION</p>
                <h3>K. C. Thirumana<br />Mandapam</h3>
              </div>

              <a
                className="map-btn"
                href="https://www.google.com/maps?rlz=1C1RXQR_enIN1124IN1124&biw=1536&bih=826&sca_esv=0cc2b9f834b9d715&sxsrf=APpeQnubEWF73t1W7n71mKbl4lJS-cp-yQ:1789984299885&gs_lp=Egxnd3Mtd2l6LXNlcnAiGGsuIGMuIHRoaXJ1bWFuYSBtYW5kYXBhbTILEC4YgAQYxwEYrwEyBRAAGIAEMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGA0jPFFAAWABwAHgBkAEAmAFzoAFzqgEDMC4xuAEByAEA-AEC-AEBmAIBoAJ3mAMAkgcDMC4xoAecB7IHAzAuMbgHd8IHAzItMcgHA4AIAQ&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=Kbfi7GkTX6g7MTopBCLFAxME&daddr=Marudhamalai+Rd,+Karai+Gounder+Layout,+Mappillai+Layout,+Kongu+Nagar,+Kalveerampalayam,+Coimbatore,+Tamil+Nadu+641046"
                target="_blank"
                rel="noreferrer"
              >
                Open Map
              </a>
            </div>
          </section>

          <section className="countdown-section">
            <div className="countdown-card">
              <p className="section-kicker">Until the celebration</p>
              <h2 className="section-title">Countdown</h2>
              <Countdown target={TARGET.getTime()} />
            </div>
          </section>

          <section className="thankyou-section">
            <div className="thankyou-card">
              <p className="thankyou-text">
                Bring your blessings, your smiles, and your best vibes!
               <br/>We'll bring the celebrations. Together, let’s make some memories!
              </p>
              <p className="section-kicker">With love</p>
              <p className="signature">Arvinth & Mohanapriya</p>
            </div>
          </section>
        </main>
      )}
    </div>
  )
}
