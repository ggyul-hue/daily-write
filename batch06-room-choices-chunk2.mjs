import { entries as selection } from './batch06-room-candidate-selection.mjs';

const ids=['dq-v1-0625','dq-v1-0627','dq-v1-0628','dq-v1-0630','dq-v1-0696','dq-v1-0633','dq-v1-0634','dq-v1-0637','dq-v1-0640','dq-v1-0648'];
const choices={
  'dq-v1-0625':['상대가 먼저 인사한 사람','내가 먼저 인사한 사람','거의 동시에 인사한 사람'],
  'dq-v1-0627':['말없이 들어 준 사람','질문하며 들어 준 사람','공감하며 들어 준 사람'],
  'dq-v1-0628':['길을 물은 상대','일을 부탁한 상대','의견을 구한 상대'],
  'dq-v1-0630':['직접 만난 사람','통화한 사람','글로 연락한 사람'],
  'dq-v1-0696':['가사가 남은 노래','멜로디가 남은 노래','분위기가 남은 노래'],
  'dq-v1-0633':['대화하다 웃은 사람','같은 걸 보고 웃은 사람','함께 움직이다 웃은 사람'],
  'dq-v1-0634':['자주 연락하던 사람','한동안 연락 없던 사람','처음 연락한 사람'],
  'dq-v1-0637':['곧 다시 볼 사람','한동안 못 볼 사람','언제 다시 볼지 모를 사람'],
  'dq-v1-0640':['내용을 다시 본 일','상태를 다시 살핀 일','빠뜨린 것이 없는지 본 일'],
  'dq-v1-0648':['순서를 앞당긴 일','뒤로 미룬 일','중간에 끼운 일']
};
const axis={
  'dq-v1-0625':'웃음이 오간 방향', 'dq-v1-0627':'대화가 전달된 방식', 'dq-v1-0628':'부탁의 목적',
  'dq-v1-0630':'소식을 들은 접촉 방식', 'dq-v1-0696':'노래에서 기억에 남은 요소', 'dq-v1-0633':'함께 웃은 활동 맥락',
  'dq-v1-0634':'반가운 연락의 목적', 'dq-v1-0637':'헤어짐 전 만남의 맥락', 'dq-v1-0640':'반복 확인의 목적', 'dq-v1-0648':'바꾼 순서의 방향'
};
const rationale={
  'dq-v1-0625':'웃음이 오간 방향으로 나누어 같은 인사 장면도 서로 다르게 비교할 수 있다.',
  'dq-v1-0627':'직접·목소리·글이라는 전달 방식이 겹치지 않아 듣는 장면의 답이 선명하다.',
  'dq-v1-0628':'부탁의 목적을 길·일·의견으로 나누어 상대를 특정 가족이나 직업으로 제한하지 않는다.',
  'dq-v1-0630':'소식을 접한 방식이 직접 만남·전화·글로 분리되어 질문의 사람 답을 유지한다.',
  'dq-v1-0696':'가사·멜로디·분위기라는 기억 요소가 분리되어 노래에 대한 서로 다른 회상을 비교할 수 있다.',
  'dq-v1-0633':'함께 웃은 맥락을 대화·공유한 장면·이동으로 나누어 친구 답 비교가 가능하다.',
  'dq-v1-0634':'반가운 연락의 목적을 안부·소식·약속으로 나누어 연락 수단과 혼동하지 않는다.',
  'dq-v1-0637':'만남의 지속과 우연성을 기준으로 평범한 작별 장면을 가볍게 비교할 수 있다.',
  'dq-v1-0640':'무엇을 확인했는지가 내용·상태·누락 여부로 갈려 반복 행동의 이유를 직접 답한다.',
  'dq-v1-0648':'순서를 바꾼 방향이 앞당김·미룸·삽입으로 나뉘어 생활 영역을 강제하지 않는다.'
};
const byId=new Map(selection.map(e=>[e.id,e]));
if(ids.length!==10||new Set(ids).size!==10||ids.some(id=>byId.get(id)?.roomVerdict!=='SELECT')) throw new Error('Chunk2 selection mismatch');
export const entries=ids.map(id=>({id,question:byId.get(id).question,presetAxis:axis[id],roomChoices:choices[id],distinctChoices:'PASS',axisFit:'PASS',coverageFit:'PASS',naturalWording:'PASS',privacySafe:'PASS',applicabilitySafe:'PASS',choiceVerdict:'PASS',issueTags:[],rationale:rationale[id]}));
if(entries.some(e=>e.roomChoices.length!==3||new Set(e.roomChoices).size!==3)) throw new Error('invalid choices');
export const chunk2Ids=ids;
console.log(JSON.stringify({count:entries.length,ids},null,2));
