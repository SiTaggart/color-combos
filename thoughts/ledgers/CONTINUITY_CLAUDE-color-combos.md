# Session: color-combos
Updated: 2025-12-26T20:54:00Z

## Goal
Maintain and fix bugs in color-combos - a TypeScript npm package that calculates color contrast ratios and WCAG accessibility ratings. Keep the package modern, well-tested, and dependency-free of major issues.

## Constraints
- **Tech Stack**: TypeScript (ESNext, strict mode)
- **Framework**: Bun (native bundler and test runner)
- **Build**: Dual package (ESM + CJS) via `bun run build`
  - ESM: `dist/index.mjs`
  - CJS: `dist/index.js`
  - Types: `dist/index.d.ts` (via oxc-transform)
- **Test**: `bun test` (unit tests in `src/_test_/`), `bun run test:integration` (integration tests in `_test_/integration/`)
- **Lint/Format**: Biome (`bun run lint`, `bun run format:fix`)
- **Size Limit**: Must stay under 11kB (enforced by size-limit)
- **Release**: Automated via semantic-release on `main` branch
- **Node Version**: 24.12.0
- **Patterns**:
  - Single source file architecture (`src/index.ts`)
  - ESM-first with CJS fallback
  - Tree-shakeable (side-effect free)
  - Comprehensive integration tests for both builds

## Key Decisions
(None yet - will be populated as decisions are made)

## State
- Now: [→] Initial exploration - ledger created
- Next: Await user input on specific bugs or maintenance tasks

## Working Set
- **Key files**:
  - `src/index.ts` (main library code)
  - `src/_test_/index.spec.ts` (unit tests)
  - `_test_/integration/` (integration tests for CJS/ESM/types/node-compat)
  - `build.ts` (custom build script using Bun + oxc-transform)
  - `.github/workflows/` (CI/CD: checks.yml, publish.yml, claude.yml)
- **Test command**: `bun test` (unit), `bun run test:integration` (integration), `bun run test:all` (both + build)
- **Build command**: `bun run build` (production), `bun run build:dev` (with source maps)
- **Dev command**: N/A (library package, no dev server)
- **Current branch**: main
- **Modified files**: .gitignore (added .claude/cache/ to ignore list)

## Open Questions
- UNCONFIRMED: What specific bugs or maintenance tasks need attention?
- UNCONFIRMED: Are there any known issues from GitHub issues or recent commits that need fixing?

## Codebase Summary
color-combos is a focused TypeScript library (~160 LOC) that takes color inputs (array or object) and calculates contrast ratios between all combinations. Main function returns accessibility ratings (AA, AAA, Large text variants) based on WCAG standards. Uses the `color` library for parsing and `lodash.uniq` for deduplication. Modern dual-package setup with Bun for building (ESM + CJS) and comprehensive integration tests ensuring both builds work correctly. CI/CD via GitHub Actions with semantic-release for automated publishing. Recent commits show active dependency maintenance via Renovate.

## Agent Reports

### onboard (2025-12-27T05:12:32.084Z)
- Task: 
- Summary: 
- Output: `.claude/cache/agents/onboard/latest-output.md`

### onboard (2025-12-27T05:10:24.519Z)
- Task: 
- Summary: 
- Output: `.claude/cache/agents/onboard/latest-output.md`

### onboard (2025-12-27T05:10:02.553Z)
- Task: 
- Summary: 
- Output: `.claude/cache/agents/onboard/latest-output.md`

