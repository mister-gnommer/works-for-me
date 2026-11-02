import { renderRouter } from "expo-router/testing-library";

/**
 * Renders the real app (root layout and every route in `app/`) as if opened at `initialUrl`.
 * Tests render only through this helper, so a change of providers touches no test body.
 * @param initialUrl the route to open, like a deep link
 */
export function renderApp(initialUrl = "/") {
  return renderRouter("./app", { initialUrl });
}
