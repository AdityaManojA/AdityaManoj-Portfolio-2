# Graph Report - my-portfolio  (2026-09-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 155 nodes · 227 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0af59a6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- App.tsx
- index.ts
- compilerOptions
- compilerOptions
- devDependencies
- HandbookModal.tsx
- scripts
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `compilerOptions` - 18 edges
3. `react` - 10 edges
4. `ScrollReveal()` - 9 edges
5. `SOCIAL_LINKS` - 5 edges
6. `scripts` - 5 edges
7. `IMAGES` - 4 edges
8. `Project` - 3 edges
9. `ProjectCard()` - 3 edges
10. `SKILLS_DATA` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ProjectCardProps` --references--> `Project`  [EXTRACTED]
  src/components/ProjectCard.tsx → src/data/index.ts

## Import Cycles
- None detected.

## Communities (11 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (24): dependencies, react, react-dom, name, private, type, version, autoprefixer (+16 more)

### Community 1 - "App.tsx"
Cohesion: 0.14
Nodes (17): react, App(), About(), Gallery(), Header(), HeaderProps, ScrollReveal(), ScrollRevealProps (+9 more)

### Community 2 - "index.ts"
Cohesion: 0.16
Nodes (15): Contact(), DarkModeToggle(), DetailedFooter(), SimpleFooter(), Hero(), HeroProps, ProjectCard(), ProjectCardProps (+7 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 5 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, autoprefixer, baseline-browser-mapping, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+9 more)

### Community 6 - "HandbookModal.tsx"
Cohesion: 0.33
Nodes (7): HandbookModal(), HandbookModalProps, HANDBOOK_FOUNDATIONS, HANDBOOK_META, HANDBOOK_QUESTIONS, HandbookQuestion, HandbookSection

### Community 7 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

## Knowledge Gaps
- **80 isolated node(s):** `HeaderProps`, `ScrollRevealProps`, `HeroProps`, `ProjectsProps`, `HandbookModalProps` (+75 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 85 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `package.json`, `index.ts`, `HandbookModal.tsx`?**
  _High betweenness centrality (0.240) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `HeaderProps`, `ScrollRevealProps`, `HeroProps` to the rest of the system?**
  _80 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09116809116809117 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13675213675213677 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._