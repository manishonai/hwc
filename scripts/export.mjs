// Renders each language side of the running site to share/ as a one-page PDF (Maps link stays clickable) and a JPEG.
// Usage: npm run export [site URL]
import { mkdir } from 'node:fs/promises'
import puppeteer from 'puppeteer-core'

const site = process.argv[2] ?? 'http://localhost:5173'
const WIDTH = 480

// A flat single page: no language switch, page margins or 3D flip
const FLATTEN = `
  body { padding: 0; background: #fffdf7; }
  .languages, .card[lang]:not(:lang(LANG)) { display: none; }
  .booklet, .card { transform: none !important; }
  .card { border-radius: 0; box-shadow: none; }
`

await mkdir('share', { recursive: true })
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? '/usr/bin/chromium' })
try {
  for (const [lang, name] of [['en', 'English'], ['kn', 'Kannada']]) {
    const page = await browser.newPage()
    await page.setViewport({ width: WIDTH, height: 800, deviceScaleFactor: 3 })
    // Screen styles, with every animation off so nothing is caught mid-motion
    await page.emulateMediaType('screen')
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    await page.goto(`${site}/?lang=${lang}`, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: FLATTEN.replace('LANG', lang) })
    await page.evaluate(() => document.fonts.ready)

    const card = await page.$(`.card:lang(${lang})`)
    const { height } = await card.boundingBox()
    const file = `share/House-Warming-Invitation-${name}`
    await card.screenshot({ path: `${file}.jpg`, type: 'jpeg', quality: 92 })
    await page.pdf({ path: `${file}.pdf`, width: `${WIDTH}px`, height: `${Math.ceil(height)}px`, printBackground: true, pageRanges: '1' })
    await page.close()
  }
} finally {
  await browser.close()
}
