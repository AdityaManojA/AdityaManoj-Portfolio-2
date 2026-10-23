# Graph Report - AdityaManoj-Portfolio-2  (2026-09-23)

## Corpus Check
- 35 files · ~756,996 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .css 2, .cache 1)

## Summary
- 72 nodes · 77 edges · 8 communities (5 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb1f3b7b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- 3. Projects Catalog (Ordered for Showcase)
- index.ts
- Aditya Manoj — Master Portfolio Data Package
- Hero.tsx
- Graphify + Antigravity Project Workflow & Setup Guide
- rules/graphify.md
- workflows/graphify.md

## God Nodes (most connected - your core abstractions)
1. `3. Projects Catalog (Ordered for Showcase)` - 15 edges
2. `Aditya Manoj — Master Portfolio Data Package` - 9 edges
3. `2. Bio & Narrative` - 3 edges
4. `SOCIAL_LINKS` - 3 edges
5. `Graphify + Antigravity Project Workflow & Setup Guide` - 2 edges
6. `1. Quick Info & Contact` - 2 edges
7. `ExploreModal()` - 2 edges
8. `Header()` - 2 edges
9. `Hero()` - 2 edges
10. `PROJECTS_DATA` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 3 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.13
Nodes (13): my_portfolio_src_components_about, my_portfolio_src_components_contact, my_portfolio_src_components_footer, my_portfolio_src_components_footer_detailedfooter, my_portfolio_src_components_footer_simplefooter, my_portfolio_src_components_gallery, my_portfolio_src_components_handbookmodal, my_portfolio_src_components_handbookmodal_handbookmodal (+5 more)

### Community 1 - "3. Projects Catalog (Ordered for Showcase)"
Cohesion: 0.13
Nodes (15): 10. Retro QR Crafter, 11. CSV to JSON Converter, 12. Meat Spoilage Detection, 13. Flashcard Learning Pal, 14. 8-Bit-O-Matic, 1. GLIA — High-Throughput Event OS & PWA (IAN-2025), 2. ThreadPath Collective, 3. IndZita Biotech (+7 more)

### Community 2 - "index.ts"
Cohesion: 0.18
Nodes (10): Header(), HeaderProps, my_portfolio_src_data_images_aditya, GALLERY_DATA, IMAGES, Project, SERVICES_DATA, SKILLS_DATA (+2 more)

### Community 3 - "Aditya Manoj — Master Portfolio Data Package"
Cohesion: 0.17
Nodes (11): 1. Quick Info & Contact, 2. Bio & Narrative, 4. Career History & Timeline, 5. Services & Architecture Offerings, 6. Complete Skills Inventory, 7. Creative Gallery Renders, 8. Plug-and-Play TypeScript / JSON Export Block, About Me (Long Bio) (+3 more)

### Community 4 - "Hero.tsx"
Cohesion: 0.22
Nodes (9): my_portfolio_src_components_darkmodetoggle, ExploreModal(), ExploreModalProps, Hero(), HeroProps, my_portfolio_src_components_projectcard, my_portfolio_src_components_scrollreveal, PROJECTS_DATA (+1 more)

## Knowledge Gaps
- **34 isolated node(s):** `1. New Project Setup (One-Time)`, `Key Metrics`, `Hero Tagline`, `About Me (Long Bio)`, `1. GLIA — High-Throughput Event OS & PWA (IAN-2025)` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 56 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `3. Projects Catalog (Ordered for Showcase)` connect `3. Projects Catalog (Ordered for Showcase)` to `Aditya Manoj — Master Portfolio Data Package`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `Aditya Manoj — Master Portfolio Data Package` connect `Aditya Manoj — Master Portfolio Data Package` to `3. Projects Catalog (Ordered for Showcase)`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `1. New Project Setup (One-Time)`, `Key Metrics`, `Hero Tagline` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `3. Projects Catalog (Ordered for Showcase)` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._