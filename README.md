# Geriatric Care Assessment Form

One-page form that a visiting nurse fills in when checking on an elderly patient at home.
Built with **React 19 + TypeScript + Mantine 9 + Zod 4**, using `@mantine/form` for state and
`zod4Resolver` for schema validation. All sample data is invented — no real patient identifiers.

## Deployed app

**URL:** https://geriatric-assessment-form-gamma.vercel.app/

## How to run

Requires Node 20+ and Yarn 4 (see `packageManager` in `package.json`).

```bash
yarn install
yarn dev        # http://localhost:5173
```

Production build and preview:

```bash
yarn build      # typecheck + production bundle in dist/
yarn preview
```

## Scripts

| Command | What it runs |
|---------|--------------|
| `yarn dev` | Local development server |
| `yarn test` | Format check, lint, stylelint, typecheck, Vitest, production build |
| `yarn vitest` | Vitest only |
| `yarn build` | Typecheck + production build |
| `yarn check` / `yarn check:fix` | Format + lint check / auto-fix |

## What is included

- All 10 fields from the spec, inside a `Paper` in a `Container` with a heading — TextInput,
  DateInput, Select, NumberInput, Checkbox.
- "Load sample patient" button fills the form with the valid fixture from `src/features/assessment/fixtures.ts`.
- Validation on blur and on submit; untouched fields stay quiet; errors render under each field
  via Mantine's built-in error slots (no alerts, no error summary).
- On a valid submit the button shows a loading state for ~800 ms (fake save), then a success
  `Alert` renders the **parsed** values (what Zod returned) in a `Code` block.
- Empty form shows exactly 9 errors — one per required field, no cross-field noise (the three
  `.refine()` rules are guarded, as in the given schema).

## How validation is wired

- The schema lives in `src/features/assessment/schema.ts` exactly as given (Zod 4 syntax:
  `{ error: '…' }`, `z.iso.date()`). Types come from `z.infer` / `z.input` — no hand-written
  duplicate interface.
- Validation goes through `zod4Resolver(assessmentSchema)` from `mantine-form-zod-resolver`
  (the `zodResolver` built into `@mantine/form` only supports Zod 3). No rules are re-implemented
  in any component file.
- The form uses Mantine's **uncontrolled mode** (`mode: 'uncontrolled'` + `form.key()`), which is
  the recommended pattern in Mantine 8+.
- `transformValues` runs `assessmentSchema.parse`, so the save handler and the success Alert
  receive Zod's parsed output, not the raw string form state.
- `clampBehavior="none"` on both `NumberInput`s: a typed value is **never silently clamped** to
  min/max. Typing 105 in Barthel Index keeps 105 and Zod rejects it with the field error —
  the steppers and arrow keys still respect min/max.
- Select options are derived from the exported `MOBILITY` array, so adding a value to the array
  makes it appear in the dropdown with no other edit.

## Tests

Two tests, per the spec (`yarn vitest` to run):

1. **Schema** (`schema.test.ts`) — `safeParse` boundary: date of birth exactly 60 years before
   the assessment date is accepted; one day short is rejected with the age error on `dateOfBirth`.
2. **Form, rendered** (`AssessmentForm.test.tsx`) — loads the sample patient, submits, and asserts
   the save handler was called with the parsed values.

## Project structure

```
src/features/assessment/
├── schema.ts                       # Zod 4 schema (given by the assignment) + types
├── fixtures.ts                     # invented valid sample patient
└── components/
    ├── AssessmentForm.tsx          # the one-page form
    └── AssessmentForm.test.tsx     # rendered form test
```

## Unfinished / notes

- Empty initial values are cast once to `AssessmentInput` (`as unknown as AssessmentInput`):
  Zod's *input* type still expects numbers/enums/literals before parsing, so empty strings don't
  satisfy it. This is the single typing gap the assignment calls out; the resolver and
  `transformValues` produce the real `Assessment` output. No second hand-written interface exists.

