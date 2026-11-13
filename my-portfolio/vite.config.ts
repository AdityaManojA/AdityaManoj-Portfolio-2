import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------------------
// Search and AI-search output.
//
// The app renders in the browser, so on its own the HTML a crawler, a link preview, or a
// visitor without JavaScript receives would be an empty <div id="root">. The plugin below
// fixes that at build time. For each of the three pages it writes:
//   - the page's own <title>, description, canonical URL, share tags and JSON-LD;
//   - a plain, readable version of the page inside #root (React replaces it on start).
// It also writes sitemap.xml, llms.txt and llms-full.txt. Everything about the projects is
// read from src/data/index.ts, so these files cannot drift from what the site shows.
// ---------------------------------------------------------------------------------------

const SITE = 'https://adityaaa.web.app'
const NAME = 'Aditya Manoj'
const EMAIL = 'aditya.dev.org@gmail.com'
const PHONE = '+919947527296'
const PHONE_SHOWN = '+91 99475 27296'
const GITHUB = 'https://github.com/AdityaManojA'
const LINKEDIN = 'https://www.linkedin.com/in/aditya-manoj-a-0a930b256/'
const INSTAGRAM = 'https://www.instagram.com/xo.adityaaa.dev/'
const X = 'https://x.com/Adityathedev'
const AVAILABILITY = 'Taking projects from December'
const QUOTES = [
  ['Excellent payment portal and shopping pages, and an easy to edit CMS!', 'ThreadPath Collective'],
  ['A great amount of stress reduction for the staff because of the new admin dashboard.', 'The Whisky Business'],
  ['The best landing page to outpace my competitors!', 'Pixel Spaces'],
]
const TODAY = new Date().toISOString().slice(0, 10)

// The same lead order the page uses (see LEAD in src/site/ProjectsView.tsx).
const LEAD = [8, 11, 18, 13, 22, 21, 1, 16]

const EXPERIENCE = [
  ['Lead systems engineer, GLIA Event OS', 'Rajiv Gandhi Centre for Biotechnology', '2025'],
  ['Product development engineer', 'Lascade', '2025'],
  ['Full-stack development intern', 'ICT Academy of Kerala', '2024'],
  ['AI/ML engineering intern', 'ICT Academy of Kerala', '2024'],
]

type Route = 'home' | 'about' | 'contact'

const PAGES: Record<Route, { path: string; file: string; title: string; description: string }> = {
  home: {
    path: '/',
    file: 'index.html',
    title: `${NAME} | Full-Stack Developer and Systems Engineer`,
    description: `${NAME} is a full-stack developer and systems engineer in Kerala building offline-first web apps, 3D interfaces, and on-device AI agents.`,
  },
  about: {
    path: '/about',
    file: 'about.html',
    title: `About ${NAME} | Full-Stack Developer in Kerala`,
    description: `Who ${NAME} is: a full-stack developer and systems engineer in Kerala, with experience at the Rajiv Gandhi Centre for Biotechnology, Lascade and ICT Academy of Kerala.`,
  },
  contact: {
    path: '/contact',
    file: 'contact.html',
    title: `Contact ${NAME} | Hire a Full-Stack Developer`,
    description: `Contact ${NAME} about a web app, PWA, 3D interface or AI agent project: email ${EMAIL}, phone ${PHONE_SHOWN}, or GitHub.`,
  },
}

const esc = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

interface ProjectEntry {
  id: number
  title: string
  name: string
  year: string
  description: string
  link?: string
  image: string
}

