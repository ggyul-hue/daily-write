import { spawnSync } from 'node:child_process';

const commandAvailable = (command) => {
  const result = spawnSync('where.exe', [command], { encoding: 'utf8', windowsHide: true });
  return result.status === 0;
};

export const localSupabaseCliAvailable = commandAvailable('supabase');
export const dockerAvailable = commandAvailable('docker');
export const localStackPossible = localSupabaseCliAvailable && dockerAvailable;

export const remotePreflight = {
  project: 'daily-write',
  projectRef: 'fzbubyiusyxbbiiijyrh',
  schema: 'public',
  productionBranchOnly: true,
  previewBranchAvailable: false,
  migrationApplied: false,
  persistentMutation: 0,
};

export const localPreMigrationParity = {
  verified: false,
  reason: 'Supabase CLI and Docker are unavailable; no local PostgreSQL stack was started.',
  roomQuestionRegistry: 'UNVERIFIED',
  legacyRpc: 'UNVERIFIED',
  questionIdType: 'UNVERIFIED',
};

export const localMigrationResult = {
  attempted: false,
  status: 'UNAVAILABLE',
  reason: 'A local Supabase-compatible database cannot be provisioned in this environment.',
};

export const localFixture = {
  created: false,
  syntheticOnly: true,
  tables: ['rooms', 'room_members', 'room_daily_questions', 'room_answers'],
  cleanupOrder: ['room_answers', 'room_daily_questions', 'room_members', 'rooms'],
};

export const localRpcCases = {
  legacyRegisteredEnabled: 'UNTESTED',
  unknownLegacy: 'UNTESTED',
  unregisteredDq: 'UNTESTED',
  unregisteredRq: 'UNTESTED',
  disabledRq: 'UNTESTED',
  enabledRq: 'UNTESTED',
  idempotency: 'UNTESTED',
};

export const localSecurityCases = {
  registryInsert: 'UNTESTED',
  registryUpdate: 'UNTESTED',
  registryDelete: 'UNTESTED',
  registrySelect: 'UNTESTED',
};

export const productionRehearsalPossible = false;
export const productionAuthFixturePossible = false;
export const productionRehearsalExecuted = false;
export const productionRollbackVerified = false;
export const productionPersistentMutation = 0;
export const previewBranchStillRequired = true;

export const verdict = 'ROOM_V3_LOCAL_RUNTIME_UNAVAILABLE';

if (process.argv[1]?.endsWith('room-v3-runtime-qa-preflight.mjs')) {
  console.log(JSON.stringify({
    localSupabaseCliAvailable,
    dockerAvailable,
    localStackPossible,
    localPreMigrationParity,
    localMigrationResult,
    localFixture,
    localRpcCases,
    localSecurityCases,
    productionRehearsalPossible,
    productionAuthFixturePossible,
    productionRehearsalExecuted,
    productionRollbackVerified,
    productionPersistentMutation,
    previewBranchStillRequired,
    verdict,
  }, null, 2));
}
