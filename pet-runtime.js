const STAGE_MULTIPLIERS = { BABY: 0.96, SMALL: 1, GROWING: 1.04, GROWN: 1.08 };
const PRIMARY_TRAITS = new Set(["walker", "sleepy", "collector", "reader"]);

export function petIdentity({ species, variant }) {
  return `${species}:${variant}`;
}

export function primaryTraitFrom(traits) {
  if (!traits || Array.isArray(traits) || typeof traits !== "object") return null;
  return PRIMARY_TRAITS.has(traits.primary) ? traits.primary : null;
}

export function createRuntimePetState(identity, pet = null) {
  const growthStage = STAGE_MULTIPLIERS[pet?.growth_stage] ? pet.growth_stage : null;
  const growthScale = Number(pet?.growth_scale);
  return {
    identity,
    growthStage,
    growthScale: Number.isFinite(growthScale) && growthScale > 0 ? growthScale : 1,
    primaryTrait: primaryTraitFrom(pet?.traits),
    loaded: Boolean(pet),
  };
}

export function effectiveGrowthScale(petState) {
  if (!petState?.growthStage) return 1;
  const petScale = Number(petState.growthScale);
  return STAGE_MULTIPLIERS[petState.growthStage] * (Number.isFinite(petScale) && petScale > 0 ? petScale : 1);
}

export function runtimeBehaviorWeights(baseWeights, primaryTrait) {
  const weights = { ...baseWeights };
  const multiply = (key, amount) => { weights[key] = (weights[key] || 0) * amount; };
  if (primaryTrait === "walker") { multiply("walk-a", 1.3); multiply("walk-b", 1.3); }
  if (primaryTrait === "sleepy") { multiply("sleep", 1.3); multiply("sit", 1.15); }
  if (primaryTrait === "collector") multiply("carry", 1.4);
  if (primaryTrait === "reader") multiply("read", 1.4);
  return weights;
}
