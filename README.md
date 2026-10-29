# Coople Jobs

Coople Jobs is a mobile app for browsing the public jobs listed on Coople. Open a job to see everything about it, and star the ones you like so you can find them later.

> Setup and architecture below describe the planned app and will be updated once it is built.

## Usage

- **Job list** shows 30 jobs per page. Use `›` / `‹` to go to the next or previous page, and `«` (shown from page 2 on) to jump back to page 1.
- **Job details** opens when you tap a job. You can also open it directly from a link to `/job/<workAssignmentId>`.
- **Favourites**: tap the star on a job in the list or on its details screen. Favourites are kept after the app restarts.

## Setup

Requirements: Node.js 22+ and the [Expo Go](https://expo.dev/go) app on your phone.

```bash
npm install
```

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

To open a job from a link in Expo Go (on a simulator), replace the address with the one `npx expo start` prints:

```bash
npx uri-scheme open "exp://127.0.0.1:8081/--/job/<workAssignmentId>" --ios
```

Run the tests:

```bash
npm test
```

## Architecture

- **Expo + TypeScript + Expo Router.** Routes are files: `app/index.tsx` is the job list and `app/job/[id].tsx` is the details screen, which also makes `/job/:id` work as a link.
- **Data** comes from Coople's public API through plain `fetch`, with no client library:
  - list: `GET https://www.coople.com/ch/resources/api/work-assignments/public-jobs/list?pageNum=<n>&pageSize=30`
  - details: `GET https://www.coople.com/ch/resources/api/work-assignments/public-jobs/<workAssignmentId>`
- **Error states**: every screen shows loading, error-with-retry and empty states. The details endpoint answers an unknown id with `401`, not `404`, so any non-OK response counts as an error.
- **Favourites** are a set of job ids in a React context, saved to AsyncStorage.
- **Tests** (Jest) cover parsing API responses into data or errors, and toggling favourites. There are no UI tests.

## To Do

- [ ] Create the Expo + TypeScript app with Expo Router (exact dependency versions).
- [ ] API client: list (page number, 30 per page) and details. Treat non-OK responses (including `401` for an unknown id) and `error: true` bodies as errors.
- [ ] Job list screen: name, city, hourly wage, start date, favourite star; loading, error-with-retry and empty states.
- [ ] Pagination: `‹` / `›` arrows, `«` back to page 1 from page 2 on; disable `›` on the last page (from `total`).
- [ ] Job details screen at `/job/[id]`: wage, total pay, dates, shifts, work duration, location, requirements, clothing; favourite toggle; loading, error-with-retry and not-found states.
- [ ] Favourites: context and AsyncStorage, shared by both screens.
- [ ] Tests: API response parsing and the favourites toggle.
- [ ] Update Setup and Architecture in this README to match the code.
- [ ] Record the app with Expo Go on a phone.

## Deferred

Built only if time allows. Most of these come from the example mockup, not the written requirements.

- Search bar over the job list.
- Filter chips (for example Remote, Full-time, Engineering). The API has no matching fields.
- Bottom tabs: Jobs, Favourites, Profile.
- Company name and initials badge on job cards, and salary ranges. The API returns neither.
- Infinite scroll instead of page arrows.
- Labels for numeric codes (`currencyId`, `jobProfileId`, `countryId`).
- Response caching and background refetch (for example TanStack Query).
- Web build. The API sends no CORS headers, so the web build would need a proxy.
