# Contributing Guidelines

## Environment Variables

- Always access environment variables through the typed `env.ts` modules.
- Do not access environment variables directly from `process.env` or `import.meta.env` in app code (except inside the `env.ts` modules themselves).

### Usage

- **Server/Node code**: use `getEnv(...)` from `server/src/env.ts` and request only the keys needed by that file.

```ts
import { getEnv } from "./env";

const env = getEnv((shape) => ({ HOST: shape.HOST, PORT: shape.PORT }));
```

- **Web server-side config** (for example `web/vite.config.ts`): use `getEnv(...)` from `web/src/env.server.ts`.

```ts
import { getEnv } from "./src/env.server";

const env = getEnv((shape) => ({ HOST: shape.HOST, PORT: shape.PORT }));
```

- **Web client code**: use the parsed `env` object from `web/src/env.ts`.

```ts
import { env } from "../env";

const apiUrl = env.VITE_API_URL;
```

### Adding New Variables

- Add the variable to the appropriate interface/schema in `env.ts` (and `env.server.ts` when needed).
- Add the variable to the corresponding `.env.example`.
- Consume the variable through `getEnv(...)` or `env`, depending on runtime.

## File Naming

- Use `kebab-case` for file names.

## Schema Naming

- Entity schemas must use PascalCase and end with `Schema`.
- Use the format `<EntityName>Schema` (for example, `UserSchema`, `ProjectMemberSchema`).
- Do not use camelCase entity schema names (for example, avoid `userSchema`).
- Utility schemas are not treated as entity schemas; name them by purpose.
