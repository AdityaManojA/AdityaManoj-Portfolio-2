import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// The app renders in the browser, so the HTML a crawler, a link preview, or a visitor
// without JavaScript receives would otherwise be an empty <div id="root">. This fills that
// div at build time with a plain, readable version of the site, generated from the same
// project data the app uses. React replaces it as soon as the app starts.
function staticFallback(): Plugin {
  return {
    name: 'static-fallback',
    transformIndexHtml(html) {
      const source = readFileSync('src/data/index.ts', 'utf8')
      const block = source.slice(
        source.indexOf('export const PROJECTS_DATA'),
        source.indexOf('export const GALLERY_DATA'),
      )
      const projects = [...block.matchAll(/\{\s*id: \d+,([\s\S]*?)\n {2}\}/g)]
        .map(([, body]) => {
          const field = (key: string) => body.match(new RegExp(`${key}: "((?:[^"\\\\]|\\\\.)*)"`))?.[1]
          return {
            title: field('title'),
            year: field('year'),
            description: field('description'),
            link: field('link'),
            handbook: /isHandbook: true/.test(body),
          }
        })
        .filter((p) => p.title && !p.handbook)

      const items = projects
        .map((p) => {
          const title = escapeHtml(p.title!)
          const heading = p.link ? `<a href="${escapeHtml(p.link)}">${title}</a>` : title
          return `<article><h3>${heading}</h3><p>${escapeHtml(p.year ?? '')}. ${escapeHtml(p.description ?? '')}</p></article>`
        })
        .join('\n        ')

      const fallback = `<main class="fallback">
      <h1>Aditya Manoj, full-stack developer and systems engineer</h1>
      <p>Aditya Manoj is a full-stack developer and systems engineer based in Bengaluru, India. He builds offline-first progressive web apps, canvas and 3D interfaces, and on-device AI agents, and takes projects from the first idea to a production system.</p>
      <nav aria-label="Sections"><a href="/">Projects</a> · <a href="/#about">About</a> · <a href="/#contact">Contact</a></nav>
      <h2>Selected work</h2>
        ${items}
      <h2>About</h2>
      <p>Aditya works across four areas: frontend (React and Next.js, canvas and 3D, progressive web apps), backend (FastAPI and Node.js, Firestore and PostgreSQL, offline sync), AI agents (live voice and vision, local models, on-device OCR), and infrastructure (Linux internals, Kubernetes, observability).</p>
      <p>Experience: full-stack PWA and security engineer at SBAFA Financial Enclave (2026), lead frontend and graphics engineer at IndZita Biotech (2026), product development engineer at Lascade (2025), lead developer at the Rajiv Gandhi Centre for Biotechnology (2024), and software engineering intern at Flipkart (2024).</p>
      <p>GLIA, the event app he built for an international neuroscience conference, handled more than 1.2 million Firestore reads. ALFRED, his desktop AI assistant, does on-device OCR in under 150 ms.</p>
      <h2>Contact</h2>
      <p>Email <a href="mailto:aditya.dev.org@gmail.com">aditya.dev.org@gmail.com</a>, phone <a href="tel:+919947527296">+91 99475 27296</a>, GitHub <a href="https://github.com/AdityaManojA">github.com/AdityaManojA</a>. <a href="/privacy.html">Privacy</a>.</p>
    </main>`

      return html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticFallback()],
})
