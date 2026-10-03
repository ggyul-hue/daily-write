export function deriveSoloFlowState({ answerSaved, pending, fragment, feedInteraction = "idle", petLoadStatus = "ready", growthUpdated = false }) {
  if (!answerSaved) return "QUESTION_READY";
  if (fragment?.consumed_at) return growthUpdated ? "GROWTH_UPDATED" : "FEED_COMMITTED";
  if (feedInteraction === "submitting" || feedInteraction === "animating") return "FEEDING";
  if (feedInteraction === "retry") return "FEED_RETRY";
  if (pending && !fragment) return "FRAGMENT_PENDING";
  if (petLoadStatus === "error" && fragment) return "PET_LOAD_ERROR";
  if (fragment) return "FRAGMENT_READY";
  return "ANSWER_SAVED";
}

export async function resolveConsumeOutcome({ consume, readFragment, readPet }) {
  let result;
  let rpcError = null;
  try {
    result = await consume();
  } catch (error) {
    rpcError = error;
  }

  let event = null;
  let pet = null;
  const eventRead = await Promise.resolve().then(readFragment).then((value) => ({ ok: true, value }), (error) => ({ ok: false, error }));
  if (eventRead.ok) event = eventRead.value;

  const rpcCommitted = result && ["consumed", "already_consumed"].includes(result.status);
  const eventCommitted = Boolean(event?.consumed_at);
  if (!rpcCommitted && !eventCommitted) {
    return { status: "retry", result: null, event, pet: null, error: rpcError || eventRead.error || new Error("consume outcome not confirmed") };
  }

  const petRead = await Promise.resolve().then(readPet).then((value) => ({ ok: true, value }), (error) => ({ ok: false, error }));
  if (petRead.ok) pet = petRead.value;
  const growthPoints = Number.isFinite(pet?.growth_points)
    ? pet.growth_points
    : Number.isFinite(result?.growth_points)
      ? result.growth_points
      : Number.isFinite(event?.growth_result?.growth_points)
        ? event.growth_result.growth_points
        : null;

  return {
    status: "committed",
    result: result || { status: "recovered", fragment_id: event?.id, pet_id: event?.pet_id, consumed_at: event?.consumed_at },
    event,
    pet,
    growthPoints,
    growthRefreshFailed: !petRead.ok || !pet,
    recoveredFromResponseLoss: Boolean(!rpcCommitted && eventCommitted),
  };
}
