const GUIDE_STATUSES = new Set(["eligible", "active", "completed", "skipped"]);

export function normalizeFirstUseGuideState(value) {
  return value && GUIDE_STATUSES.has(value.status) ? { status: value.status } : null;
}

export function shouldAutoShowFirstUseGuide(value) {
  return normalizeFirstUseGuideState(value)?.status === "eligible";
}

export function startFirstUseGuide(value) {
  const current = normalizeFirstUseGuideState(value);
  return current?.status === "eligible" ? { status: "active" } : current;
}

export function skipFirstUseGuide(value) {
  const current = normalizeFirstUseGuideState(value);
  return current?.status === "eligible" ? { status: "skipped" } : current;
}

export function completeFirstUseGuide(value) {
  const current = normalizeFirstUseGuideState(value);
  return current?.status === "active" ? { status: "completed" } : current;
}
