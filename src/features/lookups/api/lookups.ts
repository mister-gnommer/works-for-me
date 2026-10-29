import { getData } from "../../../api/coople";

/** id → English label */
export type LabelMap = ReadonlyMap<number, string>;

export interface Lookups {
  currencies: LabelMap;
  countries: LabelMap;
  jobProfiles: LabelMap;
  educationalLevels: LabelMap;
}

export const emptyLookups: Lookups = {
  currencies: new Map(),
  countries: new Map(),
  jobProfiles: new Map(),
  educationalLevels: new Map(),
};

/**
 * Loads one label list in English.
 * @param path lookup path below the API base URL
 */
async function fetchLabels(path: string): Promise<LabelMap> {
  const entries = await getData<{ id: number; name: string }[]>(path, {
    "Accept-Language": "en",
  });
  // Some names come with stray leading spaces.
  return new Map(entries.map(({ id, name }) => [id, name.trim()]));
}

let cached: Promise<Lookups> | undefined;

/**
 * Loads all label lists once per app run. A list that fails to load stays empty, so callers fall
 * back to raw values; the next call then tries again instead of keeping the partial result.
 * @returns label maps for every code family
 */
export function loadLookups(): Promise<Lookups> {
  cached ??= fetchAll().then(({ lookups, complete }) => {
    if (!complete) {
      cached = undefined;
    }
    return lookups;
  });
  return cached;
}

/** Fetches every list in parallel, keeping the ones that succeed. */
async function fetchAll(): Promise<{ lookups: Lookups; complete: boolean }> {
  // Undocumented endpoints found on Coople's public job page; see docs/DEV_NOTES.md.
  const results = await Promise.allSettled([
    fetchLabels("/common/value-lists/Currency"),
    fetchLabels("/common/value-lists/Country"),
    fetchLabels("/common/job-profiles"),
    fetchLabels("/common/value-lists/EducationalLevel"),
  ]);
  const [currencies, countries, jobProfiles, educationalLevels] = results.map(
    (result) =>
      result.status === "fulfilled" ? result.value : new Map<number, string>(),
  );
  return {
    lookups: { currencies, countries, jobProfiles, educationalLevels },
    complete: results.every((result) => result.status === "fulfilled"),
  };
}
