# Graph Report - src  (2026-10-23)

## Corpus Check
- Corpus is ~10,134 words - fits in a single context window. You may not need a graph.

## Summary
- 113 nodes · 339 edges · 9 communities
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Rap Sheet Terminal
- Portfolio Content Data
- Carousel Menus and Icons
- App Shell and Navigation
- Audio Engine
- Shared UI and My Cars
- Blacklist and Backdrop
- Keyboard Input and Carousel
- Carousel Rendering

## God Nodes (most connected - your core abstractions)
1. `CarouselMenu()` - 19 edges
2. `useNav()` - 15 edges
3. `Blacklist()` - 14 edges
4. `RapSheet()` - 12 edges
5. `useKeys()` - 11 edges
6. `MyCars()` - 11 edges
7. `asset()` - 10 edges
8. `Corners()` - 10 edges
9. `KeyHints()` - 10 edges
10. `ChallengeSeries()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Blacklist()` --calls--> `asset()`  [EXTRACTED]
  game/screens/Blacklist.tsx → game/assets.ts
- `Online()` --calls--> `asset()`  [EXTRACTED]
  game/screens/Menus.tsx → game/assets.ts
- `Action` --references--> `IconName`  [EXTRACTED]
  game/screens/Blacklist.tsx → game/icons.tsx
- `CarouselMenu()` --calls--> `Icon()`  [EXTRACTED]
  game/screens/CarouselMenu.tsx → game/icons.tsx
- `Blacklist()` --calls--> `useKeys()`  [EXTRACTED]
  game/screens/Blacklist.tsx → game/input.ts

## Import Cycles
- None detected.

## Communities (9 total, 0 thin omitted)

### Community 0 - "Rap Sheet Terminal"
Cohesion: 0.15
Nodes (19): Online(), Block(), caseId(), EDU, Header(), LIST_NAME, listLength(), MENU (+11 more)

### Community 1 - "Portfolio Content Data"
Cohesion: 0.13
Nodes (16): EXPERIENCE, GALLERY, GalleryItem, LINKS, PROFILE, Project, PROJECTS, Service (+8 more)

### Community 2 - "Carousel Menus and Icons"
Cohesion: 0.19
Nodes (13): IconName, ICONS, useNav(), Action, CarouselItem, getMusic(), getSfx(), MainMenu() (+5 more)

### Community 3 - "App Shell and Navigation"
Cohesion: 0.25
Nodes (10): App(), SCREENS, ART, game_game, Nav, NavContext, ScreenId, Intro() (+2 more)

### Community 4 - "Audio Engine"
Cohesion: 0.20
Nodes (8): audio, ensureMusic(), listeners, Prefs, Sfx, SFX_FILES, sfxCache, tryPlayMusic()

### Community 5 - "Shared UI and My Cars"
Cohesion: 0.49
Nodes (8): asset(), initials(), MyCars(), Chevron(), KeyHint(), KeyHints(), PlayerTag(), ScreenTitle()

### Community 6 - "Blacklist and Backdrop"
Cohesion: 0.39
Nodes (8): Icon(), actionsFor(), Blacklist(), RIVALS, shortName(), ChallengeSeries(), Backdrop(), InkSplatter()

### Community 7 - "Keyboard Input and Carousel"
Cohesion: 0.33
Nodes (7): Action, KeyHandlers, KEYMAP, useKeys(), ORDER, Props, Hint

### Community 8 - "Carousel Rendering"
Cohesion: 0.67
Nodes (4): CarouselMenu(), hintOrder(), Corners(), InfoPanel()

## Knowledge Gaps
- **26 isolated node(s):** `SCREENS`, `Sfx`, `SFX_FILES`, `Prefs`, `listeners` (+21 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 31 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useNav()` connect `Carousel Menus and Icons` to `Rap Sheet Terminal`, `Portfolio Content Data`, `App Shell and Navigation`, `Shared UI and My Cars`, `Blacklist and Backdrop`, `Keyboard Input and Carousel`, `Carousel Rendering`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `CarouselMenu()` connect `Carousel Rendering` to `Rap Sheet Terminal`, `Carousel Menus and Icons`, `Shared UI and My Cars`, `Blacklist and Backdrop`, `Keyboard Input and Carousel`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `RapSheet()` connect `Rap Sheet Terminal` to `Carousel Menus and Icons`, `App Shell and Navigation`, `Keyboard Input and Carousel`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `SCREENS`, `Sfx`, `SFX_FILES` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Rap Sheet Terminal` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._
- **Should `Portfolio Content Data` be split into smaller, more focused modules?**
  _Cohesion score 0.13450292397660818 - nodes in this community are weakly interconnected._