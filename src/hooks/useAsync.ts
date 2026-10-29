import { useEffect, useState } from "react";

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; error: unknown }
  | { status: "success"; data: T };

/**
 * Runs an async loader whenever `deps` change and tracks its loading, error and success state.
 * Each result is tagged with the deps it was loaded for, so a stale result is never shown
 * and a slow old request cannot overwrite a newer one.
 * @param load the async call to run
 * @param deps JSON-serializable values that should trigger a new run when they change
 * @returns the current state and a `reload` function that runs the loader again
 */
export function useAsync<T>(
  load: () => Promise<T>,
  deps: readonly (string | number)[],
): AsyncState<T> & { reload: () => void } {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ key: string; state: AsyncState<T> }>();
  const key = JSON.stringify([...deps, attempt]);

  useEffect(() => {
    let ignore = false;
    load().then(
      (data) => {
        if (!ignore) {
          setResult({ key, state: { status: "success", data } });
        }
      },
      (error: unknown) => {
        if (!ignore) {
          setResult({ key, state: { status: "error", error } });
        }
      },
    );
    return () => {
      ignore = true;
    };
    // `load` is a new closure on every render; `key` says when it really changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const state: AsyncState<T> =
    result?.key === key ? result.state : { status: "loading" };
  return { ...state, reload: () => setAttempt((n) => n + 1) };
}
