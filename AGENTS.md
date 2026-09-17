# krudi.io

Personal portfolio website. Showcases projects and GitHub activity. Fetches stats directly from GitHub's public GraphQL
API via a plain `fetch()` wrapper — no CMS, no Apollo Client.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Hand-rolled CSS (native `@layer` cascade under `src/styles/`) — no Tailwind

---

## Onboarding

**Prerequisites:** Node.js ≥ 24.19.0, a GitHub personal access token (`GITHUB_ACCESS_TOKEN`).

1. `cp .env.example .env.local` and fill in `GITHUB_ACCESS_TOKEN` / `GITHUB_USERNAME`
2. `npm install`
3. `npm run dev` — start Next.js on `localhost:3000`
4. Verify: open `http://localhost:3000`, confirm GitHub activity/projects load

---

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build
npm run lint       # oxlint + oxfmt --check
npm run typecheck  # tsc --noEmit
```

---

## Project structure

```
src/app/                          # App Router pages
src/components/                   # shared UI components
src/features/github-stats/        # GitHub activity/projects feature (components, lib, queries)
src/styles/                       # hand-rolled CSS cascade (theme, base, layout, html, elements, components, utilities)
public/                           # static assets
```

---

## Architecture

```
Next.js (App Router, :3000)
  └── fetchGitHubGraphQL() → GitHub's own public GraphQL API (activity, pinned repos, stars)
```

**Key design decisions:**

- GraphQL queries are co-located with the feature that uses them (`src/features/github-stats/lib/queries/`)
- No database, no CMS — content is either static (this site's own copy) or fetched live from GitHub

---

## Testing

- Run before every PR: `npm run lint && npm run typecheck && npm run build`
- Check that new pages render correctly and GitHub queries return expected shapes

---

## Rules

@.ai/rules/nextjs.md @.ai/memory/lessons.md @.ai/skills/commit/SKILL.md @.ai/skills/pr/SKILL.md
@.ai/skills/retrospective/SKILL.md @.ai/skills/test/SKILL.md

## Constraints

- No database, no auth — this is a static-content site with one live data source (GitHub's API)
