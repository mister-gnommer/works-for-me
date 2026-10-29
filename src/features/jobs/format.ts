/** Two-digit zero padding for date parts. */
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Formats a Unix ms timestamp as `yyyy-MM-dd HH:mm` in the phone's time zone.
 * @param timestamp Unix time in milliseconds, as sent by the API
 */
export function formatDateTime(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Formats an amount with two decimals, prefixed by its currency label when one is known.
 * @param amount the amount to show
 * @param currency currency label such as `CHF`, if resolved
 */
export function formatMoney(amount: number, currency?: string): string {
  const value = amount.toFixed(2);
  return currency ? `${currency} ${value}` : value;
}
