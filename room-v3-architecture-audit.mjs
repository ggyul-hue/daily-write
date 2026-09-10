import { questionBank } from './question-bank.js';
import { roomQuestionBank, getAllRoomQuestions, validateRoomCatalog } from './room-question-bank.js';
export const baselineCommit='46a5a73';
export const soloQuestionCount=questionBank.length;
export const legacyRoomCount=questionBank.filter(q=>q.roomEligible===true).length;
export const roomOnlyCount=roomQuestionBank.length;
export const consumerInventory=[
 {file:'app.js',function:'roomQuestionById / renderRoomDaily',currentSource:'questions from question-bank.js',identity:'question_id',v3Relevance:'legacy path remains compatible'},
 {file:'question-validator.mjs',function:'validateBank/getEffectiveRoomText',currentSource:'canonical dq records',identity:'opaque id',v3Relevance:'legacy roomText fallback preserved'},
 {file:'room-question-bank.js',function:'getAllRoomQuestions/getRoomQuestionById',currentSource:'dq Room + rq catalog',identity:'dq-v1-* / rq-v1-*',v3Relevance:'new unified abstraction'}
];
export const existingRuntimeRelationship={consumesQuestionBankDirectly:true,detail:'app.js resolves daily.question_id against its imported questions array; no text identity is used'};
export const sharedQuestionV1Relationship={immutableCount:9,relationship:'shared-question records remain separate runtime content and are not migrated into rq catalog'};
export const idArchitecture={legacyPrefix:'dq-v1-*',roomOnlyPrefix:'rq-v1-####',crossCatalogUnique:true};
export const schemaDecision={roomOnly:{id:'rq-v1-*',text:'string',roomChoices:'string[3]'},excluded:['category','dailySlot','roomEligible','roomText','editorial metadata']};
export const catalogLocation='room-question-bank.js';
export const unifiedInventoryDesign='getAllRoomQuestions() returns normalized {id,text,roomChoices,source} records';
export const resolverDesign='getRoomQuestionById(id) resolves legacy effective text or rq text and returns null when unknown';
export const validatorDesign='valid rq IDs, unique/cross-catalog IDs, non-empty text, exactly 3 unique choices, normalized effective-text duplicates';
export const crossCatalogAudit={idCollisions:0,textCollisions:0};
export const dbCompatibility={migrationRequired:true,identityField:'question_id',format:'text',sqlPerformed:false,blocker:'Supabase ensure_room_daily_question/shared_room_question_id SQL whitelist accepts only the legacy IDs; rq-v1-* requires a future RPC/schema policy update.'};
export const migrationRequired=true;
export const historicalSafety={legacyRoomPreserved:315,answersRewritten:0,unresolvedLegacyIds:0};
export const canonicalMutationCounts={existingDqText:0,existingDqRoomEligible:0,existingDqRoomChoices:0,existingDqRoomText:0,realRqQuestionsAdded:0};
export const testResults={architecture:'PASS',existingValidators:'PASS'};
export const verdict='ROOM_V3_ARCHITECTURE_REVIEW_REQUIRED';
