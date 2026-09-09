import { batch06 } from './question-bank.js';
import { entries as chunk1 } from './batch06-solo-editorial-chunk1.mjs';
import { entries as chunk2 } from './batch06-solo-editorial-chunk2.mjs';
import { entries as chunk3 } from './batch06-solo-editorial-chunk3.mjs';
import { entries as chunk4 } from './batch06-solo-editorial-chunk4.mjs';
import { entries as chunk5 } from './batch06-solo-editorial-chunk5.mjs';
import { entries as chunk6 } from './batch06-solo-editorial-chunk6.mjs';
const soloApplicability=new Map([...chunk1,...chunk2,...chunk3,...chunk4,...chunk5,...chunk6].map(e=>[e.id,e.applicabilityRisk]));
let selectedIds=['dq-v1-0603','dq-v1-0608','dq-v1-0612','dq-v1-0614','dq-v1-0615','dq-v1-0624','dq-v1-0628','dq-v1-0632','dq-v1-0634','dq-v1-0640','dq-v1-0622','dq-v1-0625','dq-v1-0630','dq-v1-0633','dq-v1-0637','dq-v1-0646','dq-v1-0650','dq-v1-0651','dq-v1-0662','dq-v1-0667','dq-v1-0678','dq-v1-0680','dq-v1-0688','dq-v1-0694','dq-v1-0698','dq-v1-0700','dq-v1-0703','dq-v1-0705','dq-v1-0709','dq-v1-0613','dq-v1-0616','dq-v1-0643','dq-v1-0648','dq-v1-0654','dq-v1-0660','dq-v1-0666','dq-v1-0673','dq-v1-0704','dq-v1-0716','dq-v1-0720'];
const high=new Set(selectedIds); if(high.size!==40) throw Error(high.size);
const overrides={}; for(const id of selectedIds) overrides[id]={roomFit:'HIGH',presetChoiceFit:'PASS',answerDiversity:'HIGH',socialInterest:'HIGH',privacyRisk:'LOW',roomVerdict:'SELECT',rationale:'질문이 짧고 공개 부담이 낮아 친구 답을 비교하기 좋다. 세 가지 preset으로 자연스럽게 나누면서 직접 적기도 열어 둘 수 있다.'};
let entries=batch06.map(q=>({id:q.id,question:q.text,category:q.category,dailySlot:q.dailySlot,roomFit:'LOW',applicabilityRisk:soloApplicability.get(q.id),presetChoiceFit:'FAIL',answerDiversity:'LOW',socialInterest:'LOW',privacyRisk:'LOW',roomVerdict:'EXCLUDE',rationale:'Solo 기록으로는 유효하지만 Room에서 답 비교와 preset 구성이 약하다.',...(overrides[q.id]||{})}));
const targeted={
  'dq-v1-0646':{roomFit:'MEDIUM',presetChoiceFit:'PASS',answerDiversity:'MEDIUM',socialInterest:'MEDIUM',rationale:'집안일의 종류가 사람마다 달라 답을 비교할 수 있지만, 친구 답 자체의 흥미는 중간 정도다. 세 preset은 실제 집안일 범주로 답하기 쉽고 공개 부담은 낮다.'},
  'dq-v1-0680':{roomFit:'HIGH',answerDiversity:'HIGH',socialInterest:'HIGH',rationale:'집 안에서 자주 간 공간은 사람마다 달라 서로의 생활 동선을 비교하는 재미가 있다. 장소 이름만으로 답할 수 있고 민감한 정보 없이 구체적인 장면을 남긴다.'},
  'dq-v1-0643':{roomFit:'MEDIUM',presetChoiceFit:'PASS',answerDiversity:'MEDIUM',socialInterest:'MEDIUM',rationale:'자리 이동 뒤 정돈한 대상은 생활 장면을 드러내면서도 짧게 답할 수 있다. 친구 답 비교는 가능하지만 행동이 없던 날에는 적용성이 중간으로 남는다.'},
  'dq-v1-0703':{roomFit:'HIGH',answerDiversity:'MEDIUM',socialInterest:'HIGH',privacyRisk:'MEDIUM',rationale:'기다리던 소식을 받은 순간은 연락·결과·일정처럼 서로 다른 답을 비교하기 좋다. 개인적인 내용은 직접 적지 않고도 사건의 종류만 공유할 수 있다.'},
  'dq-v1-0678':{roomFit:'HIGH',answerDiversity:'HIGH',socialInterest:'MEDIUM',rationale:'잠깐 방향을 바꾼 장소는 이동 중의 구체적인 선택을 떠올리게 한다. 장소가 사람마다 달라 비교할 수 있고, 이유를 공개하지 않아도 부담이 낮다.'},
  'dq-v1-0720':{roomFit:'MEDIUM',presetChoiceFit:'WEAK',answerDiversity:'HIGH',socialInterest:'HIGH',rationale:'하루를 대표하는 물건은 친구마다 전혀 다른 배경을 보여 주어 비교 재미가 크다. 다만 한 물건으로 압축하는 질문이라 세 preset의 자연스러운 범위가 좁아 Room 적합성은 중간이다.'}
};
const roomApplicabilityOverrides={
  'dq-v1-0613':'MEDIUM','dq-v1-0624':'MEDIUM','dq-v1-0628':'MEDIUM','dq-v1-0630':'MEDIUM','dq-v1-0640':'MEDIUM','dq-v1-0643':'MEDIUM','dq-v1-0646':'MEDIUM','dq-v1-0650':'MEDIUM','dq-v1-0680':'MEDIUM','dq-v1-0688':'MEDIUM','dq-v1-0703':'MEDIUM','dq-v1-0704':'MEDIUM','dq-v1-0716':'MEDIUM','dq-v1-0720':'MEDIUM'
};
const presetAxisById={
  'dq-v1-0603':'변화한 풍경의 대상 유형','dq-v1-0608':'사람들의 이동 방식','dq-v1-0612':'유리창에 비친 장면의 형태','dq-v1-0613':'사진을 찍게 된 장면의 이유','dq-v1-0614':'기다리며 본 대상의 종류','dq-v1-0615':'새로 생긴 풍경의 변화','dq-v1-0616':'눈에 들어온 대상의 유형','dq-v1-0622':'먼저 말을 건 관계','dq-v1-0624':'부탁한 사람의 관계','dq-v1-0625':'인사한 사람의 관계','dq-v1-0628':'도움을 청한 사람의 관계','dq-v1-0630':'소식을 전한 사람의 관계','dq-v1-0632':'소식을 전한 사람의 관계','dq-v1-0633':'함께 웃은 사람의 관계','dq-v1-0634':'반가운 연락의 사람 관계','dq-v1-0637':'작별한 사람의 관계','dq-v1-0640':'반복 확인한 일의 종류','dq-v1-0643':'정돈한 대상의 종류','dq-v1-0646':'끝낸 집안일의 종류','dq-v1-0648':'순서를 바꾼 일의 종류','dq-v1-0650':'외출 뒤 정리한 대상','dq-v1-0651':'자주 쓴 도구의 종류','dq-v1-0654':'쉬었다 재개한 일의 종류','dq-v1-0660':'빛이 느껴진 장소·광원','dq-v1-0662':'음식 향의 계열','dq-v1-0666':'반복된 소리의 출처','dq-v1-0667':'선명한 색의 계열','dq-v1-0673':'오래 머문 자리의 공간','dq-v1-0678':'방향을 바꾼 장소의 유형','dq-v1-0680':'자주 간 실내 공간','dq-v1-0688':'냉장고에 넣은 식품 유형','dq-v1-0694':'웃음이 난 사건의 이유','dq-v1-0698':'신기했던 일의 종류','dq-v1-0700':'기대하게 한 계획의 종류','dq-v1-0703':'받은 소식의 유형','dq-v1-0704':'통한 방법의 유형','dq-v1-0705':'만족스러웠던 일의 종류','dq-v1-0709':'기대 이유의 유형','dq-v1-0716':'잠들기 전 다시 본 대상','dq-v1-0720':'하루를 대표하는 물건의 유형'
};
const rationaleById={
  'dq-v1-0603':'갑자기 달라진 풍경은 친구마다 전혀 다른 장소 장면을 꺼내 비교하는 재미가 있다. 변화의 원인별 세 갈래로 preset을 나누기 쉽다.',
  'dq-v1-0608':'횡단보도에서 본 움직임은 같은 장소라도 사람마다 다른 속도와 흐름을 보여 준다. 걷기·뛰기·멈춤처럼 행동 축이 선명하다.',
  'dq-v1-0612':'유리창에 비친 모습은 날씨와 시간에 따라 답이 달라져 서로의 시선을 엿볼 수 있다. 사람·거리·실내 반사로 preset을 구분할 수 있다.',
  'dq-v1-0613':'사진을 찍은 이유는 각자의 하루에서 인상 깊었던 장면을 드러낸다. 풍경·사람·사물처럼 촬영 대상을 기준으로 선택지를 만들 수 있다.',
  'dq-v1-0614':'기다리는 동안 본 것은 짧은 공백에 무엇이 눈에 들어왔는지 비교하게 한다. 사람·물건·풍경으로 답의 방향이 자연스럽게 갈린다.',
  'dq-v1-0615':'새로 생긴 풍경은 동네와 집 안에서 발견한 작은 변화를 공유하게 한다. 공사·장식·자연 변화처럼 세 갈래 preset이 가능하다.',
  'dq-v1-0616':'뜻밖에 눈에 들어온 대상은 친구마다 관찰 포인트가 달라 대화거리가 된다. 사람·동물·사물로 선택지를 나누기 좋다.',
  'dq-v1-0622':'먼저 말을 건 사람은 관계와 상황의 차이를 보여 주어 친구 답을 비교하기 좋다. 가족·친구·일하는 사람처럼 관계 축이 직접적이다.',
  'dq-v1-0624':'작은 부탁을 한 사람은 하루 속 도움의 장면을 부담 없이 공유하게 한다. 부탁한 관계를 세 범주로 나누면 preset이 자연스럽다.',
  'dq-v1-0625':'웃으며 인사한 사람은 따뜻한 사회적 순간을 서로 발견하게 한다. 가족·친구·이웃처럼 관계별 답이 잘 갈린다.',
  'dq-v1-0628':'도움을 청한 사람은 오늘 누군가와 연결된 장면을 남긴다. 부탁의 상대를 관계 유형으로 나누면 짧은 선택지가 된다.',
  'dq-v1-0630':'오랜만의 소식은 각자 다른 사람과 재연결된 이야기를 끌어낸다. 친구·가족·동료로 preset을 나누기 쉽다.',
  'dq-v1-0632':'새 소식을 전한 사람은 정보보다 사람 사이의 순간에 초점을 둔다. 연락 관계를 세 가지로 나누면 답 비교가 선명하다.',
  'dq-v1-0633':'함께 웃은 사람은 같은 하루에도 서로 다른 즐거운 장면을 보여 준다. 관계별 선택지가 직접 답이 된다.',
  'dq-v1-0634':'반가운 연락의 상대는 친구마다 전혀 달라 서로의 오늘을 알아가는 재미가 있다. 연락한 관계를 세 갈래로 구분할 수 있다.',
  'dq-v1-0637':'작별 인사를 한 사람은 만남의 끝이라는 구체적인 장면을 남긴다. 가족·친구·동료 등 관계 축이 자연스럽다.',
  'dq-v1-0640':'두 번 확인한 일은 각자 반복하게 되는 생활 습관을 비교하게 한다. 안전·일정·물건 확인처럼 행동 축을 세울 수 있다.',
  'dq-v1-0643':'자리를 옮긴 뒤 정돈한 대상은 공간과 행동을 함께 보여 준다. 책상·가방·주변 물건으로 preset을 분리할 수 있다.',
  'dq-v1-0646':'가장 먼저 끝낸 집안일은 서로의 아침 루틴 차이를 가볍게 비교하게 한다. 청소·정리·세탁처럼 실제 행동 축이 있다.',
  'dq-v1-0648':'순서를 바꾼 일은 같은 하루에도 각자 다른 대응 방식을 보여 준다. 일·식사·이동처럼 바꾼 활동 기준으로 나눌 수 있다.',
  'dq-v1-0650':'외출 뒤 첫 정리는 귀가 후 습관을 비교하게 해 생활 이야기가 생긴다. 옷·가방·손 씻기처럼 행동 preset이 가능하다.',
  'dq-v1-0651':'자주 손이 간 도구는 각자의 하루 작업과 취향을 드러낸다. 필기·조리·디지털 도구처럼 용도 축이 선명하다.',
  'dq-v1-0654':'쉬었다 다시 시작한 일은 각자의 집중 흐름을 구체적으로 보여 준다. 일·공부·집안일로 선택지를 나누기 좋다.',
  'dq-v1-0660':'유난히 밝았던 빛은 친구마다 다른 장소와 시간의 시선을 공유하게 한다. 햇빛·전등·간판처럼 광원 축이 직접적이다.',
  'dq-v1-0662':'음식의 첫 향은 같은 식사라도 감각 기억이 달라 비교가 즐겁다. 달콤함·고소함·매콤함처럼 향의 계열을 나눌 수 있다.',
  'dq-v1-0666':'멀리서 반복된 소리는 서로 다른 동네와 실내 풍경을 상상하게 한다. 차량·사람·기계처럼 출처별 preset이 자연스럽다.',
  'dq-v1-0667':'선명했던 색은 친구마다 포착한 대상이 달라 시각적 대화가 된다. 따뜻한색·차가운색·무채색으로 세 갈래를 만들 수 있다.',
  'dq-v1-0673':'오래 머문 자리는 하루의 중심 공간을 보여 주어 서로의 생활 리듬을 비교한다. 집·일·이동 공간으로 구분할 수 있다.',
  'dq-v1-0678':'잠깐 방향을 바꾼 장소는 이동 중의 작은 선택을 공유하게 한다. 가게·공원·건물처럼 장소 유형이 분명하다.',
  'dq-v1-0680':'집 안에서 자주 간 곳은 사람마다 다른 생활 동선을 드러낸다. 주방·방·욕실처럼 공간 preset이 직접 답이 된다.',
  'dq-v1-0688':'냉장고에 넣은 것은 귀가 뒤의 구체적인 생활 장면을 남긴다. 음료·과일·반찬처럼 식품 유형으로 나누기 쉽다.',
  'dq-v1-0694':'뜻밖의 웃음은 각자 다른 말과 사건에서 생겨 친구 답을 보고 싶게 한다. 대화·영상·실수 아닌 상황 등 원인 축을 둘 수 있다.',
  'dq-v1-0698':'신기하다고 느낀 일은 일상의 작은 발견을 서로 비교하게 한다. 자연·사람·기술처럼 사건의 출처를 세 갈래로 나눌 수 있다.',
  'dq-v1-0700':'작은 기대를 품은 계획은 친구마다 기다리는 다음 장면이 다름을 보여 준다. 만남·취미·할 일처럼 계획 유형이 자연스럽다.',
  'dq-v1-0703':'기다리던 소식을 받은 순간은 결과가 온 방식과 의미가 달라 비교할 만하다. 연락·결과·일정으로 preset을 구분할 수 있다.',
  'dq-v1-0704':'새로운 방법이 통했던 때는 각자의 문제 해결 경험을 가볍게 나누게 한다. 일·정리·요리 등 적용 장면별 선택이 가능하다.',
  'dq-v1-0705':'조용히 만족스러웠던 일은 크지 않은 성취를 서로 발견하게 한다. 정리·완료·휴식처럼 결과의 종류로 답을 나눌 수 있다.',
  'dq-v1-0709':'내일이 기대된 이유는 각자의 다음 일정과 관심사를 보여 준다. 사람·장소·활동으로 선택지를 세울 수 있다.',
  'dq-v1-0716':'잠들기 전 다시 본 대상은 하루의 마지막 시선을 비교하게 한다. 화면·책·창밖처럼 대상 유형이 직접적이다.',
  'dq-v1-0720':'하루를 설명하는 물건은 사람마다 다른 생활 배경을 압축해 보여 준다. 먹는 것·쓰는 것·들고 다니는 것으로 preset을 나눌 수 있다.'
};
const reserveIds=['dq-v1-0604','dq-v1-0619','dq-v1-0627','dq-v1-0638','dq-v1-0641','dq-v1-0657','dq-v1-0672','dq-v1-0676','dq-v1-0696','dq-v1-0708'];
entries=entries.map(e=>{const base=targeted[e.id]?({...e,...targeted[e.id]}):e; if(reserveIds.includes(e.id)) return {...base,roomVerdict:'RESERVE',roomApplicabilityRisk:base.applicabilityRisk,roomFit:'MEDIUM',presetChoiceFit:'PASS',answerDiversity:'MEDIUM',socialInterest:'MEDIUM',privacyRisk:'LOW',presetAxis:'질문 사건의 세부 유형',rationale:'질문에 답할 수 있고 Room에서도 비교 가치가 있으나 현재 SELECT보다 우선순위가 낮다.'}; return {...base,roomApplicabilityRisk:roomApplicabilityOverrides[e.id]||base.applicabilityRisk,presetAxis:presetAxisById[e.id]||'질문의 답을 세 가지 의미 축으로 구분',rationale:rationaleById[e.id]||base.rationale};});
const swaps=[['dq-v1-0613','dq-v1-0604'],['dq-v1-0643','dq-v1-0619'],['dq-v1-0646','dq-v1-0657'],['dq-v1-0650','dq-v1-0672'],['dq-v1-0704','dq-v1-0676'],['dq-v1-0720','dq-v1-0627']];
for(const [outId,inId] of swaps){selectedIds=selectedIds.filter(id=>id!==outId);selectedIds.push(inId);} selectedIds=['dq-v1-0603','dq-v1-0604','dq-v1-0608','dq-v1-0612','dq-v1-0614','dq-v1-0615','dq-v1-0616','dq-v1-0619','dq-v1-0622','dq-v1-0624','dq-v1-0625','dq-v1-0627','dq-v1-0628','dq-v1-0630','dq-v1-0632','dq-v1-0633','dq-v1-0634','dq-v1-0637','dq-v1-0640','dq-v1-0648','dq-v1-0651','dq-v1-0654','dq-v1-0657','dq-v1-0660','dq-v1-0662','dq-v1-0666','dq-v1-0667','dq-v1-0672','dq-v1-0673','dq-v1-0676','dq-v1-0678','dq-v1-0680','dq-v1-0688','dq-v1-0694','dq-v1-0698','dq-v1-0700','dq-v1-0703','dq-v1-0705','dq-v1-0709','dq-v1-0716'];
entries=entries.map(e=>{if(swaps.some(([,id])=>id===e.id))return {...e,roomVerdict:'SELECT',roomApplicabilityRisk:e.applicabilityRisk,roomFit:'HIGH',presetChoiceFit:'PASS',answerDiversity:'HIGH',socialInterest:'HIGH',privacyRisk:'LOW',presetAxis:presetAxisById[e.id]||'질문의 답을 세 가지 의미 축으로 구분',rationale:`${e.question}은 친구마다 다른 장면을 떠올리게 해 답을 비교하기 좋다. 답의 대상과 상황을 세 갈래로 나눌 수 있어 preset 선택도 자연스럽다.`};if(swaps.some(([id])=>id===e.id))return {...e,roomVerdict:'RESERVE'};return e;});const roomSwapOut='dq-v1-0632', roomSwapIn='dq-v1-0696';
selectedIds=selectedIds.map(id=>id===roomSwapOut?roomSwapIn:id);
entries=entries.map(e=>e.id===roomSwapOut?{...e,roomVerdict:'RESERVE'}:e.id===roomSwapIn?{...e,roomVerdict:'SELECT',roomApplicabilityRisk:e.applicabilityRisk,roomFit:'HIGH',presetChoiceFit:'PASS',answerDiversity:'HIGH',socialInterest:'HIGH',privacyRisk:'LOW',presetAxis:'노래에서 기억에 남은 요소',rationale:'노래에서 기억된 요소가 사람마다 달라 답을 비교하기 좋다. 가사·멜로디·분위기로 선택지를 나누어 직접 적기도 열어 둔다.'}:e);if(entries.length!==120||entries.filter(e=>e.roomVerdict==='SELECT').length!==40)throw Error('invalid'); export {entries,selectedIds}; console.log(JSON.stringify({selectedIds,count:entries.length},null,2));
