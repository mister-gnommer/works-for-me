# Dev notes

Background for reviewers. Every decision and the options behind it are recorded in [grilling-ledger.md](grilling-ledger.md).

## Technical decisions

- **Label language: English.** Lookups are requested with `Accept-Language: en`. Job texts (title, requirements, clothing) are written by employers, mostly in German, and are shown as they come.
- **Code labels come from undocumented lookup endpoints.** The job API returns numeric codes only. Coople publishes no API docs (`/v2/api-docs` needs auth), but its public job page (`https://www.coople.com/ch/jobs/<workAssignmentId>`) embeds the responses of the calls it makes. That is where these endpoints were found (base `https://www.coople.com/ch/resources/api/common`):

  | Code | Endpoint | Example |
  |---|---|---|
  | `currencyId` | `/value-lists/Currency` | 1 = CHF |
  | `countryId` | `/value-lists/Country` | 1 = Switzerland |
  | `jobProfileId` | `/job-profiles` | 70 = Chef/Cook |
  | `educationalLevelId` | `/value-lists/EducationalLevel` | 3 = Skilled |

  The labels were checked against what the job page shows for the same job (`CHF 32.00 p/h`, and the German `Koch/Köchin` and `Gelernt`). Each list is fetched once and kept in memory. If a lookup fails, the label is left out (a price shows without its currency) and the screen still works. Education level names repeat across ids, so ids stay the key.
- **`workDuration` is in minutes, established from examples rather than docs.** On six sampled jobs, `salary / hourlyWage × 60` equals `workDuration` exactly (for example 400 / 32 × 60 = 750). For multi-shift jobs, both `salary` and `workDuration` are totals across all shifts.
- **Dates show in the phone's time zone** as `yyyy-MM-dd HH:mm`. The API sends exact moments (Unix ms), so a shift starting 09:00 in Zürich shows as 07:00 on a phone two hours behind.
- **Error codes were observed, not documented.** An unknown job id returns `404`, a malformed one `401`.
- **Requests time out after 15 seconds.** React Native's `fetch` has no timeout of its own, so without one a stalled connection would show a spinner forever instead of the retry screen.

## To Do

- [x] Create the Expo + TypeScript app with Expo Router (exact dependency versions).
- [x] API client: list (page number, 30 per page) and details. Treat non-OK responses (`404` for an unknown id, `401` for a malformed one) and `error: true` bodies as errors.
- [x] Job list screen: name, city, hourly wage, start date, favourite star; loading, error-with-retry and empty states.
- [x] Pagination: `‹` / `›` arrows, `«` back to page 1 from page 2 on; disable `›` on the last page (from `total`).
- [x] Lookups (English): currency, country, job profile, educational level; fetched once, raw value on failure.
- [x] Job details screen at `/job/[id]`: job profile, educational level, wage, total pay, dates, shifts, work duration (with a code comment that the unit is derived from examples), location and country, requirements, clothing; favourite toggle; loading, error-with-retry and not-found states.
- [x] Favourites: context and AsyncStorage, shared by both screens.
- [x] Tests: API response parsing and the favourites toggle.
- [x] Update Setup and Architecture in [README.md](../README.md) to match the code.
- [ ] Record the app with Expo Go on a phone.

## Deferred

Built only if time allows. Most of these come from the example mockup, not the written requirements.

- Search bar over the job list.
- Filter chips (for example Remote, Full-time, Engineering). The API has no matching fields.
- Bottom tabs: Jobs, Favourites, Profile.
- Company name and initials badge on job cards, and salary ranges. The API returns neither.
- Infinite scroll instead of page arrows.
- Response caching and background refetch (for example TanStack Query).
- Retry label lookups when the job list reloads. Today a list that started offline shows prices without "CHF" until restart (from code review).
- Web build. The API sends no CORS headers, so the web build would need a proxy.
