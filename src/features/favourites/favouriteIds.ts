/**
 * Returns a new set with `id` added, or removed if it was already there.
 * @param ids current favourite job ids
 * @param id job id to toggle
 */
export function toggleId(ids: ReadonlySet<string>, id: string): Set<string> {
  const next = new Set(ids);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

/**
 * Reads favourite ids saved by `serializeIds`; anything unreadable counts as no favourites.
 * @param raw stored value, or null when nothing was saved yet
 */
export function parseIds(raw: string | null): Set<string> {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    return new Set(
      Array.isArray(value)
        ? value.filter((id): id is string => typeof id === "string")
        : [],
    );
  } catch {
    return new Set();
  }
}

export const serializeIds = (ids: ReadonlySet<string>) =>
  JSON.stringify([...ids]);
