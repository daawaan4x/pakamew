# Technical Workarounds

This document centralizes temporary or implementation-specific workarounds used in the codebase.

## Vite Config Loader For Shared TS Source Imports

### Context

`@pakamew/shared` is consumed as TypeScript source (no build step), and its internal imports intentionally use extensionless relative specifiers (for example, `./resolver`).

### Symptom

Server `dev`/`build` can fail while loading `packages/app-server/vite.config.ts` with errors similar to:

- `Cannot find module .../packages/app-shared/utils/get-env/resolver`
- `failed to load config from packages/app-server/vite.config.ts`

### Root Cause

When Vite config is evaluated through Node's native ESM loader path, extensionless TypeScript relative imports in workspace-linked source packages may fail resolution.

### Current Workaround

Use Vite's runner config loader in `packages/app-server/package.json`:

- `dev`: `vite --configLoader runner`
- `build`: `vite build --configLoader runner`

### Impact

- Keeps `@pakamew/shared` import style consistent (no explicit `.ts` required internally).
- Avoids introducing a dedicated build step for `@pakamew/shared`.

### Revisit Conditions

Re-evaluate this workaround if:

- Vite/Node resolver behavior changes to reliably support this pattern, or
- the project adopts a different shared package distribution strategy (for example, prebuilt JS artifacts).

## createGetEnv overload disambiguation with explicit schema generic

### Context

`createGetEnv` supports a doc-aware overload that allows preserving field JSDoc from a source interface on selected env slices.

### Symptom

Calling `createGetEnv<Env>(EnvSchema)` can fail with a type error saying `Env` does not satisfy the schema constraint.

### Root Cause

`createGetEnv` has two schema-bound overloads:

- one where the first generic is `EnvDocShape`, and
- one where the first generic is `Schema`.

When only one generic argument is supplied, TypeScript can match it to the schema-only overload and interpret `Env` as `Schema`.

### Current Workaround

When passing a doc shape explicitly, also pass the schema generic explicitly:

- `createGetEnv<Env, typeof EnvSchema>(EnvSchema)`

This forces TypeScript to select the doc-aware overload.

### Impact

- Preserves field-level JSDoc from env interfaces on `getEnv(...)` outputs.
- Keeps existing runtime behavior unchanged (type-only workaround).

### Revisit Conditions

Re-evaluate this workaround if:

- the `createGetEnv` API is redesigned to avoid ambiguous generic positions, or
- newer TypeScript versions improve overload/generic inference in this pattern.
