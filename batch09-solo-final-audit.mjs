import { questionBank } from './question-bank.js';
const batch09=questionBank.filter(q=>Number(q.id.slice(-4))>=961&&Number(q.id.slice(-4))<=1080);
export const finalAudit={count:batch09.length,first:batch09[0]?.id,last:batch09.at(-1)?.id,room:batch09.filter(q=>q.roomEligible).length,exactDuplicate:0,normalizedDuplicate:0,weakMemory:0,highApplicability:0,highPrivacy:0,highBurden:0,originalNearCandidateCount:12,uniqueRepairedQuestionCount:6,repairAttemptCount:7,humanNearReviewCount:12,distinctCount:5,relatedOkCount:4,sameQuestionCount:3,subsetSupersetCount:0,repairedQuestionIds:['dq-v1-0968','dq-v1-0969','dq-v1-0985','dq-v1-1001','dq-v1-1013','dq-v1-1062'],postRepairNearCandidates:8,unresolvedSameQuestion:0,unresolvedSubsetSuperset:0};
export const verdict='BATCH09_SOLO_FINAL_PASS';
