# krudi.io

Personal portfolio website — Next.js 16, React 19, GraphQL Apollo Client, Tailwind CSS.

@AGENTS.md

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
