const BASE_URL = "https://www.coople.com/ch/resources/api";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface Envelope<T> {
  data?: T;
  error?: boolean;
  errorCode?: string;
}

/**
 * Calls a Coople API path and unwraps the `data` field of its response envelope.
 * Coople can report errors either through the HTTP status or through `error: true` in a 200 body,
 * so both are turned into an ApiError.
 * @param path path below the API base URL, starting with `/`
 * @param headers extra request headers
 * @returns the envelope's `data`
 */
export async function getData<T>(
  path: string,
  headers?: Record<string, string>,
): Promise<T> {
  const response = await fetch(BASE_URL + path, { headers });
  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
    );
  }
  const body: Envelope<T> = await response.json();
  if (body.error || body.data === undefined) {
    throw new ApiError(
      `API error: ${body.errorCode ?? "missing data"}`,
      response.status,
    );
  }
  return body.data;
}

/**
 * Tells whether an error means the requested resource does not exist.
 * Coople answers an unknown id with 404 and a malformed one with 401.
 * @param error anything caught from getData
 */
export function isNotFound(error: unknown): boolean {
  return (
    error instanceof ApiError && (error.status === 404 || error.status === 401)
  );
}
