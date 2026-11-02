import { screen, userEvent } from "@testing-library/react-native";
import { http } from "msw";

import { renderApp } from "./renderApp";
import { apiError, ok, server } from "./server";

const listUrl = "*/work-assignments/public-jobs/list";

describe("job list", () => {
  it("shows jobs with their wage in the looked-up currency", async () => {
    await renderApp();

    expect(await screen.findByText("Waiter")).toBeOnTheScreen();
    expect(
      await screen.findByText("8001 Zürich · CHF 25.00/h"),
    ).toBeOnTheScreen();
    expect(screen.getByText("Starts 2026-11-05 08:00")).toBeOnTheScreen();
  });

  it("says so when there are no jobs", async () => {
    server.use(http.get(listUrl, () => ok({ items: [], total: 0 })));

    await renderApp();

    expect(await screen.findByText("No jobs on this page.")).toBeOnTheScreen();
    expect(screen.getByText("Page 1 of 1")).toBeOnTheScreen();
  });

  it("recovers from a server error on retry", async () => {
    server.use(http.get(listUrl, () => apiError(500), { once: true }));
    const user = userEvent.setup();

    await renderApp();
    await user.press(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Waiter")).toBeOnTheScreen();
  });

  it("loads the next page", async () => {
    const user = userEvent.setup();

    await renderApp();
    await user.press(await screen.findByRole("button", { name: "Next page" }));

    expect(await screen.findByText("Barista")).toBeOnTheScreen();
    expect(screen.queryByText("Waiter")).not.toBeOnTheScreen();
    expect(screen.getByText("Page 2 of 2")).toBeOnTheScreen();
  });
});
