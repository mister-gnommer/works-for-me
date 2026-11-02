import { fetchLabels } from "./lookups";

describe("fetchLabels", () => {
  it("maps ids to trimmed names", async () => {
    globalThis.fetch = () =>
      Promise.resolve(
        new Response(
          JSON.stringify({ data: [{ id: 1, name: " CHF" }], error: false }),
        ),
      );

    const labels = await fetchLabels("/common/value-lists/Currency");

    expect(labels.get(1)).toBe("CHF");
  });
});
