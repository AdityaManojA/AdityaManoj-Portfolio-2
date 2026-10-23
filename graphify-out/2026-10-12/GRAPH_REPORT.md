# Graph Report - AdityaManoj-Portfolio-2  (2026-09-23)

## Corpus Check
- 35 files · ~756,994 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .css 2, .cache 1)

## Summary
- 117 nodes · 122 edges · 10 communities (7 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b3e7cf08`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- 3. Projects Catalog (Ordered for Showcase)
- Hero.tsx
- Aditya Manoj — Master Portfolio Data Package
- package.json
- Graphify + Antigravity Project Workflow & Setup Guide
- rules/graphify.md
- workflows/graphify.md
- devDependencies
- scripts

## God Nodes (most connected - your core abstractions)
1. `3. Projects Catalog (Ordered for Showcase)` - 15 edges
2. `Aditya Manoj — Master Portfolio Data Package` - 9 edges
3. `scripts` - 5 edges
4. `react` - 5 edges
5. `SOCIAL_LINKS` - 3 edges
6. `2. Bio & Narrative` - 3 edges
7. `Header()` - 2 edges
8. `ExploreModal()` - 2 edges
9. `Hero()` - 2 edges
10. `1. Quick Info & Contact` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 3 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.13
Nodes (13): my_portfolio_src_components_about, my_portfolio_src_components_contact, my_portfolio_src_components_footer, my_portfolio_src_components_footer_detailedfooter, my_portfolio_src_components_footer_simplefooter, my_portfolio_src_components_gallery, my_portfolio_src_components_handbookmodal, my_portfolio_src_components_handbookmodal_handbookmodal (+5 more)

### Community 1 - "3. Projects Catalog (Ordered for Showcase)"
Cohesion: 0.13
Nodes (15): 10. Retro QR Crafter, 11. CSV to JSON Converter, 12. Meat Spoilage Detection, 13. Flashcard Learning Pal, 14. 8-Bit-O-Matic, 1. GLIA — High-Throughput Event OS & PWA (IAN-2025), 2. ThreadPath Collective, 3. IndZita Biotech (+7 more)

### Community 2 - "Hero.tsx"
Cohesion: 0.11
Nodes (19): my_portfolio_src_components_darkmodetoggle, ExploreModal(), ExploreModalProps, Header(), HeaderProps, Hero(), HeroProps, my_portfolio_src_components_projectcard (+11 more)

### Community 3 - "Aditya Manoj — Master Portfolio Data Package"
Cohesion: 0.17
Nodes (11): 1. Quick Info & Contact, 2. Bio & Narrative, 4. Career History & Timeline, 5. Services & Architecture Offerings, 6. Complete Skills Inventory, 7. Creative Gallery Renders, 8. Plug-and-Play TypeScript / JSON Export Block, About Me (Long Bio) (+3 more)

### Community 4 - "package.json"
Cohesion: 0.08
Nodes (23): dependencies, react, react-dom, name, private, type, version, autoprefixer (+15 more)

### Community 8 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+8 more)

### Community 9 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

## Knowledge Gaps
- **75 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 97 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Hero.tsx` to `App.tsx`, `package.json`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `3. Projects Catalog (Ordered for Showcase)` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Hero.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11067193675889328 - nodes in this community are weakly interconnected._