import { renderRouter } from "expo-router/testing-library";

import { queryClient } from "../api/queryClient";

/**
 * Renders the real app (root layout and every route in `app/`) as if freshly launched at `initialUrl`.
 * Tests render only through this helper, so a change of providers touches no test body.
 * @param initialUrl the route to open, like a deep link
 */
export function renderApp(initialUrl = "/") {
  // An empty cache per render keeps tests independent; retries would hide the error screens.
  queryClient.clear();
  queryClient.setDefaultOptions({
    queries: { ...queryClient.getDefaultOptions().queries, retry: false },
  });
  return renderRouter("./app", { initialUrl });
}
