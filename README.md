# Pakamew

## Development

Environment:

- Preferred Runtime: `NodeJS v22`
- Preferred Package Manager: `pnpm v10`

After cloning the repository, run the following commands to initialize the repo.

```bash
pnpm install		# install project dependencies and prepares git hooks
```

Create local environment files for both apps:

```bash
cp ./server/.env.example ./server/.env
cp ./web/.env.example ./web/.env
```

Start external dependency services with docker-compose:

```bash
docker compose up -d
```

Generate Prisma client and apply schema changes to the local database:

```bash
cd ./server
pnpm exec prisma generate
pnpm exec prisma migrate dev
```

The following is a list of the primary scripts for the project.

```bash
# Global Scripts
pnpm run eslint				# lint with ESLint
pnpm run eslint:fix			# fix lint errors with ESLint
pnpm run prettier			# check formatting with Prettier
pnpm run prettier:write		# format with Prettier
pnpm run tsc:check			# typecheck with Typescript
pnpm run tsgo:check			# typecheck with native Typescript (experimental / faster)
pnpm run test				# run vitest

# Server App
cd ./server
pnpm run dev		# start development server
pnpm run build		# bundle server for production
pnpm run preview	# preview server for prod

# Web App
cd ./web
pnpm run dev		# start development server
pnpm run build		# build web app
pnpm run preview	# preview web for prod
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information

## Tooling

This project uses the following tools to enforce consistent coding conventions, formatting, and automated workflows:

### Formatting & Linting

- [Prettier](https://prettier.io/): Enforces consistent code formatting.
- [ESLint](https://eslint.org/): Enforces best practices on coding conventions.
- [Typescript](http://typescriptlang.org/): Provides static typing and checks.
- [CommitLint](https://commitlint.js.org/): Standardizes commit messages based on [Conventional Commits](https://www.conventionalcommits.org/).

### Automation

- [Github Actions](https://github.com/features/actions): Automates CI workflows, including formatting, linting, & typechecking.

## Contributors

In alphabetical order:

- [Geila Rigayen](https://github.com/geilala) (**@geilala**)
- [Janille Maeh Benito](https://github.com/LoisDub) (**@LoisDub**)
- [Lois Concepcion](https://github.com/LoisDub) (**@LoisDub**)
- [Theone Eclarin](https://github.com/daawaan4x) (**@daawaan4x**)
