# Graph Report - my-portfolio  (2026-11-13)

## Corpus Check
- 53 files · ~1,023,307 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 494 nodes · 770 edges · 28 communities (22 shown, 6 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 1% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.9)
- Token cost: 121,403 input · 0 output

## Community Hubs (Navigation)
- Legacy Page Components
- App Shell, Loader and SEO Build
- App Entry and Routing
- About, Quotes and Results Data
- Drift Cursor and Garage
- Package Manifest
- Projects View and Cloud
- Preview Capture Scripts
- App TypeScript Config
- README Projects Catalog
- Node TypeScript Config
- CV: Education and Experience
- Interface Sounds
- Dev Dependencies
- README Profile Sections
- Explore and Handbook Modals
- ALFRED and Utility Projects
- PWA and Firebase Projects
- Landing Redesign Decisions
- Preferences and Project Data
- Graphify Workflow
- Client Storefronts and TerraCove
- Root TypeScript Config
- Graphify Rule
- Image Optimisation Script
- Source Index

## God Nodes (most connected - your core abstractions)
1. `react` - 27 edges
2. `compilerOptions` - 20 edges
3. `Aditya Manoj — Master Portfolio Data Package` - 20 edges
4. `Projects Catalog` - 20 edges
5. `3. Projects Catalog (Ordered for Showcase)` - 19 edges
6. `compilerOptions` - 18 edges
7. `Aditya Manoj CV (cv.pdf)` - 18 edges
8. `Projects()` - 14 edges
9. `ScrollReveal()` - 14 edges
10. `ProjectsView()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Bespoke Static Site Generation pipeline` --semantically_similar_to--> `<!--seo:head--> build-time SEO placeholder (search-pages plugin)`  [INFERRED] [semantically similar]
  public/cv.pdf → index.html
- `Build and handoff` --references--> `RotatingWord()`  [INFERRED]
  README.md → src/components/HeroMotion.tsx
- `Switchable multi-backend data adapter (Firestore / Supabase / local)` --conceptually_related_to--> `Progressive Web App (offline-first) pattern`  [INFERRED]
  public/cv.pdf → README.md
- `1. ThreadPath Collective` --references--> `Projects()`  [INFERRED]
  README.md → src/components/Projects.tsx
- `2. Pixel Spaces — 3D Visualisation & Interior Design Studio` --references--> `Projects()`  [INFERRED]
  README.md → src/components/Projects.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Loader-derived brand identity (page loader, favicon, share card, Prompt-Ops cover)** — index_page_loader, index_type_cursor_motif, scripts_covers_favicon_favicon_tile, scripts_covers_share_share_card, scripts_covers_promptops_promptops_cover [INFERRED 0.85]
- **Zero third-party request privacy posture** — index_self_hosted_fonts, public_privacy_no_tracking_policy, public_privacy_privacy_page, public_fonts_instrumentserif_license_instrument_serif_license, public_fonts_inter_license_inter_license, readme_privacy_readiness [INFERRED 0.85]
- **Offline-first Firebase PWA project family** — readme_terracove, readme_levern, readme_sbafa_financial_enclave, readme_glia, readme_pwa, readme_firebase [INFERRED 0.85]

## Communities (28 total, 6 thin omitted)

### Community 0 - "Legacy Page Components"
Cohesion: 0.06
Nodes (33): react, Contact(), DarkModeToggle(), FLAGSHIP_ITEMS, FlagshipProject, FlagshipShowcase(), Gallery(), HeaderProps (+25 more)

### Community 1 - "App Shell, Loader and SEO Build"
Cohesion: 0.06
Nodes (45): index.html app shell, finish(), Page loader (typed name + Type cursor), Self-hosted fonts (Inter, Instrument Serif), <!--seo:head--> build-time SEO placeholder (search-pages plugin), Serif stand-in fonts with size-adjust, Static no-JS fallback in #root (staticFallback), tick() (+37 more)

### Community 2 - "App Entry and Routing"
Cohesion: 0.08
Nodes (23): react-dom, vite, @vitejs/plugin-react, App(), View, viewFromLocation(), VIEWS, FAQ (+15 more)

### Community 3 - "About, Quotes and Results Data"
Cohesion: 0.09
Nodes (24): QUOTES, RESULTS, AboutView(), EXPERIENCE, NUMBERS, ProjectPopup(), Props, AGENTS (+16 more)

