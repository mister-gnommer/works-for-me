import { ApiError, getData, isNotFound } from "./coople";

/** Makes the next fetch call resolve with the given status and JSON body. */
function mockFetch(status: number, body: unknown) {
  globalThis.fetch = jest
    .fn()
    .mockResolvedValue(new Response(JSON.stringify(body), { status }));
}

describe("getData", () => {
  it("unwraps data from a successful envelope", async () => {
    mockFetch(200, { status: 200, data: { total: 3 }, error: false });

    await expect(getData("/x")).resolves.toEqual({ total: 3 });
  });

  it("rejects with the HTTP status when the response is not OK", async () => {
    mockFetch(404, { status: 404, errorCode: "Object_not_found", error: true });

    const error = await getData("/x").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(isNotFound(error)).toBe(true);
  });

  it("rejects a 200 response whose body reports an error", async () => {
    mockFetch(200, { status: 200, errorCode: "Boom", error: true });

    await expect(getData("/x")).rejects.toThrow("Boom");
  });
});

describe("isNotFound", () => {
  it("treats 401 (malformed id) as not found but not other failures", () => {
    expect(isNotFound(new ApiError("", 401))).toBe(true);
    expect(isNotFound(new ApiError("", 500))).toBe(false);
    expect(isNotFound(new TypeError("Network request failed"))).toBe(false);
  });
});
