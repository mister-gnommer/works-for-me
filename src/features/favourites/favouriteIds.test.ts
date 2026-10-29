import { parseIds, serializeIds, toggleId } from "./favouriteIds";

describe("toggleId", () => {
  it("adds a new id and removes an existing one without mutating the input", () => {
    const ids = new Set(["a"]);

    expect([...toggleId(ids, "b")]).toEqual(["a", "b"]);
    expect([...toggleId(ids, "a")]).toEqual([]);
    expect([...ids]).toEqual(["a"]);
  });
});

describe("parseIds", () => {
  it("round-trips saved ids", () => {
    expect(parseIds(serializeIds(new Set(["a", "b"])))).toEqual(
      new Set(["a", "b"]),
    );
  });

  it("treats missing or corrupt storage as no favourites", () => {
    expect(parseIds(null).size).toBe(0);
    expect(parseIds("{not json").size).toBe(0);
    expect(parseIds('[1, "a"]')).toEqual(new Set(["a"]));
  });
});
