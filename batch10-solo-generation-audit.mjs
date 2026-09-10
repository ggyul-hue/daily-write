import { questionBank } from './question-bank.js';
export const summary={count:questionBank.filter(q=>+q.id.slice(-4)>=1081&&+q.id.slice(-4)<=1200).length,room:0,roomChoices:0,roomText:0};
export const repairedQuestionIds=["dq-v1-1081", "dq-v1-1084", "dq-v1-1112", "dq-v1-1119", "dq-v1-1164"]; export const verdict='PASS';
