# Contributing Guidelines

## Environment Variables

- Always access environment variables through the typed `env.ts` modules.
- Do not access environment variables directly from `process.env` or `import.meta.env` in app code.
- If a new environment variable is needed, add it to the appropriate `env.ts` and consume it from there.

## File Naming

- Use `kebab-case` for file names.

## Schema Naming

- Entity schemas must use PascalCase and end with `Schema`.
- Use the format `<EntityName>Schema` (for example, `UserSchema`, `ProjectMemberSchema`).
- Do not use camelCase entity schema names (for example, avoid `userSchema`).
- Utility schemas are not treated as entity schemas; name them by purpose.
