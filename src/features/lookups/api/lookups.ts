import { getData } from "../../../api/coople";

/** id → English label */
export type LabelMap = ReadonlyMap<number, string>;

export interface Lookups {
  currencies: LabelMap;
  countries: LabelMap;
  jobProfiles: LabelMap;
  educationalLevels: LabelMap;
}

// Undocumented endpoints found on Coople's public job page; see docs/DEV_NOTES.md.
export const lookupPaths = {
  currencies: "/common/value-lists/Currency",
  countries: "/common/value-lists/Country",
  jobProfiles: "/common/job-profiles",
  educationalLevels: "/common/value-lists/EducationalLevel",
} satisfies Record<keyof Lookups, string>;

/**
 * Loads one label list in English.
 * @param path lookup path below the API base URL
 */
export async function fetchLabels(path: string): Promise<LabelMap> {
  const entries = await getData<{ id: number; name: string }[]>(path, {
    "Accept-Language": "en",
  });
  // Some names come with stray leading spaces.
  return new Map(entries.map(({ id, name }) => [id, name.trim()]));
}
