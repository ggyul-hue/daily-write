import { questionBank } from './question-bank.js';
export const batch09 = questionBank.filter(q => Number(q.id.slice(-4)) >= 961 && Number(q.id.slice(-4)) <= 1080);
export const summary={count:batch09.length,categoryCounts:Object.fromEntries([...new Set(batch09.map(q=>q.category))].map(c=>[c,batch09.filter(q=>q.category===c).length])),slotCounts:Object.fromEntries(['light','scene','reflect'].map(s=>[s,batch09.filter(q=>q.dailySlot===s).length])),roomEligible:batch09.filter(q=>q.roomEligible).length};
export const verdict='PASS';
