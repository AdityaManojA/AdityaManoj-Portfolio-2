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

## Tests

```bash
cd my-portfolio
npm test
```

23 tests (Vitest + Testing Library, in `my-portfolio/tests/`):

- **Flows** (`app.test.tsx`): the intro skips on any key; the main menu lists the game's entries in
  order and wraps both ways; Safe House opens and remembers its place; the Blacklist steps through
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
| Any key / click | Skip the intro |
| ← → | Browse a carousel, move in a grid |
| ↑ ↓ | Move through lists, change Blacklist rival |
| Enter / Space | Accept |
| Esc / Backspace | Back |
| 1, 2, 3, Q | The extra prompts shown at the bottom of a screen |

Mouse and touch work too: every icon, chevron, list row and key prompt is clickable.

## Screen map

| Game screen | Portfolio content | Code |
| --- | --- | --- |
| Intro video | Boot loader, "press any key to skip" | `screens/Intro.tsx` |
| Main Menu | Hub: Career, Challenge Series, Quick Race, Online, My Cars, Options; [1] Game Stats | `screens/Menus.tsx` |
| Career → Safe House | Blacklist, Rap Sheet, Car Lot | `screens/Menus.tsx` |
| Blacklist #15 → #1 | 15 projects as rivals, with live-site and source actions | `screens/Blacklist.tsx` |
| Rap Sheet (Rockport PD terminal) | Profile summary, experience, skills, services, top projects | `screens/RapSheet.tsx` |
| Challenge Series | Every tool in the skill arsenal as an event | `screens/ChallengeSeries.tsx` |
| Quick Race | Services, one per race type | `screens/Menus.tsx` |
| Online | Email, LinkedIn, GitHub, CV | `screens/Menus.tsx` |
| My Cars | Renders and visual work, with Showcase mode | `screens/MyCars.tsx` |
| Options | Music and sound toggles, controls, credits | `screens/Menus.tsx` |

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

- **Menu theme** (`public/nfsmw/menu-theme.mp3`) loops from the main menu at 12% volume so it stays
  under the UI. Browsers block sound until the visitor interacts; skipping the intro counts, so it
  normally starts right away. It pauses while the tab is in the background.
- **UI sounds** (`public/nfsmw/sfx/`): `move`, `tick`, `accept` and `back` drive the carousels.
  `term-*` are the Rap Sheet terminal's beeps, cut from a recording of the game's UI sounds.
- Both can be switched off in **Options**; the choice is saved in the browser.

How each sound was cut is in [docs/REFERENCES.md](docs/REFERENCES.md#sound).

## Performance notes

- 21.8 MB of PNG/JPEG screenshots were converted to 0.8 MB of WebP.
- The intro is the 1280×720 60fps source (about 26 MB), remuxed with `faststart` and never
  re-encoded, so it plays at full clarity and starts before it finishes downloading.
- The theme was re-encoded to 96 kbps (2.7 MB, from an 8.7 MB source), since it plays quietly.
- Sound effects are a few KB each, downloaded during the intro and played through Web Audio
  (decoded once, no per-press start-up delay).
- Blacklist, Rap Sheet, Challenge Series and My Cars load as separate chunks, prefetched while the
  intro plays, so the first screen ships less JavaScript and the rest is ready before it is needed.
- No UI framework or CSS framework: React plus one stylesheet, about 80 KB of gzipped JavaScript.
- Neighbouring Blacklist portraits and My Cars renders are prefetched, so flicking through never waits.
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
