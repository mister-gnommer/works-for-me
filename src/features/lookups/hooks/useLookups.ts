import { useAsync } from "../../../hooks/useAsync";
import { emptyLookups, loadLookups, type Lookups } from "../api/lookups";

/** Returns the label maps, empty until they have loaded (or if loading failed). */
export function useLookups(): Lookups {
  const lookups = useAsync(loadLookups, []);
  return lookups.status === "success" ? lookups.data : emptyLookups; // TODO(nit): redesign to avoid confusion of treating all lookups failed as success
}
