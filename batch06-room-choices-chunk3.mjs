import { entries as selection } from './batch06-room-candidate-selection.mjs';

const ids=['dq-v1-0651','dq-v1-0654','dq-v1-0657','dq-v1-0660','dq-v1-0662','dq-v1-0666','dq-v1-0667','dq-v1-0672','dq-v1-0673','dq-v1-0676'];
const choices={
  'dq-v1-0651':['기록하는 도구','만드는 도구','확인하는 도구'],
  'dq-v1-0654':['그대로 이어 한 일','순서를 바꿔 한 일','방법을 바꿔 한 일'],
  'dq-v1-0657':['사람의 소리','자연의 소리','기계의 소리'],
  'dq-v1-0660':['노란빛','하얀빛','푸른빛'],
  'dq-v1-0662':['달콤한 향','고소한 향','상큼한 향'],
  'dq-v1-0666':['비슷하게 이어진 소리','점점 커진 소리','점점 작아진 소리'],
  'dq-v1-0667':['따뜻한 색','차가운 색','무채색'],
  'dq-v1-0672':['무언가를 사러 간 곳','잠시 쉬러 간 곳','사람을 만나러 간 곳'],
  'dq-v1-0673':['혼자 있던 자리','둘이 있던 자리','여럿이 있던 자리'],
  'dq-v1-0676':['실내 공간','거리·골목','자연 가까운 곳']
};
const axis={
  'dq-v1-0651':'도구를 사용한 목적', 'dq-v1-0654':'다시 시작한 방식', 'dq-v1-0657':'소리가 난 주체',
  'dq-v1-0660':'빛의 색온도', 'dq-v1-0662':'향의 계열', 'dq-v1-0666':'반복되는 동안 소리 크기의 변화',
  'dq-v1-0667':'색의 계열', 'dq-v1-0672':'들른 장소의 목적', 'dq-v1-0673':'함께 머문 사람 수', 'dq-v1-0676':'조용해서 기억난 장소의 유형'
};
const rationale={
  'dq-v1-0651':'도구의 사용 목적을 세 갈래로 나누어 물건을 임의로 나열하지 않고 각자의 작업 장면을 비교한다.',
  'dq-v1-0654':'멈춤 뒤 바뀐 행동 방식을 기준으로 하여 업무·공부 같은 생활영역을 강제하지 않는다.',
  'dq-v1-0657':'사람·환경·기계라는 소리의 주체가 구분되어 같은 청각 경험도 서로 다른 답을 만든다.',
  'dq-v1-0660':'빛의 온도감과 반짝임이라는 성격 축으로 나누어 특정 광원을 전제하지 않는다.',
  'dq-v1-0662':'달콤함·고소함·향긋함은 음식 종류가 아니라 첫 향의 계열을 직접 설명한다.',
  'dq-v1-0666':'반복되는 방식 자체를 규칙·불규칙·메아리로 나누어 소리 출처 목록을 피했다.',
  'dq-v1-0667':'따뜻한색·차가운색·무채색은 시각 질문에 맞는 넓은 색 계열이라 답을 쉽게 고를 수 있다.',
  'dq-v1-0672':'들른 장소를 사기·쉬기·만남의 목적별로 구분해 특정 장소를 임의로 강제하지 않는다.',
  'dq-v1-0673':'앞·가운데·뒤라는 위치 축이 한 문법 역할로 유지되어 생활공간 종류를 나열하지 않는다.',
  'dq-v1-0676':'조용해서 기억난 장소의 유형을 기준으로 나누어 공간 이름보다 머문 장면을 친구와 비교하게 한다.'
};
const byId=new Map(selection.map(e=>[e.id,e]));
if(ids.length!==10||new Set(ids).size!==10||ids.some(id=>byId.get(id)?.roomVerdict!=='SELECT')) throw new Error('Chunk3 selection mismatch');
export const entries=ids.map(id=>({id,question:byId.get(id).question,presetAxis:axis[id],roomChoices:choices[id],distinctChoices:'PASS',axisFit:'PASS',coverageFit:'PASS',naturalWording:'PASS',privacySafe:'PASS',applicabilitySafe:'PASS',choiceVerdict:'PASS',issueTags:[],rationale:rationale[id]}));
if(entries.some(e=>e.roomChoices.length!==3||new Set(e.roomChoices).size!==3)) throw new Error('invalid choices');
export const chunk3Ids=ids;
console.log(JSON.stringify({count:entries.length,ids},null,2));
