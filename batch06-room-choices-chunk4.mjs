import { entries as selection } from './batch06-room-candidate-selection.mjs';

const ids=['dq-v1-0678','dq-v1-0680','dq-v1-0688','dq-v1-0694','dq-v1-0698','dq-v1-0700','dq-v1-0703','dq-v1-0705','dq-v1-0709','dq-v1-0716'];
const choices={
  'dq-v1-0678':['자주 가는 곳','가끔 가는 곳','처음 간 곳'],
  'dq-v1-0680':['쉬는 공간','집중하는 공간','오가는 공간'],
  'dq-v1-0688':['새로 산 것','먹다 남은 것','미리 준비한 것'],
  'dq-v1-0694':['누군가의 말','뜻밖의 장면','내 행동'],
  'dq-v1-0698':['처음 접한 일','생각과 달랐던 일','원리를 알게 된 일'],
  'dq-v1-0700':['바로 앞둔 계획','며칠 안의 계획','언젠가 해볼 계획'],
  'dq-v1-0703':['도착한 순간','확인한 순간','실감한 순간'],
  'dq-v1-0705':['마무리해서 좋았던 일','생각대로 된 일','새롭게 해본 일'],
  'dq-v1-0709':['하고 싶은 일이 있어서','만날 사람이 있어서','새로 알게 될 일이 있어서'],
  'dq-v1-0716':['종이에 있는 것','화면에 있는 것','눈앞의 물건']
};
const axis={
  'dq-v1-0678':'방향을 바꾼 장소의 방문 빈도', 'dq-v1-0680':'집 안 공간의 기능', 'dq-v1-0688':'냉장고에 넣은 대상의 이전 상태',
  'dq-v1-0694':'웃음이 난 이유의 출처', 'dq-v1-0698':'신기함을 느낀 사건의 출처', 'dq-v1-0700':'계획까지 남은 시간의 단계',
  'dq-v1-0703':'소식을 받은 순간의 단계', 'dq-v1-0705':'만족을 느낀 결과의 이유', 'dq-v1-0709':'기대하게 된 이유', 'dq-v1-0716':'잠들기 전 다시 본 대상의 매체'
};
const rationale={
  'dq-v1-0678':'익숙함의 정도로 장소를 나누어 임의의 공원·카페 목록을 피했다.',
  'dq-v1-0680':'공간을 쉼·활동·이동의 기능으로 구분해 집 구조를 특정하지 않는다.',
  'dq-v1-0688':'포장·손질·남은 상태는 냉장고에 넣은 대상의 성격을 직접 설명한다.',
  'dq-v1-0694':'말·장면·내 행동이라는 원인 출처가 웃음의 이유에 직접 답한다.',
  'dq-v1-0698':'처음·예상 밖·새로 배움은 신기함을 만든 사건의 성격을 구분한다.',
  'dq-v1-0700':'곧·조금 뒤·언젠가라는 시간 거리가 계획 질문에 자연스럽게 맞는다.',
  'dq-v1-0703':'도착·확인·실감의 단계로 나누어 소식 내용이나 민감한 사생활을 노출하지 않는다.',
  'dq-v1-0705':'끝냄·순조로운 진행·새로운 성취라는 결과가 만족의 이유를 구분한다.',
  'dq-v1-0709':'하고 싶은 일·만남·새로운 앎이라는 이유가 서로 다른 기대를 보여 준다.',
  'dq-v1-0716':'읽기·보기·확인하기로 다시 본 대상의 사용 맥락을 구분한다.'
};
const byId=new Map(selection.map(e=>[e.id,e]));
if(ids.length!==10||new Set(ids).size!==10||ids.some(id=>byId.get(id)?.roomVerdict!=='SELECT')) throw new Error('Chunk4 selection mismatch');
export const entries=ids.map(id=>({id,question:byId.get(id).question,presetAxis:axis[id],roomChoices:choices[id],distinctChoices:'PASS',axisFit:'PASS',coverageFit:'PASS',naturalWording:'PASS',privacySafe:'PASS',applicabilitySafe:'PASS',choiceVerdict:'PASS',issueTags:[],rationale:rationale[id]}));
if(entries.some(e=>e.roomChoices.length!==3||new Set(e.roomChoices).size!==3)) throw new Error('invalid choices');
export const chunk4Ids=ids;
console.log(JSON.stringify({count:entries.length,ids},null,2));
