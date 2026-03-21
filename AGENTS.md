# Agent Instructions

## Tooling

Prefer native tooling only if it exists, including but not limited to:

- `pnpm tsgo:check` over `pnpm tsc:check`

Run checks only after a change set that can affect TypeScript or ESLint outcomes, and resolve any errors encountered.

- Run codebase-wide typechecking (`pnpm tsgo:check`) when modified files include executable source, typed interfaces/contracts, or TypeScript/tooling config (`*.ts`, `*.tsx`, `*.js`, `*.jsx`, `tsconfig*`, eslint config, build/lint config that affects parser/rules).
- Run file-scoped linting (`pnpm eslint <changed-files>`) when modified files are linted source/config files.
- Skip both checks for non-code-only changes that cannot affect TS/ESLint results (e.g., docs/markdown-only edits, image/static asset swaps, pure copy/text updates in non-executable content files).

## Contributing

Follow `CONTRIBUTING.md` when writing or editing code.

## Skills

For frontend-related tasks (UI, UX, styling, layouts, components, pages, accessibility, or frontend architecture), load relevant skills from `.agents/skills` before proceeding.

### Frontend Skill Routing

Skills marked with (!) are crucial for substantive frontend engineering work and must be included when the task changes UI behavior, architecture, component contracts, state/data flow, styling/layout, accessibility, or performance characteristics.

- (!) `vercel-react-best-practices` - Use this skill when writing, reviewing, or refactoring React/Next.js code to enforce performance best practices.
- (!) `web-design-guidelines` - Use this skill when reviewing UI quality, accessibility, and UX against web interface best practices.
- (!) `vercel-composition-patterns` - Use this skill when component APIs are getting complex (boolean prop proliferation, compound components, context architecture).

Condition-based skill inclusion (mandatory when condition matches):

- `shadcn` - Include this skill whenever constructing, implementing, or modifying any UI (components, pages, layouts, styling, states), and whenever the task touches shadcn/ui, `components.json`, registries, presets, or shadcn component composition. Treat this as required for UI implementation work.
- `frontend-design` - Include this skill when the task focuses on aesthetic/styling work for visual pages or components, including landing pages, marketing sections, visual polish, branding treatment, or beautifying UI.
- `interface-design` - Include this skill when the task focuses on product/app interface styling and UX patterns, including dashboards, admin panels, SaaS screens, tools, workflows, and data-dense application surfaces. Do not use this as the primary design skill for marketing/landing aesthetics.

Trivial frontend edits do not require loading the always-include skills. Trivial edits include:

- copy/text-only updates that do not change UI structure/behavior,
- comment-only changes,
- formatting-only changes,
- mechanical renames/refactors with no behavioral, API, or architectural impact.

Frontend workflow expectation:

1. Determine whether the task is substantive frontend engineering or a trivial frontend edit.
2. For substantive frontend work, load the always-include skills first.
3. Apply condition-based routing and include every skill whose condition matches.
4. For UI implementation tasks, always include `shadcn` in addition to any matching design skill(s).
5. If a task spans both visual marketing aesthetics and app-interface concerns, include both `frontend-design` and `interface-design`.
