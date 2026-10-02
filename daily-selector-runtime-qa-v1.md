# Daily Selector Runtime QA V1

**DAILY_SELECTOR_RUNTIME_QA_V1_PASS_WITH_FOLLOWUPS**

## 1. Verdict

Warm-start behavior, deterministic activation scheduling, malformed/conflict diagnostics, Room isolation, and existing core parity regressions pass. Release readiness is withheld because the actual localStorage snapshot was unavailable, no real production activation date has been set, and rollback to the old nine-question build is unsafe.

## 2. Locked core baseline

- Locked C3 core baseline: DAILY_SELECTOR_IMPLEMENTATION_V1_PASS_WITH_FOLLOWUPS; policy source, questions, sidecar, validator, simulation, and previous QA artifacts remained byte-identical.
- Existing parity regression: 1,095,000 comparisons for 1,000 × 365-day schedules, mismatch 0; fixed regression 6 seeds; 730/1,095-day stress mismatch 0.
- The core algorithm was not retuned. The runtime only accepts an optional initial-history state; no initial state preserves the prior exact schedule.

## 3. Existing state and lifecycle flow

`app.js:dailyQuestionSet(day)` calls `resolveDailyQuestionSet(day, state.dailyQuestionSets)`. Valid saved sets are returned unchanged. New sets are persisted using the existing localStorage map. The adapter is read-only over history and leaves malformed/expired entries untouched.

## 4. Activation contract

The config uses `DAILY_SELECTOR_C3_ACTIVATION_DATE = null` until a release step sets the first C3-governed local date. QA injects `2030-01-01`. A legacy set already stored on that date is surfaced as `POST_ACTIVATION_SET_CONFLICT`; choose the next local date to avoid changing an existing day.

## 5. Production seed contract

- Policy version: C3_V1; frozen seed: 7904708.
- The seed is a literal config value, so restart/build does not change it. Production code does not call `Math.random`, use install time, or derive the seed from QA helper functions.
- The QA `hashSeed(run, 'C', horizon)` is test-only and remains separate from the production seed.

## 6. Legacy history adapter

Valid `YYYY-MM-DD` keys and exactly three canonical IDs use the existing app validity contract. The adapter sorts keys, maps IDs through the canonical bank/classification, loads D-365 through D-1, and ignores expired entries. Malformed dates/sets are diagnostic entries; the adapter does not import part of a bad set or mutate source state.

## 7. Warm-start behavior

Question IDs seed the 365-day exposure maps; the symmetric 51-edge graph uses those same IDs for pair filtering. Growth role/category/Seed metadata are reconstructed from canonical metadata. The last five pre-activation calendar dates are represented as five category slots with nulls for dates without persisted Growth questions, so sparse legacy dates are not simulated.

Targeted warm-start failures: question cooldown 0, validator pair 0, manual pair 0, Growth penalty 0. The D-1/D-6 pair boundary blocks; D-7 is outside the window. Growth category from D-1 affects first-day scoring; a D-6 category applies no penalty.

## 8. Saved-current-day behavior

A valid pre-activation saved set is returned exactly and not rewritten. A valid post-activation saved set is compared with deterministic recomputation. A conflict is diagnosed and the stored set is preserved; malformed current sets are not overwritten.

## 9. Sparse and malformed history

PASS for 0, 1, 7, 30, 180, and 365 persisted dates, plus 47 irregular dates. Sparse gaps are not filled. Three malformed entries (bad length, unknown ID, invalid date key) produced diagnostics and zero partial imports. A D-366 set was excluded; D-365 was included.

## 10. History-aware parity

PASS: activation date plus initial legacy history replays the same C3 schedule as the reference core. Missing post-activation visits do not omit schedule days. Same history in ascending, descending, or shuffled insertion order yields identical IDs. JSON serialize/deserialize replay mismatch: 0.

### Representative six-day evidence

