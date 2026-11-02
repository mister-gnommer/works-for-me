import { screen, userEvent } from "@testing-library/react-native";

import { renderApp } from "./renderApp";

describe("favourites", () => {
  it("keeps a job starred on the list after a restart and on its details", async () => {
    const user = userEvent.setup();

    await renderApp();
    await user.press(
      await screen.findByRole("button", { name: "Add to favourites" }),
    );
    expect(
      screen.getByRole("button", { name: "Remove from favourites" }),
    ).toBeOnTheScreen();

    await screen.unmount();
    await renderApp();
    expect(
      await screen.findByRole("button", { name: "Remove from favourites" }),
    ).toBeOnTheScreen();

    await screen.unmount();
    await renderApp("/job/job-1");
    expect(
      await screen.findByRole("button", { name: "Remove from favourites" }),
    ).toBeOnTheScreen();
  });
});
