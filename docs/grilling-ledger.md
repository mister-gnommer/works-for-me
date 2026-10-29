## Grilling ledger

Decision record from the planning interview.

- ✅ = final answer explicitly chosen by the user.
- ◐ = final outcome derived from a conditional answer or accepted follow-up.
- ↪ = an earlier answer that was later corrected or superseded.

### Round 0 — Decisions made before grilling

#### Q1 — Stack

- A — Vite + React + TypeScript (web)
- ✅ **B — Expo (React Native) + TypeScript.**

#### Q2 — Claude rules and skills in the public repo

- ✅ **A — Keep them public.**
- B — Remove before submitting

#### Q3 — First-run scope

- ✅ **A — Written requirements only (list, details, favourites); mockup extras go to README "Deferred".**
- B — Requirements plus a Favourites tab

#### Q4 — Routing

- ✅ **A — Expo Router.**
- B — React Navigation

#### Q5 — Favourites persistence

- A — In memory
- ✅ **B — AsyncStorage.**

#### Q6 — Data fetching

- ✅ **A — Plain `fetch`.**
- B — TanStack Query

#### Q7 — Pagination

- A — First page only
- ✅ **B — Page arrows `‹` / `›`, plus `«` back to page 1 from page 2 on; infinite scroll deferred.**

#### Q8 — Screen recording

- ✅ **A — User records on a phone with Expo Go.**
- B — Expo Web screenshots via Playwright

#### Q9 — Tests

- ✅ **A — Jest: API response parsing and the favourites toggle; no UI tests.**

### Round 1 — Project setup

#### Q1 — Where the app lives

- ✅ **A — Repo root (`package.json`, `app/`, `src/` at top level).**
- B — Subfolder such as `mobile/`

#### Q2 — Scaffold

- ✅ **A — `create-expo-app --template blank-typescript`, then add `expo-router`.**
- B — Default template, delete examples

#### Q3 — Code layout

- A — Flat: `app/` routes + `src/{api,favourites,format}.ts(x)`
- ✅ **B — Feature folders (`src/features/jobs/{api,components,hooks}/…`).**

#### Q4 — Value formatting

- ↪ Open — user asked for an example response and where CHF comes from; superseded by Round 2 (Q7, Q9).

#### Q5 — Lint and format

- ✅ **A — Expo ESLint (`npx expo lint`) + Prettier defaults.**
- B — ESLint only
- C — None

#### Q6 — Commits during the build

- ✅ **A — Commit and push to `main` after each To Do item, without asking.**
- B — One commit at the end
- C — Ask before each commit

### Round 2 — Labels and formatting

Asked as Q1–Q5; recorded here as Q7–Q11. From now on numbering is incremental across rounds.

#### Q7 — Which code labels to show

- A — Currency, country, job profile (skip educational level)
- ✅ **B — All four: currency, country, job profile, educational level (from Coople lookup endpoints).**
- C — Hardcode CHF / Switzerland only

#### Q8 — Label language

- ✅ **A — English (`Accept-Language: en`).**
- B — German (API default)
- C — Device language

#### Q9 — Time zone for dates

- Open — user's goal: a shift starting at 09:00 Swiss time shows as 07:00 for a user two hours behind. Re-asked as Q12.

#### Q10 — Work duration

- ✅ **A — Show in hours (total across shifts), with a code comment that the minutes unit was established from examples, not official docs.**
- B — Leave it off

#### Q11 — `tmp/` in git

- ✅ **A — Gitignore `tmp/`.**
- B — Commit the samples

#### Follow-up — README

- ◐ **Add a "Technical decisions" section: label language, lookup endpoints and how they were found and checked, `workDuration` unit, observed error codes.**

### Round 3 — Dates and doc commits

#### Q12 — Time zone for dates

- A — Always Swiss time (`Europe/Zurich`)
- ✅ **B — Phone's time zone, `yyyy-MM-dd HH:mm`.**

#### Q13 — Committing planning docs

- ✅ **A — Commit and push the ledger and README after every grilling round.**
- B — Once, when grilling ends
- C — Ask each time
