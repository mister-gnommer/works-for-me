import { loadLookups } from "./lookups";

describe("loadLookups", () => {
  it("keeps working lists when one fails, and retries on the next call", async () => {
    const fetchMock = jest.fn((url: string) =>
      Promise.resolve(
        url.endsWith("/Country")
          ? new Response("", { status: 500 })
          : new Response(
              JSON.stringify({ data: [{ id: 1, name: " CHF" }], error: false }),
            ),
      ),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch; // Test double only implements the call shape getData uses.

    const lookups = await loadLookups();

    expect(lookups.currencies.get(1)).toBe("CHF");
    expect(lookups.countries.size).toBe(0);

    await loadLookups();
    expect(fetchMock).toHaveBeenCalledTimes(8);
  });
});