| Date | Phase | Questions (role/category/Seed) | History effect |
| --- | --- | --- | --- |
| 2029-12-29 | LEGACY_HISTORY | best-food (GROWTH/object_food/interest) · most-seen (MEMORY/routine) · comfortable (MEMORY/emotion) | Growth object_food history informs first C3 Growth scoring (date age 3). |
| 2029-12-30 | LEGACY_HISTORY | dq-v1-0843 (MEMORY/scene) · most-seen (MEMORY/routine) · comfortable (MEMORY/emotion) | dq-v1-0843 is a manual pair exposure; dq-v1-1049 is blocked during its pair window. |
| 2029-12-31 | LEGACY_HISTORY | dq-v1-0011 (MEMORY/scene) · most-seen (MEMORY/routine) · comfortable (MEMORY/emotion) | dq-v1-0011 is a validator-pair exposure; dq-v1-0751 is blocked during its pair window. |
| 2030-01-01 | C3 | dq-v1-0536 (MEMORY/senses) · dq-v1-0833 (MEMORY/closing) · dq-v1-1206 (GROWTH/scene/playful) | Activation date begins the seeded C3 stream; D-365..D-1 saved sets are initial state only. |
| 2030-01-02 | C3 | dq-v1-0552 (MEMORY/place) · dq-v1-1265 (GROWTH/people/sentimental) · dq-v1-0189 (MEMORY/senses) | Generated as a C3 calendar day even without an app visit. |
| 2030-01-03 | C3 | dq-v1-1351 (GROWTH/senses/warmth) · dq-v1-0250 (MEMORY/scene) · dq-v1-0078 (MEMORY/place) | Generated as a C3 calendar day even without an app visit. |

The legacy `best-food` Growth exposure on D-3 maps to `object_food/interest`; D-2 `dq-v1-0843` activates the manual edge against `dq-v1-1049`; D-1 validator pair exposure activates its reverse partner edge. Those legacy sets remain unchanged. D through D+2 are generated by the seeded C3 calendar schedule.

## 11. Existing 1,000-seed parity regression

PASS: 1000 × 365 days / 1,095,000 question comparisons, 0 mismatch; all six fixed regression seeds pass.

## 12. 730/1,095-day stress regression

PASS: 30 schedules per horizon, mismatch/exhaustion/fallback/reuse violation all 0.

## 13. Actual state replay

Unavailable: the connected browser inventory returned no active tabs, so this turn could not read the real `daily-write-solo-v1` localStorage snapshot. Synthetic fixtures are reported separately above; no real storage was modified.

## 14. Timezone and date boundary

The app still creates day keys with its existing local `dateKey()` helper. Lifecycle activation compares these validated date strings; date distance uses UTC calendar-date arithmetic. Tests cover local midnight, month, and year transitions.

## 15. Room isolation

PASS: Room candidate remains date-based over the locked 1,500-question list and receives no `dailyQuestionSets` input. Existing Room/shared static regression passes.

## 16. Rollback compatibility

**UNSAFE.** The previous nine-question app build cannot resolve new canonical C3 IDs stored in `dailyQuestionSets`; its existing validity check would reject that set and generate a legacy set. Release notes should require forward-compatible rollback handling or explicitly prohibit rollback after activation.

## 17. Changed files

- `daily-selector-lifecycle-config-v1.js`: version, null-until-release activation date, frozen seed, and history window.
- `daily-selector-lifecycle-v1.js`: read-only legacy history adapter, activation/conflict handling, deterministic replay, and legacy pre-activation selection.
- `daily-selector-runtime-v1.js`: optional warm-start state input; empty-history selector semantics remain exact.
- `app.js` and `data.js`: route existing Daily selection through the lifecycle resolver while preserving the current app date key and saved-set behavior.
- `test-daily-selector-runtime-qa-v1.mjs` and `daily-selector-runtime-qa-v1.mjs`: lifecycle fixtures and report harness.
- `package.json`: includes lifecycle QA in `npm test`.
- `daily-selector-runtime-qa-v1.json` and `.md`: generated results.

## 18. Unresolved items

- Set the actual activation date during the release step; it is deliberately unset here.
- Validate a real localStorage snapshot; none was accessible in the browser inventory.
- Rollback is unsafe once non-legacy C3 IDs have been persisted.

## 19. Release readiness

Core parity, warm-start synthetic QA, deterministic replay, Room isolation, and baseline integrity pass. Because actual state, release date, and rollback compatibility remain open, `DAILY_SELECTOR_RELEASE_CANDIDATE_V1_READY` is withheld.

Final counters: history days loaded=3; exposures=9; malformed=3; activation conflict fixture=1; core mismatches=0; state mutations=0.
