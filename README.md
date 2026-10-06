# Geriatric Care Assessment Form

One-page form for a visiting nurse to record a geriatric care assessment at a patient's home. Built with React 19, TypeScript, Mantine, and Zod. All sample data is invented — no real patient identifiers.

## Deployed app

Not deployed. Run locally with `yarn dev`, or deploy yourself to any static host (for example Vercel) after `yarn build`.

## Setup

Requires Yarn 4 (see `packageManager` in `package.json`).

```bash
yarn install
yarn dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Scripts

| Command | What it runs |
|---------|----------------|
| `yarn dev` | Local development server |
| `yarn test` | Format/lint/typecheck, stylelint, Vitest, and production build |
| `yarn vitest` | Vitest only |
| `yarn build` | Production build |
| `yarn preview` | Preview the production build |

## What is included

- 10 assessment fields with `@mantine/form` + Zod (`zod4Resolver`)
- Validation on blur and submit; errors under each field
- Fake save (~800ms) with loading button, then a success alert showing parsed values
- "Load sample patient" fixture
- Two Vitest tests: age boundary on the schema, and form submit with parsed values

## Time spent

Roughly 2–3 hours of focused work (template setup, form wiring, typing gap for empty values, tests, and submit polish).

## Unfinished / notes

- No live deploy URL (deploy skipped by choice).
- Template Welcome/Storybook leftovers remain in the repo but are unused by the app entry.
- Empty initial values are cast once to `AssessmentInput` because Zod's input type still expects numbers/enums/literals before parse — not a second hand-written domain interface.

## Sample data

Fixtures use invented names and MRNs only (for example `MRN-004821`, `Sushila Deshpande`). Do not replace them with real clinical data.
