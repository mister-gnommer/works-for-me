import AsyncStorage from "@react-native-async-storage/async-storage";

import { server } from "./src/test/server";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// Fail the test on unmocked requests; "error" alone only fails the request, which the app may tolerate.
const unhandled: string[] = [];
beforeAll(() =>
  server.listen({
    onUnhandledRequest: (request, print) => {
      unhandled.push(`${request.method} ${request.url}`);
      print.error();
    },
  }),
);
afterEach(async () => {
  server.resetHandlers();
  await AsyncStorage.clear();
  expect(unhandled.splice(0)).toEqual([]);
});
afterAll(() => server.close());
