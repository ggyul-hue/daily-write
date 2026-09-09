import crypto from 'node:crypto';
import { batch06 } from './question-bank.js';
const key=(id)=>crypto.createHash('sha256').update(`batch06-solo-editorial-v1${id}`).digest('hex');
const ordered=[...batch06].sort((a,b)=>key(a.id).localeCompare(key(b.id))).map(q=>q.id);
export const chunks=Array.from({length:6},(_,i)=>ordered.slice(i*20,i*20+20));
if(ordered.length!==120||new Set(ordered).size!==120) throw new Error('manifest invalid');
console.log(JSON.stringify({ordered,chunk1:chunks[0],sizes:chunks.map(c=>c.length)},null,2));
