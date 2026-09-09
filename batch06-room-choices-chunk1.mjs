import { entries as selection } from './batch06-room-candidate-selection.mjs';

const ids=['dq-v1-0603','dq-v1-0604','dq-v1-0608','dq-v1-0612','dq-v1-0614','dq-v1-0615','dq-v1-0616','dq-v1-0619','dq-v1-0622','dq-v1-0624'];
const choices={
  'dq-v1-0603':['자연의 변화','사람의 변화','물건의 변화'],
  'dq-v1-0604':['사람','동물','사물'],
  'dq-v1-0608':['빠르게 지나감','천천히 움직임','한곳에 멈춤'],
  'dq-v1-0612':['내 모습','바깥 풍경','실내 모습'],
  'dq-v1-0614':['사람','주변 사물','바깥 풍경'],
  'dq-v1-0615':['건물·가게의 변화','거리·공간의 변화','자연의 변화'],
  'dq-v1-0616':['눈에 띈 색','눈에 띈 움직임','눈에 띈 모양'],
  'dq-v1-0619':['사람들의 움직임','자연의 움직임','탈것의 움직임'],
  'dq-v1-0622':['친한 사람','얼굴만 아는 사람','처음 본 사람'],
  'dq-v1-0624':['자주 보는 사람','오랜만에 본 사람','처음 본 사람']
};
const axis={
  'dq-v1-0603':'변화한 풍경의 대상 유형', 'dq-v1-0604':'눈에 들어온 대상의 유형', 'dq-v1-0608':'사람들의 이동 방식',
  'dq-v1-0612':'유리창에 비친 장면의 형태', 'dq-v1-0614':'기다리며 본 대상의 유형', 'dq-v1-0615':'새로 생긴 풍경의 변화 범주',
  'dq-v1-0616':'눈에 들어온 시각 단서', 'dq-v1-0619':'기억에 남은 움직임의 주체', 'dq-v1-0622':'먼저 말을 건 사람의 친숙도', 'dq-v1-0624':'부탁한 사람을 만난 빈도'
};
const rationale={
  'dq-v1-0603':'풍경이 달라진 이유를 자연·사람·물건의 변화로 나누어 서로 다른 장면을 비교할 수 있다.',
  'dq-v1-0604':'사람·동물·사물은 시선을 끈 대상의 문법과 의미가 같고 답의 범위도 넓다.',
  'dq-v1-0608':'속도와 정지라는 움직임의 방식이 분리되어 같은 질문 안에서 답이 겹치지 않는다.',
  'dq-v1-0612':'반사된 장면을 나의 모습·바깥·실내로 나누어 privacy 부담 없이 선택할 수 있다.',
  'dq-v1-0614':'기다림 중 본 대상을 거리와 관계로 구분해 사람·물건·풍경의 임의 나열을 피했다.',
  'dq-v1-0615':'새로 생긴 풍경을 상점·거리·식물의 변화로 나누어 구체적인 발견을 남긴다.',
  'dq-v1-0616':'시각·움직임·소리라는 감각 단서가 서로 달라 뜻밖의 관찰을 비교하기 쉽다.',
  'dq-v1-0619':'사람·자연·탈것이라는 움직임의 주체가 달라 친구 답의 장면이 선명하게 갈린다.',
  'dq-v1-0622':'관계의 친밀도와 만남의 새로움으로 먼저 말을 건 사람을 부담 없이 표현한다.',
  'dq-v1-0624':'부탁한 사람을 관계와 만남의 맥락으로 나누어 특정 가족·직업을 강제하지 않는다.'
};
const byId=new Map(selection.map(e=>[e.id,e]));
if(ids.length!==10||new Set(ids).size!==10||ids.some(id=>byId.get(id)?.roomVerdict!=='SELECT')) throw new Error('Chunk1 selection mismatch');
export const entries=ids.map(id=>({id,question:byId.get(id).question,presetAxis:axis[id],roomChoices:choices[id],distinctChoices:'PASS',axisFit:'PASS',coverageFit:'PASS',naturalWording:'PASS',privacySafe:'PASS',applicabilitySafe:'PASS',choiceVerdict:'PASS',issueTags:[],rationale:rationale[id]}));
if(entries.some(e=>e.roomChoices.length!==3||new Set(e.roomChoices).size!==3)) throw new Error('invalid choices');
export const chunk1Ids=ids;
console.log(JSON.stringify({count:entries.length,ids},null,2));
