export const species = ["hamster", "cat", "capybara", "rabbit"];

export function chooseMonthlySpecies({ disliked = [], liked = [], recent = [], random = Math.random } = {}) {
  const candidates = species.filter((name) => !disliked.includes(name));
  const weighted = candidates.flatMap((name) => Array.from({ length: liked.includes(name) ? 2 : 1 }, () => name));
  const softened = weighted.filter((name) => !recent.slice(0, 2).includes(name));
  const pool = softened.length ? softened : weighted;
  return pool[Math.floor(random() * pool.length)];
}

export function createAnimalProfile(speciesName = "hamster", random = Math.random) {
  const coats = ["cream", "golden", "brown"];
  const behaviors = ["sleep", "walk", "carry", "read", "hide"];
  return { species: speciesName, coat: coats[Math.floor(random() * coats.length)], behavior: behaviors[Math.floor(random() * behaviors.length)] };
}
