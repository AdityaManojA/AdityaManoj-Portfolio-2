# Graph Report - my-portfolio  (2026-10-23)

## Corpus Check
- 39 files · ~900,887 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .css 2, .cache 1)

## Summary
- 225 nodes · 363 edges · 14 communities (9 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7484ee3c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- App.tsx
- Hero.tsx
- compilerOptions
- compilerOptions
- devDependencies
- HandbookModal.tsx
- Aditya Manoj — Master Portfolio Data Package
- tsconfig.json
- 3. Projects Catalog (Ordered for Showcase)
- rules/graphify.md
- workflows/graphify.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `react` - 19 edges
3. `3. Projects Catalog (Ordered for Showcase)` - 19 edges
4. `compilerOptions` - 18 edges
5. `ScrollReveal()` - 17 edges
6. `Projects()` - 16 edges
7. `App()` - 15 edges
8. `Hero()` - 12 edges
9. `Aditya Manoj — Master Portfolio Data Package` - 11 edges
10. `9. Site Implementation & Release Handoff` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Build and handoff` --references--> `RotatingWord()`  [INFERRED]
  README.md → src/components/HeroMotion.tsx
- `1. ThreadPath Collective` --references--> `Projects()`  [INFERRED]
  README.md → src/components/Projects.tsx
- `2. Pixel Spaces — 3D Visualisation & Interior Design Studio` --references--> `Projects()`  [INFERRED]
  README.md → src/components/Projects.tsx
- `3. IndZita Biotech` --references--> `Projects()`  [INFERRED]
  README.md → src/components/Projects.tsx
- `5. ALFRED — MARK-VIII (Wayne Protocol Edition)` --references--> `Projects()`  [INFERRED]
  README.md → src/components/Projects.tsx

## Import Cycles
- None detected.

## Communities (14 total, 5 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (29): dependencies, react, react-dom, name, private, scripts, build, dev (+21 more)

### Community 1 - "App.tsx"
Cohesion: 0.13
Nodes (26): App(), About(), Contact(), DetailedFooter(), SimpleFooter(), Gallery(), HandbookModal(), Header() (+18 more)

### Community 2 - "Hero.tsx"
Cohesion: 0.14
Nodes (21): Landing page redesign (October 2026), react, DarkModeToggle(), FLAGSHIP_ITEMS, FlagshipProject, FlagshipShowcase(), panPosition(), CAPABILITIES (+13 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 5 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+8 more)

### Community 6 - "HandbookModal.tsx"
Cohesion: 0.24
Nodes (9): ExploreModal(), ExploreModalProps, HandbookModalProps, HANDBOOK_FOUNDATIONS, HANDBOOK_META, HANDBOOK_QUESTIONS, HandbookQuestion, HandbookSection (+1 more)

### Community 7 - "Aditya Manoj — Master Portfolio Data Package"
Cohesion: 0.09
Nodes (22): 1. Quick Info & Contact, 2. Bio & Narrative, 4. Career History & Timeline, 5. Services & Architecture Offerings, 6. Complete Skills Inventory, 7. Creative Gallery Renders, 8. Plug-and-Play TypeScript / JSON Export Block, 9. Site Implementation & Release Handoff (+14 more)

### Community 11 - "3. Projects Catalog (Ordered for Showcase)"
Cohesion: 0.15
Nodes (20): 10. Prompt-Ops Blueprints & AI Dataset Engine, 11. Retro QR Crafter, 12. CSV to JSON Converter, 13. Meat Spoilage Detection, 14. Flashcard Learning Pal, 15. 8-Bit-O-Matic, 1. ThreadPath Collective, 2. Pixel Spaces — 3D Visualisation & Interior Design Studio (+12 more)

## Knowledge Gaps
- **111 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 119 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Hero.tsx` to `package.json`, `App.tsx`, `HandbookModal.tsx`?**
  _High betweenness centrality (0.273) - this node is a cross-community bridge._
- **Why does `Projects()` connect `3. Projects Catalog (Ordered for Showcase)` to `App.tsx`, `Hero.tsx`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `3. Projects Catalog (Ordered for Showcase)` connect `3. Projects Catalog (Ordered for Showcase)` to `Aditya Manoj — Master Portfolio Data Package`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07196969696969698 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1282051282051282 - nodes in this community are weakly interconnected._
- **Should `Hero.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13756613756613756 - nodes in this community are weakly interconnected._