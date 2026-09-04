export const poseKeys = ["idle", "walk-a", "walk-b", "sit", "sleep", "read", "carry"];

const poseAssets = (species, variant) => Object.fromEntries(
  poseKeys.map((pose) => [pose, `assets/animals/${species}/${variant}/${pose}.png`]),
);

const character = (species, variant, displayName, personality, preferredLandmarks, behaviorWeights) => ({
  id: `${species}-${variant}`,
  species,
  variant,
  displayName,
  personality,
  poseAssets: poseAssets(species, variant),
  preferredLandmarks,
  behaviorWeights,
});

const common = { idle: 2, "walk-a": 2, "walk-b": 2, sleep: 1, sit: 2, read: 1, carry: 2 };

export const animalManifest = [
  character("hamster", "mochi", "모찌", "호기심 많고 다정해요.", ["stone-right", "open-lawn"], { ...common, carry: 3 }),
  character("hamster", "cream", "크림", "포근하고 조용해요.", ["bush-left", "open-lawn"], { ...common, sit: 3 }),
  character("hamster", "almond", "아몬드", "작은 것을 모으는 걸 좋아해요.", ["stone-right", "mailbox-left"], { ...common, carry: 3 }),
  character("hamster", "sugar", "슈가", "바람을 좋아하는 친구예요.", ["open-lawn", "bush-left"], { ...common, idle: 3 }),
  character("capybara", "clover", "클로버", "느긋하게 쉬는 걸 좋아해요.", ["tree-right", "open-lawn"], { ...common, sleep: 3, sit: 4, "walk-a": 1, "walk-b": 1 }),
  character("capybara", "bookie", "보키", "천천히 책을 읽어요.", ["tree-right", "open-lawn"], { ...common, read: 3, sleep: 2, "walk-a": 1, "walk-b": 1 }),
  character("capybara", "tangerine", "귤이", "햇볕 아래서 쉬어요.", ["tree-right", "open-lawn"], { ...common, sleep: 4, sit: 3, "walk-a": 1, "walk-b": 1 }),
  character("capybara", "towel", "토리", "따뜻한 차를 좋아해요.", ["tree-right", "open-lawn"], { ...common, sit: 4, sleep: 3, "walk-a": 1, "walk-b": 1 }),
  character("cat", "orange", "치즈", "정원을 살피는 걸 좋아해요.", ["bush-left", "tree-right"], { ...common, sit: 3, "walk-a": 3, "walk-b": 3 }),
  character("cat", "gray", "구름", "풀숲 옆을 좋아해요.", ["bush-left", "tree-right"], { ...common, sit: 3, "walk-a": 3, "walk-b": 3 }),
  character("cat", "calico", "나비", "작은 것을 관찰해요.", ["bush-left", "stone-right"], { ...common, carry: 3, "walk-a": 3, "walk-b": 3 }),
  character("cat", "cream", "밀크", "그늘에서 쉬는 걸 좋아해요.", ["tree-right", "bush-left"], { ...common, sleep: 2, sit: 3, "walk-a": 3, "walk-b": 3 }),
  character("dog", "shiba", "콩이", "정원을 활발히 탐험해요.", ["open-lawn", "mailbox-left"], { ...common, "walk-a": 4, "walk-b": 4 }),
  character("dog", "cream", "보리", "밝고 다정한 친구예요.", ["open-lawn", "mailbox-left"], { ...common, "walk-a": 4, "walk-b": 4, sit: 3 }),
  character("dog", "brown", "밤이", "느긋하게 산책해요.", ["open-lawn", "tree-right"], { ...common, "walk-a": 3, "walk-b": 3, sleep: 2 }),
  character("dog", "gray", "솜이", "바람을 따라 걷는 걸 좋아해요.", ["open-lawn", "mailbox-left"], { ...common, "walk-a": 4, "walk-b": 4 }),
];

export const animalSpecies = [...new Set(animalManifest.map((animal) => animal.species))];
const legacyHamsterVariants = { cream: "cream", golden: "mochi", brown: "almond" };

export function getAnimalDefinition(profile = {}) {
  const species = animalSpecies.includes(profile.species) ? profile.species : "hamster";
  const variant = profile.variant || (species === "hamster" ? legacyHamsterVariants[profile.coat] : undefined);
  return animalManifest.find((animal) => animal.species === species && animal.variant === variant)
    || animalManifest.find((animal) => animal.species === species)
    || animalManifest[0];
}
