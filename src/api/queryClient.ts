import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  // One retry rides out a brief network drop without keeping a real failure on a spinner for long.
  defaultOptions: { queries: { retry: 1 } },
});
