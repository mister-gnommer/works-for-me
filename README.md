# Works For Me

Works For Me is a mobile app for browsing the public jobs listed on Coople. Open a job to see everything about it, and star the ones you like so you can find them later.

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
- **Error states**: every screen shows loading, error-with-retry and empty states; any non-OK response counts as an error.
- **Favourites** are a set of job ids in a React context, saved to AsyncStorage.
- **Tests** (Jest) cover parsing API responses into data or errors, and toggling favourites. There are no UI tests.

Technical decisions, the build plan and deferred ideas are in [DEV_NOTES.md](DEV_NOTES.md).
