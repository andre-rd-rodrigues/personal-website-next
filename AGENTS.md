# AGENTS.md

## Dev environment tips
- Use `pnpm install` to install dependencies.
- Run `pnpm dev` to start the development server.
- Check the `name` field in `package.json` to confirm the project name: `andre-website`.
- Node.js version requirement: `>=22`, pnpm version requirement: `>=9`.

## Testing instructions
- Find the CI plan in the `.github/workflows/ci.yml` file.
- Run `pnpm lint` to check ESLint rules.
- Run `pnpm lint:fix` to auto-fix linting issues.
- Run `pnpm lint:strict` to lint all files: `next lint '*/**/*.{js,jsx,ts,tsx}'`.
- Run `pnpm prettier` to format code with Prettier.
- Run `pnpm type-check` to verify TypeScript types without emitting files.
- Fix any lint or type errors until everything passes.
- After moving files or changing imports, run `pnpm lint` and `pnpm type-check` to ensure everything still works.
- Run `pnpm build` to ensure the project builds successfully.

## PR instructions
- Title format: `[personal-website] <Title>` or `[andre-website] <Title>`.
- Always run `pnpm lint`, `pnpm prettier`, and `pnpm type-check` before committing.
- The project uses Husky with lint-staged, which will automatically run ESLint, Prettier, and TypeScript checks on pre-commit.
- Ensure the build passes: `pnpm build` before pushing.
- The commit should pass all CI checks (ESLint, Prettier, TypeScript, Build) before you merge.