### Community 4 - "Drift Cursor and Garage"
Cohesion: 0.11
Nodes (24): DIRS, DriftCar(), DriftSettings, MarkPoint, Puff, Availability, DEFAULTS, DriftGarage() (+16 more)

### Community 5 - "Package Manifest"
Cohesion: 0.09
Nodes (25): dependencies, react, react-dom, name, private, scripts, build, dev (+17 more)

### Community 6 - "Projects View and Cloud"
Cohesion: 0.16
Nodes (23): baseName(), CLIENT_WORK, CLOUD, hasPhoneCapture(), LEAD, onPhone(), PHONE_CAPTURES, phoneImage() (+15 more)

### Community 7 - "Preview Capture Scripts"
Cohesion: 0.11
Nodes (18): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_path, ref_node_url, easeInOut(), imageDir, only (+10 more)

### Community 8 - "App TypeScript Config"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 9 - "README Projects Catalog"
Cohesion: 0.15
Nodes (20): 10. Prompt-Ops Blueprints & AI Dataset Engine, 11. Retro QR Crafter, 12. CSV to JSON Converter, 13. Meat Spoilage Detection, 14. Flashcard Learning Pal, 15. 8-Bit-O-Matic, 1. ThreadPath Collective, 2. Pixel Spaces — 3D Visualisation & Interior Design Studio (+12 more)

### Community 10 - "Node TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 11 - "CV: Education and Experience"
Cohesion: 0.17
Nodes (17): Rajiv Gandhi Centre for Biotechnology (BRIC-RGCB), Aditya Manoj CV (cv.pdf), Endogenous App - Government Rural & Heritage Tourism Platform, GLIA Event OS (IAN-2025 symposium PWA), ICT Academy of Kerala, IndZita Biotech - Non-Invasive Diagnostics & Bio-Automation Platform, Jyothi Engineering College (APJ Abdul Kalam Technological University), MAHA MedTech grant (ANRF, ICMR, Gates Foundation) - INR 7 Crore (+9 more)

### Community 12 - "Interface Sounds"
Cohesion: 0.17
Nodes (16): buffers, clickSound(), decoding, enabled, fetchRaw(), GAIN, hoverSound(), isEnabled() (+8 more)

### Community 13 - "Dev Dependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+8 more)

### Community 14 - "README Profile Sections"
Cohesion: 0.12
Nodes (15): Aditya Manoj (AI/ML Systems & Full-Stack Engineer), 1. Quick Info & Contact, 2. Bio & Narrative, 4. Career History & Timeline, 5. Services & Architecture Offerings, 6. Complete Skills Inventory, 7. Creative Gallery Renders, 8. Plug-and-Play TypeScript / JSON Export Block (+7 more)

### Community 15 - "Explore and Handbook Modals"
Cohesion: 0.23
Nodes (10): ExploreModal(), ExploreModalProps, HandbookModal(), HandbookModalProps, HANDBOOK_FOUNDATIONS, HANDBOOK_META, HANDBOOK_QUESTIONS, HandbookQuestion (+2 more)

### Community 16 - "ALFRED and Utility Projects"
Cohesion: 0.18
Nodes (11): ALFRED Mark-IX - Autonomous Multimodal AI Desktop Assistant, 16 kHz ring-buffer audio pipeline with dual-gate ONNX wake-word + CAM++ speaker verification, 8-Bit-O-Matic, ALFRED MARK-VIII (Wayne Protocol Edition), CSV to JSON Converter, The DevOps, SRE & Cloud Infrastructure Handbook, Flashcard Learning Pal, Meat Spoilage Detection (IoT) (+3 more)

### Community 17 - "PWA and Firebase Projects"
Cohesion: 0.29
Nodes (11): Levern - Gamified Quest Engine & Habit Tracker PWA, Firebase (Hosting / Firestore / Auth), GLIA - High-Throughput Event OS & PWA (IAN-2025), HTML5 Canvas rendering, IndZita Biotech (3D molecular visualization platform), Levern - Gamified Quest & Habit Tracker PWA, Pixel Spaces - 3D Visualisation & Interior Design Studio, Progressive Web App (offline-first) pattern (+3 more)

