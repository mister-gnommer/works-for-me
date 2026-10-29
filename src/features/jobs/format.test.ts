import { formatDateTime, formatMoney } from "./format";

describe("formatDateTime", () => {
  it("formats local time as yyyy-MM-dd HH:mm with zero padding", () => {
    const timestamp = new Date(2026, 0, 5, 9, 7).getTime();

    expect(formatDateTime(timestamp)).toBe("2026-01-05 09:07");
  });
});

describe("formatMoney", () => {
  it("keeps two decimals and adds the currency only when known", () => {
    expect(formatMoney(32, "CHF")).toBe("CHF 32.00");
    expect(formatMoney(192.5)).toBe("192.50");
  });
});
