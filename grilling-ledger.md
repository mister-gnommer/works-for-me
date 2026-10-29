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
