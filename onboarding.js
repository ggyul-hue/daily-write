const hash = (value) => [...String(value)].reduce((result, character) => ((result * 31) + character.charCodeAt(0)) >>> 0, 2166136261);

const shuffled = (items, seed) => [...items].sort((left, right) => {
  const leftValue = hash(`${seed}:${left}`);
  const rightValue = hash(`${seed}:${right}`);
  return leftValue - rightValue || left.localeCompare(right);
});

export function adoptionCandidates(manifest, seed, revision = 0, requiredSpecies = null) {
  const allSpecies = [...new Set(manifest.map((animal) => animal.species))];
  const remaining = allSpecies.filter((species) => species !== requiredSpecies);
  const species = requiredSpecies && allSpecies.includes(requiredSpecies)
    ? shuffled([requiredSpecies, ...shuffled(remaining, `${seed}:${revision}:remaining`).slice(0, 2)], `${seed}:${revision}:order`)
    : shuffled(allSpecies, `${seed}:${revision}`).slice(0, 3);
  return species.map((speciesName) => {
    const variants = manifest.filter((animal) => animal.species === speciesName);
    return variants[hash(`${seed}:${revision}:${speciesName}`) % variants.length];
  }).map(({ species, variant }) => ({ species, variant }));
}

export function createAdoptionDraft(manifest, seed, revision = 0, requiredSpecies = null) {
  return { seed, revision, candidates: adoptionCandidates(manifest, seed, revision, requiredSpecies) };
}

export function nextAdoptionDraft(manifest, draft) {
  const current = JSON.stringify(draft.candidates);
  const allSpecies = [...new Set(manifest.map((animal) => animal.species))];
  const omittedSpecies = allSpecies.find((species) => !draft.candidates.some((candidate) => candidate.species === species));
  let revision = draft.revision + 1;
  let next = createAdoptionDraft(manifest, draft.seed, revision, omittedSpecies);
  while (JSON.stringify(next.candidates) === current) {
    revision += 1;
    next = createAdoptionDraft(manifest, draft.seed, revision, omittedSpecies);
  }
  return next;
}
