# krudi.io

Personal portfolio website. Showcases projects, experiments, and a blog. Uses GraphQL + Apollo Client for content queries.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS
- GraphQL with Apollo Client

---

## Onboarding

**Prerequisites:** Node.js ≥ 20, access to the GraphQL CMS endpoint.

1. `cp env-example .env.local` and fill in GraphQL endpoint
2. `npm install`
3. `npm run dev` — start Next.js on `localhost:3000`
4. Verify: open `http://localhost:3000`, confirm content loads from GraphQL

---

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build
npm run lint       # eslint + prettier + stylelint
npm run typecheck  # tsc --noEmit
```

---

## Project structure

```
app/              # App Router pages
components/       # UI components
lib/
  graphql/        # Apollo client setup, queries, fragments
public/           # static assets
```

---

## Architecture

```
Next.js (App Router, :3000)
  └── Apollo Client → GraphQL CMS (content: projects, blog posts)
```

**Key design decisions:**
- GraphQL queries are co-located with the component that uses them
- Apollo Client handles caching — avoid redundant fetch calls
- No database — content is entirely managed via the GraphQL CMS

---

## Testing

- Run before every PR: `npm run lint && npm run typecheck && npm run build`
- Check that new pages render correctly and GraphQL queries return expected shapes

---

## Cross-project context

- **Shares config:** `@krudi/eslint-config`, `@krudi/typescript-config`, `@krudi/prettier-config`, `@krudi/stylelint-config` from `shared-configs`

---

## Rules

@.ai/rules/nextjs.md

---

## For Claude Code

### Slash commands

| Command | What it does |
|---------|---|
| `/test` | Run lint, typecheck, and build |

### Rules loaded automatically

| Rule file | Applied to |
|-----------|---|
| `.ai/rules/nextjs.md` | `**/*.tsx`, `**/*.ts` |

### Constraints

- All content comes from GraphQL — no local data files or hardcoded content
- GraphQL queries live in `lib/graphql/` — co-locate fragments with the queries that use them
- No database, no auth — this is a static-content site
