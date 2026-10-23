# Aditya Manoj · Most Wanted

My portfolio, presented as the front end of **Need for Speed: Most Wanted (2005)**. It opens on the
game's intro video, then drops into the main menu. Every page of the portfolio is one of the game's
screens, and you drive it with the arrow keys like the PC version.

> Fan-made and non-commercial. The key art, intro video, menu theme and UI sounds belong to
> Electronic Arts. Swap them out before using this commercially (see [Replacing the game assets](#replacing-the-game-assets)).

## Run it

You need Node.js 20 or newer.

```bash
cd my-portfolio
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

To build a static copy you can host anywhere:

```bash
cd my-portfolio
npm run build
```

The `my-portfolio/dist/` folder is self-contained. Every path is relative, so it runs from any
static host or sub-folder (GitHub Pages, Netlify, an S3 bucket). `npm run preview` serves it locally.

## Hosting

This portfolio lives only on the `feat/nfs-mw-menu` branch and is hosted on its own, apart from the
main portfolio: **https://xo-aditya-mostwanted.web.app** (Firebase site `xo-aditya-mostwanted` in
project `adityamanojportfolio`; the main portfolio stays on `xo-aditya`). To redeploy:

```bash
cd my-portfolio
npm run build
firebase deploy --only hosting:xo-aditya-mostwanted
```

Browsers check for a new version of the page and media on every visit (`max-age=0`; an unchanged
file is a quick "not modified" reply, not a re-download), so there is no stale cache to clear.
Firebase's CDN does cache the media (`s-maxage`) and clears it on every deploy. That caching matters:
served uncached, Firebase streams files without byte-range support, and iPhones then refuse to play
the intro. The hashed bundles in `assets/` are cached for good, since each build renames them.

## Tests

```bash
cd my-portfolio
npm test
```

28 tests (Vitest + Testing Library, in `my-portfolio/tests/`):

- **Flows** (`app.test.tsx`): the intro skips on any key; the main menu lists the game's entries in
  order and wraps both ways; Projects opens in one step and remembers its place; projects flip by swipe and scroll wheel; the Blacklist steps through
  rivals, clamps at #1, opens the bio and launches the live site; the Rap Sheet boots, lists the
  profile and opens all six sections plus a ranking; Challenge Series moves through the grid; My
  Cars cycles and toggles Showcase; Options toggles music and sound; Online opens links; Quit asks
  through the ATTENTION dialog, keeps keys inside it, cancels and confirms; held-down Enter can't
  chain through menus.
- **Integrity** (`assets.test.ts`): every project, gallery and profile image, every sound, every
  game glyph and the intro, theme and backgrounds referenced in code exist in `public/`; projects
  have titles, years, descriptions and tags; links are absolute.

Layout was also audited in the browser at 1920-class, 1280×720, 1024×768, 768×1024 and 375×812 by
a script that walks every screen and flags off-screen text, clipped text and colliding blocks; all
pass.

Production dependencies have no known vulnerabilities (`npm audit --omit=dev`). The few advisories
`npm audit` still lists are inside the test runner's own dependencies, which never ship.

## Controls

| Key | Action |
| --- | --- |
| Any key / click | Begin (starts the intro with sound), then skip the intro |
| ← → | Browse a carousel, move in a grid |
| ↑ ↓ | Move through lists, change project |
| Enter / Space | Accept |
| Esc / Backspace | Back |
| 1, 2, 3, Q | The extra prompts shown at the bottom of a screen |

Mouse and touch work too: every icon, chevron, list row and key prompt is clickable. On the
Projects screen, swipe up (or scroll down) for the next project and swipe down (or scroll up)
for the previous one.

## Screen map

Menu labels say what each screen holds, every menu shows an Open prompt and a one-line "how to use this" help in yellow, and the icons, layout and order are the game's. Icon slots are square and notes reserve the height of the longest one, so nothing moves as you browse.

| Menu label (game screen) | Portfolio content | Code |
| --- | --- | --- |
| Intro video | Police lamps with "Click to begin" (browsers allow sound only after a click), then the intro on a loop; any key skips | `screens/Intro.tsx` |
| Main menu | Projects, About Me, Skills, Services, Contact, Gallery, Settings, with an Open prompt and a plain help line | `screens/Menus.tsx` |
| Projects (Career → Blacklist #1 → #15) | 15 projects, best first, opened straight from the main menu; Live Site and Source Code links; swipe or scroll to flip; tap the image (or [2]) for Details | `screens/Blacklist.tsx` |
| About Me (Rap Sheet, Rockport PD terminal) | Profile summary, experience, skills, services, top projects | `screens/RapSheet.tsx` |
| Skills (Challenge Series) | Every tool in the skill arsenal as an event | `screens/ChallengeSeries.tsx` |
| Services (Quick Race) | Services, one per race type | `screens/Menus.tsx` |
| Contact (Online) | Email, LinkedIn, GitHub, CV | `screens/Menus.tsx` |
| Gallery (My Cars) | Renders and visual work, with Showcase mode | `screens/MyCars.tsx` |
| Settings (Options) | Music and sound toggles, controls, credits | `screens/Menus.tsx` |

Rap Sheet sections: **Summary** (profile), **Vehicle Database** (work history), **Infractions**
(skill categories), **Cost to State** (services), **Top 5 Pursuits** (top projects) and
**Rankings** (tools per category).

Which part of the original game each screen copies is documented in [docs/REFERENCES.md](docs/REFERENCES.md).

## Editing content

All portfolio text lives in one file: [`my-portfolio/src/game/content.ts`](my-portfolio/src/game/content.ts).

- `PROJECTS`: in rank order. The first 15 are the Blacklist (`PROJECTS[0]` is #1) and the first 5 are Top 5 Pursuits.
- `EXPERIENCE`: newest first. Feeds the Rap Sheet's Vehicle Database.
- `SKILLS`: categories and tools. Feeds Challenge Series, Infractions and Rankings.
- `SERVICES`: Quick Race events and Cost to State.
- `GALLERY`: My Cars. Titles describe what each render shows.
- `PROFILE`, `LINKS`: name, title, summary, contact links.

Images go in `my-portfolio/public/media/` as WebP (about 1280px wide, quality 78 keeps them small).

## Project layout

```
my-portfolio/
  index.html             page shell, fonts, black boot background
  public/
    nfsmw/               game assets: intro.mp4, menu-theme.mp3, main-menu.webp (scene),
                         background.webp (poster fallback), sfx/*.mp3
    media/               portfolio images (projects, gallery, profile) as WebP
    cv.pdf
  src/
    main.tsx             entry
    game/
      App.tsx            intro, then the screen stack
      nav.ts             push / back / quit
      input.ts           keyboard model (useKeys)
      audio.ts           menu theme + UI sound effects, saved preferences
      assets.ts          base-URL-safe asset paths
      content.ts         all portfolio content
      icons.tsx          white menu glyphs
      ui.tsx             shared pieces: backdrop, ink, corner brackets, chevrons, key prompts
      util.ts            remembered selections, counts, link opening
      game.css           all styles (menu look + Rap Sheet terminal)
      screens/           one file per screen
  media-src/             raw source media, git-ignored (see below)
```

## Audio

- **Menu theme** (`public/nfsmw/menu-theme.mp3`) loops from the main menu at about 5% volume so it stays
  under the UI. Browsers block sound until the visitor interacts; skipping the intro counts, so it
  normally starts right away. It pauses while the tab is in the background.
- **UI sounds** (`public/nfsmw/sfx/`): `move`, `tick`, `accept` and `back` drive the carousels.
  `term-*` are the Rap Sheet terminal's beeps, cut from a recording of the game's UI sounds.
  The recordings sit at very different levels, so each effect has its own gain (`SFX_GAIN` in
  `audio.ts`) that brings its peak to about -9 dBFS, clearly over the theme without blasting.
- Both can be switched off in **Options**; the choice is saved in the browser.

How each sound was cut is in [docs/REFERENCES.md](docs/REFERENCES.md#sound).

## Performance notes

Measured on the production build (`npm run build && npx vite preview`) by driving every screen by
keyboard: a locked 60 fps with zero frames over 33 ms, zero long tasks, and no image, glyph or font
fetched after a screen opened. First paint is about 130 ms.

What gets it there, without touching image or video quality:

- **Nothing pops in.** As the intro starts, the menu art, ink, loader lamps, avatar, first Blacklist
  portrait, first render and every font face are fetched and decoded; game glyphs are pulled into
  in-memory blob URLs so CSS masks never go back to the network. While the intro plays and in idle
  time after, every project portrait, gallery render and skill logo is warmed a few at a time. The
  preloaded images are kept alive, so later `<img>` tags are served from memory whatever the host's
  cache headers say (`src/game/preload.ts`).
- **No waits between screens.** All screens ship in one bundle, so opening one never waits on the
  network. The only wait is the game's lamps screen, which asks for the click that lets the intro play with sound; the video buffers behind it. The Rap Sheet's
  scripted boot is shorter (0.9 s per step) and Enter skips it.
- **Cheap effects.** The ink splatter is pre-rendered once (`public/nfsmw/ink.webp`, 23 KB) instead of
  an SVG turbulence filter rasterised on every screen. The film-grain layer is a sixth of its old
  size, and the background drift and grain each sit on their own GPU layer.
- **Local fonts.** UnifrakturCook, Saira and Michroma ship with the bundle (latin subsets via
  `@fontsource`), so there is no render-blocking request to Google Fonts.
- **Media at full quality.** The intro is the 1280×720 60 fps source, stream-copied with fast-start
  (never re-encoded); images are the original WebP conversions.
- Sound effects are decoded once into Web Audio buffers, so every press plays instantly.
- `prefers-reduced-motion` turns animations off.

## Menu background

The menus sit on the game's main-menu scene, the M3 GTR parked in the Rockport yard with no UI,
saved as `my-portfolio/public/nfsmw/main-menu.webp` (1280×720, taken from the game's main-menu
footage with the baked-in bottom UI faded to ink; see docs/REFERENCES.md). When that file is
present the layout matches the game: car upper-left, carousel bottom-right, player tag and prompts
bottom-left. Without it the box-art poster (`background.webp`) is used and the menu moves to the
left so it doesn't cover the car. The same scene, dimmed and softened, sits behind the Rap Sheet
terminal, the Blacklist, Challenge Series and My Cars.

## Replacing the game assets

Everything copyrighted sits in `my-portfolio/public/nfsmw/`. Replace those files with your own
(same names) and the site keeps working. The fonts are free Google Fonts (UnifrakturCook for
headings, Saira for UI text, Michroma for the Rap Sheet terminal), so they can stay. The glyphs in
`public/nfsmw/icons/` were cut from game captures and should be replaced too.

`my-portfolio/media-src/` (git-ignored) holds the full-quality originals the web copies were made
from: `intro-720p-source.mp4` (and the earlier `intro-320p.mp4`), `menu-theme.mp3`, `gui-sounds.mp3`,
`ui-sounds-compilation.mp3`, `main-menu-source.jpg`.
