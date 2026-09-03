export const species = ["hamster", "cat", "capybara", "rabbit"];
export const behaviorWeights = { idle: 2, "walk-a": 2, "walk-b": 2, sleep: 1, sit: 2, read: 1, carry: 2 };

export function chooseMonthlySpecies({ disliked = [], liked = [], recent = [], random = Math.random } = {}) {
  const candidates = species.filter((name) => !disliked.includes(name));
  const weighted = candidates.flatMap((name) => Array.from({ length: liked.includes(name) ? 2 : 1 }, () => name));
  const softened = weighted.filter((name) => !recent.slice(0, 2).includes(name));
  const pool = softened.length ? softened : weighted;
  return pool[Math.floor(random() * pool.length)];
}

export function createAnimalProfile(speciesName = "hamster", random = Math.random) {
  const coats = ["cream", "golden", "brown"];
  return { species: speciesName, coat: coats[Math.floor(random() * coats.length)], behaviorWeights: { ...behaviorWeights } };
}

export function chooseBehavior(weights = behaviorWeights, random = Math.random) {
  const entries = Object.entries(weights);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let cursor = random() * total;
  for (const [behavior, weight] of entries) { cursor -= weight; if (cursor < 0) return behavior; }
  return entries.at(-1)[0];
}
