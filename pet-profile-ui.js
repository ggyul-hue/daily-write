const SPECIES_LABELS = {
  hamster: "햄스터",
  capybara: "카피바라",
  cat: "고양이",
  dog: "강아지",
};

const STAGE_LABELS = {
  BABY: "아기",
  SMALL: "작은 친구",
  GROWING: "자라는 중",
  GROWN: "다 자란 친구",
};

const TRAIT_LABELS = {
  walker: "돌아다니는 걸 좋아해요",
  sleepy: "느긋하게 쉬는 걸 좋아해요",
  collector: "수집하는 걸 좋아해요",
  reader: "조용히 읽는 걸 좋아해요",
};

const STAGE_RANGES = {
  BABY: [0, 3],
  SMALL: [3, 7],
  GROWING: [7, 14],
};

export function speciesLabel(species) {
  return SPECIES_LABELS[species] || "친구";
}

export function stageLabel(stage) {
  return STAGE_LABELS[stage] || null;
}

export function traitLabel(trait) {
  return TRAIT_LABELS[trait] || "아직 어떤 성격인지 알아가는 중이에요.";
}

export function growthProfile(state) {
  if (!state?.loaded) return { kind: "loading" };

  const points = Number(state.growthPoints);
  const stage = stageLabel(state.growthStage);
  if (!stage || !Number.isInteger(points) || points < 0) return { kind: "unavailable" };

  if (state.growthStage === "GROWN") {
    return { kind: "ready", stage, points, next: "다 자랐어요.", progress: 1, trait: traitLabel(state.primaryTrait) };
  }

  const [start, end] = STAGE_RANGES[state.growthStage];
  return {
    kind: "ready",
    stage,
    points,
    next: `다음 성장까지 ${Math.max(0, end - points)}개`,
    progress: Math.max(0, Math.min(1, (points - start) / (end - start))),
    trait: traitLabel(state.primaryTrait),
  };
}
