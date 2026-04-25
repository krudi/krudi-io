Run the full quality check for krudi-io:

1. `npm run lint` — ESLint + Prettier + Stylelint
2. `npm run typecheck` — TypeScript strict check
3. `npm run build` — production build (verifies GraphQL query types and page rendering)
4. Report all failures with file:line references
5. If all pass, confirm with a one-line summary
