export const DAILY_SELECTOR_C3_POLICY_VERSION = "C3_V1";
// Set the real first C3 local date as part of a separately approved release step.
// null intentionally keeps the app on the legacy selector until that date is configured.
export const DAILY_SELECTOR_C3_ACTIVATION_DATE = "2026-10-03";
export const DAILY_SELECTOR_C3_SEED = 7904708;
export const DAILY_SELECTOR_C3_LEGACY_HISTORY_WINDOW_DAYS = 365;

export function validateActivationDate(value) {
  if (value === null) return null;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new TypeError("C3 activation date must be a YYYY-MM-DD local date key or null");
  const [year, month, day] = value.split("-").map(Number);
  const stamp = Date.UTC(year, month - 1, day);
  const checked = new Date(stamp);
  if (checked.getUTCFullYear() !== year || checked.getUTCMonth() !== month - 1 || checked.getUTCDate() !== day) throw new TypeError(`invalid C3 activation date: ${value}`);
  return value;
}
