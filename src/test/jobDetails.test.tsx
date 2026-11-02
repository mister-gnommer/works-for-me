import { screen, userEvent } from "@testing-library/react-native";
import { http } from "msw";

import { renderApp } from "./renderApp";
import { apiError, server } from "./server";

describe("job details (deep link)", () => {
  it("shows the job's pay, place and shift times", async () => {
    await renderApp("/job/job-1");

    expect(await screen.findByText("Waiter")).toBeOnTheScreen();
    expect(await screen.findByText("CHF 25.00/h")).toBeOnTheScreen();
    expect(screen.getByText("CHF 200.00")).toBeOnTheScreen();
    expect(
      screen.getByText("Bahnhofstrasse 1, 8001 Zürich, Switzerland"),
    ).toBeOnTheScreen();
    expect(screen.getByText("2026-11-05 08:00")).toBeOnTheScreen();
    expect(screen.getByText("2026-11-05 16:00")).toBeOnTheScreen();
  });

  it("offers a way to the list when the job doesn't exist", async () => {
    const user = userEvent.setup();

    const app = await renderApp("/job/missing");
    await user.press(await screen.findByRole("button", { name: "Go to jobs" }));

    expect(await screen.findByText("Waiter")).toBeOnTheScreen();
    expect(app.getPathname()).toBe("/");
  });

  it("recovers from a server error on retry", async () => {
    server.use(
      http.get("*/work-assignments/public-jobs/job-1", () => apiError(500), {
        once: true,
      }),
    );
    const user = userEvent.setup();

    await renderApp("/job/job-1");
    await user.press(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Waiter")).toBeOnTheScreen();
  });
});
