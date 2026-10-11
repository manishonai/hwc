import { useEffect, useState } from 'react'
import cowLotus from './assets/cow-lotus.webp'
import ganesha from './assets/ganesha.webp'
import garlandLeft from './assets/garland-left.webp'
import garlandRight from './assets/garland-right.webp'
import lahari from './assets/lahari.webp'
import locationQr from './assets/location-qr.png'

// Same pin the QR resolves to, without its me-qr.com redirect hop
const MAPS_URL = 'https://maps.app.goo.gl/H8cjiMZdfMiK3ZT77'

const LANGUAGES = { en: 'English', kn: 'ಕನ್ನಡ' }

const TEXT = {
  en: {
    deities: ['Shri Mahalingeshwara Swamy Krupe', 'Shri Lakshmi Devi Krupe'],
    lead: 'We are delighted to invite you to the auspicious occasion of our',
    title: 'House Warming',
    house: 'Lahari',
    day: 'Friday',
    month: 'October',
    pooja: 'Satyanarayana Pooja from 10 AM onwards',
    venue: 'Address',
    address: ['No. 201, 3rd Floor, 6 Leela Nivas, Block 7,', 'Nagarabhavi, Bengaluru 560091'],
    landmark: 'Landmark: BCN Grandeur Convention Hall',
    lunch: 'Lunch from 12:30 PM onwards',
    scan: 'Scan for Location',
    qrAlt: 'QR code for the venue location',
    maps: 'Open in Maps',
    regards: 'Best Regards',
    hosts: 'Varsha, Anoop and Family',
  },
  kn: {
    deities: ['ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ ಸ್ವಾಮಿ ಕೃಪೆ', 'ಶ್ರೀ ಲಕ್ಷ್ಮೀ ದೇವಿ ಕೃಪೆ'],
    lead: 'ನಮ್ಮ ನೂತನ ಮನೆಯ ಶುಭ ಸಮಾರಂಭಕ್ಕೆ ತಮಗೆ ಆದರದ ಆಹ್ವಾನ',
    title: 'ಗೃಹಪ್ರವೇಶ',
    house: 'ಲಹರಿ',
    day: 'ಶುಕ್ರವಾರ',
    month: 'ಅಕ್ಟೋಬರ್',
    pooja: 'ಬೆಳಿಗ್ಗೆ 10 ರಿಂದ ಶ್ರೀ ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ',
    venue: 'ವಿಳಾಸ',
    address: ['ನಂ. 201, 3ನೇ ಮಹಡಿ, 6 ಲೀಲಾ ನಿವಾಸ, ಬ್ಲಾಕ್ 7,', 'ನಾಗರಭಾವಿ, ಬೆಂಗಳೂರು 560091'],
    // Hall name stays in Latin script so it matches the signboard and Maps
    landmark: 'Landmark: BCN Grandeur Convention Hall',
    lunch: 'ಮಧ್ಯಾಹ್ನ 12:30 ರಿಂದ ಭೋಜನ',
    scan: 'ಸ್ಥಳಕ್ಕಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    qrAlt: 'ಸ್ಥಳದ ಕ್ಯೂಆರ್ ಕೋಡ್',
    maps: 'ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    regards: 'ತಮ್ಮ ಆಗಮನಾಭಿಲಾಷಿಗಳು',
    hosts: 'ವರ್ಷಾ, ಅನೂಪ್ ಮತ್ತು ಕುಟುಂಬ',
  },
}

const lines = (parts) => parts.flatMap((part, i) => (i ? [<br key={i} />, part] : [part]))

export default function App() {
  const [lang, setLang] = useState(() =>
    new URLSearchParams(location.search).get('lang') === 'kn' ? 'kn' : 'en',
  )
  const t = TEXT[lang]

  // Keeps the choice in the URL so a link can be shared in either language
  useEffect(() => {
    document.documentElement.lang = lang
    history.replaceState(null, '', lang === 'en' ? location.pathname : '?lang=kn')
  }, [lang])

  return (
    <>
      <nav className="languages">
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <button key={code} lang={code} aria-pressed={code === lang} onClick={() => setLang(code)}>
            {name}
          </button>
        ))}
      </nav>

      <main className="card">
        <img className="garland left" src={garlandLeft} alt="" width="310" height="790" />
        <img className="garland right" src={garlandRight} alt="" width="308" height="790" />

        <header>
          <img className="ganesha" src={ganesha} alt="" width="160" height="180" />
          <div className="deities">
            <span>{t.deities[0]}</span>
            <span>{t.deities[1]}</span>
          </div>

          <p className="lead">{t.lead}</p>
          <h1>{t.title}</h1>

          <p className="house">
            <span className="home">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M7 31 32 10l25 21M14 26v27M50 26v27M5 53h54M42 18.400V11h6v12.400M26 53V41a6 6 0 0 1 12 0v12" />
                <circle cx="32" cy="27" r="3" />
              </svg>
            </span>
            <img src={lahari} alt={t.house} width="733" height="372" />
          </p>
        </header>
        <div className="when">
          <span>{t.day}</span>
          <strong>23</strong>
          <span className="pooja">{t.pooja}</span>
        </div>
        <p className="month">{t.month}</p>

        <h2>{t.venue}</h2>
        <address>{lines(t.address)}</address>
        <p className="note">{t.landmark}</p>
        <p className="note">{t.lunch}</p>

        <h2>{t.scan}</h2>
        <img className="qr" src={locationQr} alt={t.qrAlt} width="180" height="180" />
        <br />
        <a className="map" href={MAPS_URL} target="_blank" rel="noopener">
          {t.maps}
        </a>

        <h2>{t.regards}</h2>
        <p className="hosts">{t.hosts}</p>

        <img className="cow" src={cowLotus} alt="" width="1068" height="402" />
      </main>
    </>
  )
}