/** Reads the project list out of the data module as text (it imports images, so it cannot simply be imported here). */
function readProjects(): ProjectEntry[] {
  const source = readFileSync('src/data/index.ts', 'utf8')
  const block = source.slice(source.indexOf('export const PROJECTS_DATA'), source.indexOf('export const GALLERY_DATA'))
  const projects = [...block.matchAll(/\{\s*id: (\d+),([\s\S]*?)\n {2}\}/g)]
    .map(([, id, body]) => {
      const field = (key: string) => body.match(new RegExp(`${key}: "((?:[^"\\\\]|\\\\.)*)"`))?.[1]
      const title = field('title') ?? ''
      const file = (field('image') ?? '').split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''
      return {
        id: Number(id),
        title,
        name: title.split(' — ')[0],
        year: field('year') ?? '',
        description: field('description') ?? '',
        link: field('link'),
        image: `/ProjectImages/web/${encodeURIComponent(file)}`,
        handbook: /isHandbook: true/.test(body),
      }
    })
    .filter((p) => p.title && !p.handbook)
  const rank = (id: number) => (LEAD.includes(id) ? LEAD.indexOf(id) : LEAD.length)
  return projects.sort((a, b) => rank(a.id) - rank(b.id))
}

// ---- JSON-LD -------------------------------------------------------------------------