### Community 18 - "Landing Redesign Decisions"
Cohesion: 0.25
Nodes (10): Capability section (four compact cards), Proof strip CountUp, Hero backdrop canvas dot grid (HeroBackdrop.tsx), Landing page redesign (October 2026), No added animation libraries decision, Kinetic headline RotatingWord (HeroMotion.tsx), CountUp(), CountUpProps (+2 more)

### Community 19 - "Preferences and Project Data"
Cohesion: 0.24
Nodes (10): The Whisky Business - Commercial Suite & ML Demand Forecaster, Walk-forward rolling backtest demand forecasting engine, Cursor garage defaults (drift-garage-v3), Dark mode by default (DarkModeToggle.tsx), Interface sounds (useUiSounds.ts, SoundToggle.tsx), localStorage functional preferences (theme-preference, ui-sounds, drift-garage-v3), Portfolio updates (27 October 2026), Project interface (+2 more)

### Community 20 - "Graphify Workflow"
Cohesion: 0.31
Nodes (8): GRAPH_REPORT.md, graphify query / path / explain commands, Graphify Always-On Rule, graphify update (AST-only refresh), graphify-out Knowledge Graph (graph.json), graphify-out/wiki/index.md, graphify skill pipeline, Workflow: graphify

### Community 21 - "Client Storefronts and TerraCove"
Cohesion: 0.25
Nodes (8): Switchable multi-backend data adapter (Firestore / Supabase / local), TerraCove - Multi-Backend Freelance Workspace (MVP), ThreadPath Collective - Sustainable E-Commerce Storefront, Flagship showcase pinned expanding-panel gallery (FlagshipShowcase.tsx), Mobile fixes (iOS Safari frames, U+FE0E arrows), SoloDesk (retired project), TerraCove - Independent Work Studio (freelance PWA), ThreadPath Collective (sustainable streetwear e-commerce)

## Ambiguous Edges - Review These
- `Career History & Timeline` → `Aditya Manoj CV (cv.pdf)`  [AMBIGUOUS]
  public/cv.pdf · relation: conceptually_related_to
- `IndZita Biotech (3D molecular visualization platform)` → `GLIA - High-Throughput Event OS & PWA (IAN-2025)`  [AMBIGUOUS]
  README.md · relation: shares_data_with
- `Google Fonts (Montserrat) third-party request` → `No cookies, analytics or third-party requests policy`  [AMBIGUOUS]
  public/privacy.html · relation: conceptually_related_to
- `localStorage functional preferences (theme-preference, ui-sounds, drift-garage-v3)` → `No cookies, analytics or third-party requests policy`  [AMBIGUOUS]
  public/privacy.html · relation: conceptually_related_to

## Knowledge Gaps
- **183 isolated node(s):** `ProjectsProps`, `HandbookSection`, `10. Prompt-Ops Blueprints & AI Dataset Engine`, `11. Retro QR Crafter`, `12. CSV to JSON Converter` (+178 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 224 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Career History & Timeline` and `Aditya Manoj CV (cv.pdf)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `IndZita Biotech (3D molecular visualization platform)` and `GLIA - High-Throughput Event OS & PWA (IAN-2025)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **What is the exact relationship between `Google Fonts (Montserrat) third-party request` and `No cookies, analytics or third-party requests policy`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `localStorage functional preferences (theme-preference, ui-sounds, drift-garage-v3)` and `No cookies, analytics or third-party requests policy`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `react` connect `Legacy Page Components` to `App Entry and Routing`, `About, Quotes and Results Data`, `Drift Cursor and Garage`, `Package Manifest`, `Projects View and Cloud`, `Interface Sounds`, `Explore and Handbook Modals`, `Landing Redesign Decisions`?**
  _High betweenness centrality (0.465) - this node is a cross-community bridge._
- **Why does `Landing page redesign (October 2026)` connect `Landing Redesign Decisions` to `App Shell, Loader and SEO Build`, `Client Storefronts and TerraCove`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `Aditya Manoj — Master Portfolio Data Package` connect `README Profile Sections` to `App Shell, Loader and SEO Build`, `README Projects Catalog`, `CV: Education and Experience`, `ALFRED and Utility Projects`, `PWA and Firebase Projects`, `Preferences and Project Data`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._