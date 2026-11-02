import { useQuery } from "@tanstack/react-query";

import {
  fetchLabels,
  type LabelMap,
  lookupPaths,
  type Lookups,
} from "../api/lookups";

const noLabels: LabelMap = new Map();

/**
 * Returns one label list, or an empty one until it loads or if it failed, so callers fall back to raw values.
 * Each list is cached on its own, so one failing list doesn't refetch the others.
 * @param path lookup path below the API base URL
 */
function useLabels(path: string): LabelMap {
  const { data } = useQuery({
    queryKey: ["lookups", path],
    queryFn: () => fetchLabels(path),
    // Lists rarely change, but new job profiles do appear; a failed list is fetched again on the next mount.
    staleTime: 24 * 60 * 60 * 1000,
  });
  return data ?? noLabels;
}

/** Returns the label maps; a list is empty until it has loaded, or if it failed. */
export function useLookups(): Lookups {
  return {
    currencies: useLabels(lookupPaths.currencies),
    countries: useLabels(lookupPaths.countries),
    jobProfiles: useLabels(lookupPaths.jobProfiles),
    educationalLevels: useLabels(lookupPaths.educationalLevels),
  };
}