function jsonLd(route: Route, projects: ProjectEntry[]) {
  const page = PAGES[route]
  const url = SITE + page.path
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: NAME,
    alternateName: 'Aditya Manoj A',
    jobTitle: 'Full-Stack Developer and Systems Engineer',
    description: `${NAME} is a full-stack developer and systems engineer who builds offline-first web apps, 3D interfaces, and on-device AI agents.`,
    url: SITE + '/',
    image: `${SITE}/ProjectImages/web/pfp.webp`,
    email: `mailto:${EMAIL}`,
    telephone: PHONE,
    address: { '@type': 'PostalAddress', addressRegion: 'Kerala', addressCountry: 'IN' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Jyothi Engineering College' },
    knowsAbout: [
      'React', 'Next.js', 'TypeScript', 'Progressive web apps', 'Offline-first applications', 'HTML5 Canvas',
      '3D web interfaces', 'Firebase', 'FastAPI', 'Node.js', 'PostgreSQL', 'Kubernetes', 'Linux', 'AI agents',
    ],
    sameAs: [GITHUB, LINKEDIN, INSTAGRAM, X],
  }
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE + '/',
    name: NAME,
    description: PAGES.home.description,
    inLanguage: 'en',
    publisher: { '@id': person['@id'] },
  }
  const crumbs = [{ name: 'Home', path: '/' }, ...(route === 'home' ? [] : [{ name: route === 'about' ? 'About' : 'Contact', path: page.path }])]
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE + c.path })),
  }
  const webPage: Record<string, unknown> = {
    '@type': route === 'home' ? 'CollectionPage' : route === 'about' ? 'ProfilePage' : 'ContactPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': website['@id'] },
    about: { '@id': person['@id'] },
    author: { '@id': person['@id'] },
    datePublished: '2026-11-13',
    dateModified: TODAY,
    breadcrumb: { '@id': breadcrumb['@id'] },
    primaryImageOfPage: `${SITE}/share-card.png`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.summary'] },
  }
  const graph: unknown[] = [website, person, webPage, breadcrumb]
  if (route === 'home') {
    const list = {
      '@type': 'ItemList',
      '@id': `${SITE}/#projects`,
      name: `Projects by ${NAME}`,
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          description: p.description,
          ...(p.link ? { url: p.link } : {}),
          image: `${SITE}${p.image}.webp`,
          dateCreated: p.year,
          creator: { '@id': person['@id'] },
        },
      })),
    }
    webPage.mainEntity = { '@id': list['@id'] }
    graph.push(list)
  } else {
    webPage.mainEntity = { '@id': person['@id'] }
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

// ---- <head> --------------------------------------------------------------------------

function head(route: Route, projects: ProjectEntry[]) {
  const page = PAGES[route]
  const url = SITE + page.path
  const share = route === 'home'
    ? 'Offline-first web apps, 3D interfaces, and on-device AI agents, built from first idea to production.'
    : page.description
  return `<title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}" />
    <meta name="author" content="${NAME}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${url}" />
    <link rel="me" href="${GITHUB}" />
    <link rel="me" href="${LINKEDIN}" />
    <link rel="me" href="${INSTAGRAM}" />
    <link rel="me" href="${X}" />
    <meta property="og:type" content="${route === 'home' ? 'website' : 'profile'}" />
    <meta property="og:site_name" content="${NAME}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(share)}" />
    <meta property="og:image" content="${SITE}/share-card.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${NAME}, full-stack developer and systems engineer" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(share)}" />
    <meta name="twitter:image" content="${SITE}/share-card.png" />
    <script type="application/ld+json">${jsonLd(route, projects)}</script>`
}

// ---- Readable page content ------------------------------------------------------------
// Headings are phrased as the questions people ask, and each answer stands on its own,
// because that is the shape search engines and AI assistants quote from.

const sectionsNav = `<nav aria-label="Sections"><a href="/">Projects</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy.html">Privacy</a></nav>`
const updated = `<p><small>Last updated <time datetime="${TODAY}">${TODAY}</time> by ${NAME}.</small></p>`
const contactLine = `Email <a href="mailto:${EMAIL}">${EMAIL}</a>, call or message <a href="tel:${PHONE}">${PHONE_SHOWN}</a>, or see the code on GitHub at <a href="${GITHUB}">github.com/AdityaManojA</a>.`

function body(route: Route, projects: ProjectEntry[]) {
  const years = projects.map((p) => Number(p.year))
  const span = `${Math.min(...years)} and ${Math.max(...years)}`

  if (route === 'home') {
    const items = projects
      .map((p) => {
        const title = esc(p.title)
        const heading = p.link ? `<a href="${esc(p.link)}">${title}</a>` : title
        return `<article>
          <h3>${heading}</h3>
          <img src="${p.image}-sm.webp" width="480" height="300" loading="lazy" alt="Screenshot of ${esc(p.name)}, a ${esc(p.year)} project by ${NAME}" />
          <p>${esc(p.name)} (${esc(p.year)}). ${esc(p.description)}</p>
        </article>`
      })
      .join('\n        ')
    return `<main class="fallback">
      <h1>${NAME}, full-stack developer and systems engineer</h1>
      <p class="summary">${NAME} is a full-stack developer and systems engineer based in Kerala, India. ${NAME} builds offline-first progressive web apps, canvas and 3D interfaces, and on-device AI agents, and takes each project from the first idea to a production system. This portfolio lists ${projects.length} projects shipped between ${span}.</p>
      ${sectionsNav}
      <h2>What has ${NAME} built?</h2>
      <p>${NAME} has shipped ${projects.length} projects between ${span}: client websites such as ThreadPath Collective, The Whisky Business and Pixel Spaces, installable progressive web apps such as Levern, TerraCove, GLIA and SBAFA Financial Enclave, and ALFRED, a desktop AI assistant. Each project below links to the live site or its source code.</p>
        ${items}
      <h2>Who is ${NAME}?</h2>
      <p>${NAME} is an engineer who works across frontend, backend, AI agents and infrastructure. He has worked at the Rajiv Gandhi Centre for Biotechnology, Lascade and ICT Academy of Kerala. <a href="/about">Read more about ${NAME}</a>.</p>
      <h2>How can I contact ${NAME}?</h2>
      <p>${contactLine} <a href="/contact">All contact details</a>.</p>
      ${updated}
    </main>`
  }

  if (route === 'about') {
    const jobs = EXPERIENCE.map(([role, company, year]) => `<li>${esc(role)} at ${esc(company)}, ${year}.</li>`).join('\n        ')
    return `<main class="fallback">
      <h1>About ${NAME}</h1>
      <p class="summary">${NAME} is a full-stack developer and systems engineer based in Kerala, India, who turns rough ideas into fast systems that hold under load. ${NAME} holds a B.Tech in Computer Science and Engineering from Jyothi Engineering College.</p>
      ${sectionsNav}
      <h2>What does ${NAME} work on?</h2>
      <p>${NAME} works across four areas. In frontend, he builds with React and Next.js, HTML5 canvas and 3D, and progressive web apps. In backend, he builds with FastAPI and Node.js, Firestore and PostgreSQL, and offline sync. In AI agents, he builds live voice and vision assistants, runs local models, and does on-device OCR. In infrastructure, he works with Linux internals, Kubernetes and observability tooling. He is currently building ALFRED Mark VIII, a desktop AI assistant.</p>
      <h2>Where has ${NAME} worked?</h2>
      <p>${NAME} has held four engineering roles between 2024 and 2025. He interned twice at ICT Academy of Kerala in 2024, first in AI/ML engineering from January to June and then in full-stack development from July to October. He was a product development engineer at Lascade in Kochi from January to August 2025, working on Travel Animator. From June to November 2025 he was lead systems engineer at the Rajiv Gandhi Centre for Biotechnology in Thiruvananthapuram, where he built GLIA, the event system for the IAN-2025 neuroscience symposium.</p>
      <ol>
        ${jobs}
      </ol>
      <h2>What do clients say about ${NAME}?</h2>
      <ul>
        ${QUOTES.map(([text, client]) => `<li>${esc(client)}: "${esc(text)}"</li>`).join('\n        ')}
      </ul>
      <h2>What results has ${NAME}'s work produced?</h2>
      <p>GLIA, the offline-first event app ${NAME} built for an international neuroscience conference, handled more than 1.2 million Firestore reads. Travel Animator, the route animation app he worked on at Lascade, is used by more than 1 million people. ALFRED, his desktop AI assistant, performs on-device OCR in under 150 ms. The canvas visualisations he built for IndZita Biotech render at 60 frames per second.</p>
      <h2>How can I work with ${NAME}?</h2>
      <p>${contactLine} See <a href="/">the projects ${NAME} has shipped</a> or <a href="/contact">all contact details</a>.</p>
      ${updated}
    </main>`
  }

  return `<main class="fallback">
      <h1>Contact ${NAME}</h1>
      <p class="summary">${NAME} is a full-stack developer and systems engineer based in Kerala, India, who takes on web app, progressive web app, 3D interface and AI agent projects. The fastest ways to reach ${NAME} are email at ${EMAIL} and phone at ${PHONE_SHOWN}.</p>
      ${sectionsNav}
      <h2>How do I reach ${NAME}?</h2>
      <ul>
        <li>Email: <a href="mailto:${EMAIL}">${EMAIL}</a></li>
        <li>Phone: <a href="tel:${PHONE}">${PHONE_SHOWN}</a></li>
        <li>GitHub: <a href="${GITHUB}">github.com/AdityaManojA</a></li>
        <li>LinkedIn: <a href="${LINKEDIN}">${NAME} on LinkedIn</a></li>
        <li>Instagram: <a href="${INSTAGRAM}">@xo.adityaaa.dev</a></li>
        <li>X: <a href="${X}">@Adityathedev</a></li>
      </ul>
      <h2>Is ${NAME} available for new work?</h2>
      <p>Yes. ${NAME} is taking on new projects from December.</p>
      <h2>What kind of projects does ${NAME} take on?</h2>
      <p>${NAME} takes projects from the first idea to a production system. ${NAME} builds four kinds of software: client websites, offline-first progressive web apps, canvas and 3D interfaces, and on-device AI agents. See <a href="/">all ${projects.length} projects</a> or <a href="/about">read about his experience</a>.</p>
      <h2>What has ${NAME} built for clients recently?</h2>
      <ul>
        ${projects.slice(0, 4).map((p) => `<li>${p.link ? `<a href="${esc(p.link)}">${esc(p.name)}</a>` : esc(p.name)} (${esc(p.year)}): ${esc(p.description)}</li>`).join('\n        ')}
      </ul>
      <h2>What should I include when I get in touch with ${NAME}?</h2>
      <p>A short message is enough to start. It helps to say what the project is, who will use it, whether a website or design already exists, and when it needs to be live. ${NAME} replies by email or phone.</p>
      <h2>Where is ${NAME} based?</h2>
      <p>${NAME} is based in Kerala, India, and works with clients remotely. Past clients include ThreadPath Collective in Canada, The Whisky Business in Thrissur, and Pixel Spaces in Kerala and Muscat.</p>
      ${updated}
    </main>`
}

// ---- Generated text files ----------------------------------------------------------------

function sitemap() {
  const urls = ['/', '/about', '/contact', '/privacy']
    .map((path) => `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function llmsTxt(projects: ProjectEntry[], full: boolean) {
  const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text
  const list = projects
    .map((p) => `- [${p.name}](${p.link ?? SITE + '/'}): ${full ? p.description : firstSentence(p.description)} (${p.year})`)
    .join('\n')
  const jobs = EXPERIENCE.map(([role, company, year]) => `- ${role} at ${company}, ${year}`).join('\n')
  return `# ${NAME}

> ${NAME} is a full-stack developer and systems engineer based in Kerala, India. He builds offline-first progressive web apps, canvas and 3D interfaces, and on-device AI agents, and takes projects from the first idea to a production system.

This is his portfolio. It has three pages, each readable without JavaScript. Last updated ${TODAY}.

## Pages

- [Projects](${SITE}/): the ${projects.length} projects he has shipped, with screenshots and links
- [About](${SITE}/about): what he works on, where he has worked, and measured results
- [Contact](${SITE}/contact): email, phone, GitHub and LinkedIn
${full ? '' : `- [Full text](${SITE}/llms-full.txt): this file with complete project descriptions\n`}
## Projects

${list}

## Experience

${jobs}

## Skills

- Frontend: React, Next.js, TypeScript, HTML5 canvas, 3D interfaces, progressive web apps
- Backend: FastAPI, Node.js, Firestore, PostgreSQL, offline sync
- AI agents: live voice and vision, local models, on-device OCR
- Infrastructure: Linux internals, Kubernetes, observability

## Results

- GLIA handled more than 1.2 million Firestore reads at an international neuroscience conference
- Travel Animator, which he worked on at Lascade, is used by more than 1 million people
- ALFRED performs on-device OCR in under 150 ms
- IndZita Biotech's canvas visualisations render at 60 frames per second

## Contact

- Email: ${EMAIL}
- Phone: ${PHONE_SHOWN}
- GitHub: ${GITHUB}
- LinkedIn: ${LINKEDIN}
- Instagram: ${INSTAGRAM}
- X: ${X}
- Availability: ${AVAILABILITY}
`
}

// ---- The plugin -------------------------------------------------------------------------

const HEAD_MARK = '<!--seo:head-->'
const ROOT_EMPTY = '<div id="root"></div>'
const render = (shell: string, route: Route, projects: ProjectEntry[]) =>
  shell.replace(HEAD_MARK, head(route, projects)).replace(ROOT_EMPTY, `<div id="root">${body(route, projects)}</div>`)

function searchPages(): Plugin {
  let outDir = 'dist'
  let shell = ''
  return {
    name: 'search-pages',
    configResolved(config) {
      outDir = config.build.outDir
    },
    // index.html: keep the untouched shell for the other pages, then fill in the home page.
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        shell = html
        return render(html, 'home', readProjects())
      },
    },
    generateBundle() {
      const projects = readProjects()
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt(projects, false) })
      this.emitFile({ type: 'asset', fileName: 'llms-full.txt', source: llmsTxt(projects, true) })
    },
    // about.html and contact.html: the same built shell with their own head and content.
    // Firebase serves them at /about and /contact (cleanUrls).
    closeBundle() {
      if (!shell) return
      const projects = readProjects()
      for (const route of ['about', 'contact'] as const) {
        writeFileSync(join(outDir, PAGES[route].file), render(shell, route, projects))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), searchPages()],
})
