# References

Each screen copies a specific part of NFS: Most Wanted (2005, PC). This file records what was
copied and where it was checked, so later changes can be made against the same sources rather than
from memory. Timestamps are into the linked videos.

## Sources

| # | Source | Used for |
| --- | --- | --- |
| V1 | [NFS Most Wanted Main Menu Theme](https://www.youtube.com/watch?v=xg-dTQUSnxE) | Main menu layout |
| V2 | [Need For Speed: Most Wanted - Rap Sheet](https://www.youtube.com/watch?v=HH2nuaMd3Go) | Every Rap Sheet screen |
| V3 | [NFS Most Wanted (2005) ULTRAWIDE 100% Game Completion](https://www.youtube.com/watch?v=qkS0C4fsAKg) | Safe House, Blacklist, My Cars, Rankings |
| V4 | [Challenge Series #1 - Tollbooth Time Trial](https://www.youtube.com/watch?v=0tE_2Pigm4k) | Challenge Series board, main menu with chevrons on both sides |
| V5 | [NFS Most Wanted (2005) [UI Sounds]](https://www.youtube.com/watch?v=DMWGJCGvAPI) | UI sound effects (the downloaded MP3 of this video) |
| S1 | Owner-supplied screenshot: title art + M3 GTR garage | Menu key art (top half), My Cars layout (bottom half) |
| S2 | Owner-supplied `GUI sounds.mp3` | Carousel sound effects |
| G1 | Owner's captures of the running game (web.nfsmwo.com), kept in `my-portfolio/media-src/game-captures/` | `3` main menu (now the menu background), `4` loading screen, `5` ATTENTION dialog, `8` blacklist bio, `9` milestones board, `10` blacklist rival, `11` car select, `12` Rap Sheet sign-in. Also the source of every game glyph in `public/nfsmw/icons/`. |
| S4 | 1280×720 thumbnail of V1 (`i.ytimg.com/vi/xg-dTQUSnxE/maxresdefault.jpg`) | `main-menu.webp`: the real main-menu scene. Its baked-in bottom UI (menu, ink, player tag) is faded to ink black along the edge where that UI starts; the logo and the game's own graffiti stay. Source kept in `media-src/main-menu-source.jpg`. |
| S3 | Owner-supplied stills: main menu (M3 GTR, "main menu" carousel), "spoilers" carousel, "IS 300 1/32" car select, save/load dialog | Main-menu layout, two-tone chevrons and dots, striped counters, My Cars layout |
| W1 | [StrategyWiki: Game modes](https://www.strategywiki.org/wiki/Need_for_Speed:_Most_Wanted/Game_modes) | The six Quick Race types |
| F1 | [dafont: NFS MW UI/Message font](https://www.dafont.com/forum/read/470903/need-for-speed-most-wanted-ui-message-font), [HUD font](https://www.dafont.com/forum/read/306457/nfs-most-wanted-2005-hud-font) | Eurostile identification for terminal text |

## Screens

### Intro
- Owner-supplied intro video (EnciclopediaLusa upload, 1280×720, 60fps), full screen on black.
  Stream-copied into `intro.mp4` with fast-start only; the video stream is bit-identical to the source.
- "press any key to skip" in the menu heading font, bottom right. Any key, click or tap skips.

### Main Menu (V1 0:00–3:46, V4 0:03)
- Key art behind. Logo top centre (baked into the art).
- Heading "main menu" in lowercase blackletter.
- Carousel: yellow «« on both ends (V4 0:03 shows both), the previous item, the selected item
  inside orange corner brackets, then the next items getting smaller.
- Label under the selected icon.
- Bottom-left: player name on a black bar with diagonal stripes; prompts `[Q] Quit`, `[1] Game Stats` (V4 0:03).
- Entry order: Career, Challenge Series, Quick Race, Online, My Cars, Options.
- Previous entries appear as grey dots (nearer one larger); the selected entry's name is centred
  under its icon; chevrons are two-tone, inner arrow muted and outer bright (S3).
- Layout follows S3 when the scene frame `main-menu.webp` is present: carousel bottom-right, player
  tag with `[Q] Quit` `[1] Game Stats` bottom-left. With only the S1 poster (car on the right) the
  carousel and ink move to the bottom-left instead.

### Safe House (V3 0:10, 0:36)
- Same carousel as the main menu, heading "safe house".
- Info box with grey corner brackets beside the carousel (game: Career Completion / Bounty / Cash;
  here: Blacklist / Roles / Tools).
- `[Esc] Back` prompt.

### Loading (G1-4)
- Shown while a screen's code loads: the game's three lamps (cut from the capture), a striped band,
  "LOADING...".

### ATTENTION dialog (G1-5)
- Quit asks first. Orange-striped header, brown body with the warning glyph, striped footer; the
  highlighted button is filled orange inside orange corner brackets; ← → choose, Enter confirms,
  Esc cancels. Keys go only to the dialog while it is open.

### Blacklist (G1-10 rival, G1-8 bio; V3 0:17, 0:25)
- Rival page: stacked yellow ↑↓ chevrons beside "blacklist N", name under it, striped value box
  top-right, portrait with ink and DEFEATED stamp, tan right-aligned quote, bracketed table with an
  orange "Target" header and orange values, carousel with the game's Race Events and Milestones
  glyphs, `[Esc] Back [2] Bio`.
- Bio page: "Ride:" and "Strength:" with blackletter labels, bracketed "bio:" block, portrait right.
- Heading "blacklist N" with the rival's name and badge beneath.
- Top-right value box (game: Bounty / Cash; here: Rival n / 15).
- Rival portrait on the left with a red **DEFEATED** stamp.
- Quote line, then a bracketed table: header right-aligned, rows with yellow check icons.
- Action carousel along the bottom (game: Race Events…).
- Rivals are projects; `↑ ↓` change rival, `← →` change action.

### Rap Sheet (V2, V3 0:45–1:50)
Green-on-black Rockport Police Department terminal, lime header bars, dotted rules, prompts in
green-bordered boxes, `CASE FILE: …` bottom-right. On wide screens the game shows the terminal as a
black 4:3 panel with the garage scene around it (V3 0:45); here the scene sits behind, dimmed and
softened.
- Boot: the game's barred badge glyph, "ROCKPORT POLICE DEPARTMENT", the lime SIGN IN / PASSWORD
  box (G1-12), `[↵ Skip] [Esc Back]` (V2 0:05).
- "SEARCHING DATABASE --/ RETRIEVING LIST --/" then the name list with the highlighted row (V2 0:14).
- RAP SHEET: striped stats block, then MAIN MENU with square bullets: Summary, Vehicle Database,
  Infractions, Cost to State, Top 5 Pursuits, Rankings (V2 0:21).
- SUMMARY: stats, striped warning box, then four two-line blocks (V2 0:30).
- VEHICLE DATABASE: entries with `< SUSPECTED TO DRIVE >` headers and a scroll bar (V2 0:55).
- INFRACTIONS: right-aligned table (V2 1:30).
- COST TO STATE: `QTY / CATEGORY` table with a total (V2 1:50).
- TOP 5 PURSUITS: numbered boxes, `CAR USED` and `ID: MW-…` lines (V2 2:10).
- RANKINGS: "SELECT A CATEGORY FOR MORE DETAIL:" list, then a ranked table with a `›` pointer (V2 2:55–4:40, V3 1:05).

### Challenge Series (V4 0:06)
- Heading "challenge series".
- Bracketed panel: event glyph, event name, goal line.
- Four-column grid of event glyphs (tollbooth, stopwatch, speed trap, badge, money bag, roadblock);
  the selected one gold with corner brackets.
- Yellow scroll bar with ▲▼ on the left, `n/69` counter bottom-right.
- Map box on the right. Here it shows the tool's logo and its series list instead of a route.

### Quick Race (W1)
- No Quick Race menu footage was found; the race types come from W1 (Circuit, Sprint, Lap
  Knockout, Tollbooth, Speedtrap, Drag) and the screen reuses the verified carousel.

### My Cars (S3 "IS 300 1/32", S1 bottom half, V3 0:30)
- Garage scene behind; the render sits centre stage.
- Top-left: maker badge in orange corner brackets, striped `n/N` counter under it, name in wide
  caps (Eurostile-style) beside it, with «« »» to change car.
- Top-right: TOP SPEED / ACCELERATION / HANDLING with thin blue bars.
- Bottom: ink splatter carrying `[Esc] Back [↵] Accept [3] Showcase`.
- Showcase hides the interface.

### Online, Options
- No reference footage used; both reuse the main-menu carousel.

## Game glyphs

Cut from G1 captures by `luminance/colour → alpha` (white, yellow, orange or lime ink keyed out of
the background), median-filtered, trimmed and saved as lossless WebP masks. `Icon` draws them as a
`currentColor` mask, so the selected-gold and dimmed states work as in the game.

| Glyph | From | Used for |
| --- | --- | --- |
| career, challenge | G1-3 main menu | Main menu Career, Challenge Series |
| raceevents, milestones | G1-10 blacklist carousel | Blacklist actions (live site, source) |
| speedtrap, stopwatch, roadblock, spikestrip, tradepaint | G1-9 milestones board | Challenge Series events |
| warning | G1-5 ATTENTION | Quit confirmation |
| rpdbadge | G1-12 Rap Sheet | Rap Sheet boot badge |

Entries with no capture yet (Quick Race, Online, My Cars, Options, the Safe House items, race
types, contact links) still use the drawn icons in `icons.tsx`.

## Fonts

| Use | In the game | Here | Why |
| --- | --- | --- | --- |
| Headings ("main menu", "safe house", "press any key to skip") | Lowercase textura blackletter, bold | **UnifrakturCook Bold** (Google Fonts) | Compared side by side with a 720p frame of "challenge series" (V4 0:06) against UnifrakturMaguntia, Pirata One, Grenze Gotisch, New Rocker, Germania One, Jacquard 24 and Old English Text MT. Closest letterforms: fractured diagonals in `c`/`e`, looped two-storey `g`, heavy stems. No public source names the game's actual face; the game ships it as bitmap textures. |
| Rap Sheet terminal | Eurostile Bold Extended (F1) | **Michroma** + 0.35px stroke | Free Eurostile Extended equivalent; the stroke adds the bold weight Michroma lacks. |
| Labels, prompts, panels, bios | Bold, tracked, squared-round sans | **Saira** 600–800 (Google Fonts) | Compared against the G1-8 bio paragraph and G1-10 "Race Wins / Milestones Completed" next to Arial, Rubik, Kanit, Heebo, Archivo, Manrope, Mulish, Nunito Sans, Exo 2 and Titillium; Saira's squared `s`, `e` and `g` match. |

## Sound

Full-quality sources live in `my-portfolio/media-src/` (git-ignored).

| File | Source | Cut |
| --- | --- | --- |
| `menu-theme.mp3` | Owner-supplied theme | Whole track, 96 kbps stereo, played at 12% volume |
| `sfx/move.mp3` | S2 clip 2 (1.08 s) | Shortest, brightest tick (107 ms, centroid 6.1 kHz); carousel left/right |
| `sfx/tick.mp3` | S2 clip 1 (0.09 s) | Short tick (123 ms, 5.6 kHz); grid and rival steps |
| `sfx/back.mp3` | S2 clip 3 (2.17 s) | Lower, short (182 ms, 2.9 kHz) |
| `sfx/accept.mp3` | S2 clip 4 (3.37 s) | Longest, heaviest (340 ms, 3.2 kHz) |
| `sfx/term-boot.mp3` | V5 MP3, 3:26.49 | Rap Sheet sign-in screen |
| `sfx/term-search.mp3` | V5 MP3, 3:39.76 | "Searching database" sequence |
| `sfx/term-move.mp3` | V5 MP3, 3:36.12 | Highlight moving in the terminal list |
| `sfx/term-select.mp3` | V5 MP3, 3:38.48 | Terminal select |

How these were chosen:
- **V5 sections** were identified by sampling frames: 0:00–0:07 EA splash, 0:07–3:26 front-end
  menus (My Cars, customisation), 3:26–4:21 Rap Sheet terminal, 4:53–4:59 post-race results,
  5:00 on the in-game world map.
- **Rap Sheet sounds** sit in clean silence in V5, so they were cut directly at detected onsets and
  gain-matched (+12 to +14 dB).
- **Menu sounds** in V5 play over a constant engine idle, so the carousel sounds come from S2
  instead. Cross-correlating S2 against V5 scored 0.2 to 0.5, so S2's clips are not cuts of V5.
  S2's clips were labelled by duration, loudness and spectral centroid.
- To retune a sound, re-cut from `media-src/` with ffmpeg (64 kbps mono, 30 ms fade-out) and
  replace the file in `public/nfsmw/sfx/`.
