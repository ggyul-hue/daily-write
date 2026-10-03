# Daily Write — MASTER_PRODUCT_PLAN_V1

**Baseline date:** 2026-10-03  
**Purpose:** 합의된 제품 방향과 현재 구현을 하나의 제품 기준선으로 연결한다.  
**Scope:** 제품 계획과 current implementation 비교. 이 문서 작성 과정에서 코드, 사용자 데이터, DB, 테스트, 배포 상태는 변경하지 않았다.

## Status definitions

- **DONE** — 현재 제품에서 실제 사용 가능하고 의도한 목적을 대체로 충족한다.
- **PARTIAL** — 일부 흐름은 작동하지만 이해도, 완성도, 연결성 또는 복구가 남았다.
- **NOT_STARTED** — 계획된 기능이 구현되지 않았다.
- **DEFERRED** — 합의에 따라 의도적으로 후순위에 뒀다.
- **NEEDS_DECISION** — 제품 정책을 먼저 결정해야 한다.
- **UNKNOWN** — 현재 코드와 알려진 계획으로 판단할 수 없다.

이 baseline은 저장소 문서에 적힌 항목만을 제품 계획으로 간주하지 않는다. 사용자가 제공한 KNOWN PRODUCT PLAN과 현재 저장소 코드, 직전 audit의 근거를 함께 사용한다. 특히 Room 우선순위는 낮게 유지하고 Solo daily loop를 우선한다.

## PRODUCT_VISION

Daily Write는 하루 한 질문에 답을 남기며 나의 시간을 작은 동물과 함께 쌓아가는 Solo 기록 앱이다.  
첫 방문에서 동물을 고르고 이름을 지은 뒤, 매일 세 질문 중 하나에 짧게 답한다.  
답변은 조각이 되고, 조각을 건네면 캐릭터의 행동과 성장, 정원에 남는 변화로 이어진다.  
질문 선택의 Growth 분류와 trait는 내부 성장 경험을 위한 것이며, 사용자를 성격 유형으로 분석하거나 점수화하는 목적이 아니다.  
사용자는 지난 답변을 다시 읽고, 월간 회고와 Keepsake로 기록을 함께 보관한다.  
개인 기록 루프와 기록 소유권이 제품의 중심이며 Room/Shared는 별도 축이지만 현재 낮은 우선순위다.  
C3 Daily Selector와 Garden Reward V1은 production 배포 완료 기준선이다.

## MASTER_FEATURE_MATRIX

| Area | Intent | Current | Status | Missing | Phase |
|---|---|---|---|---|---|
| Entry / first visit | 처음 방문해 다음 행동을 쉽게 시작 | 신규 사용자는 adoption 화면을 거쳐 garden 진입; 별도 tutorial 없음 | PARTIAL | 첫 세션의 “오늘 질문에 답하고 조각을 준다”는 흐름 설명 | A |
| Adoption | 아이와 정서적 관계를 시작 | 종/variant 후보를 보고 입양 확정 | DONE | — | Done |
| Initial naming | 입양 시 이름을 정해 개인화 | adoption 중 이름 입력 후 프로필 저장 | DONE | — | Done |
| Tutorial | 질문→답변→조각→먹이기→성장을 이해 | 별도 tutorial 없음; 질문 화면과 조각 CTA의 순간 안내에 의존 | NOT_STARTED | 단계 순서와 backend 필요 상황을 첫 사용자에게 연결 | A |
| Daily question | 매일 부담이 적은 질문 선택 | 하루 질문 세 개를 보여주고 선택한 한 문항을 저장; C3 production 배포 완료 | DONE | — | Done |
| Writing | 짧고 안전한 일기 답변 | 한 문항 답변, 최대 100자, 저장 및 미소비 상태 수정 | PARTIAL | 소비 후 오기입 수정/삭제 정책, 오류 복구 설명 | A/B |
| Fragment creation | 답변이 조각 보상으로 이어짐 | 답변 저장 뒤 pending fragment를 만들고 backend와 동기화; 중복 날짜 방지/복구 코드 존재 | PARTIAL | backend 실패 시 사용자에게 상태와 복구 완료 여부를 분명히 보임 | A |
| Feed interaction / feed motion | 사용자가 조각을 건네는 행동을 따뜻하게 전달 | CTA “주기”, 로딩 문구, 조각이 캐릭터 쪽으로 이동하는 Web Animation helper가 있음; 성공 후 pose 반응도 있음 | PARTIAL | 알려진 계획의 완성된 먹이기 연출은 미완료로 취급; 접근성·실패/취소·저사양 동작까지 제품 경험 검증 | A |
| Growth | 기록한 만큼 아이가 자라고 성장은 14에서 신체적으로 완결 | backend growth_points, BABY/SMALL/GROWING/GROWN 및 성장 반응; 3/7/14 threshold | DONE | 점수 경제 변경 불필요; 안내 흐름에서 성장 원인을 명확히 연결 | C |
| Trait / personality | 질문 성향이 캐릭터 행동에 조용히 반영 | 네 trait가 pose 가중치를 바꾸고 Pet Record에 설명 문구로 표시 | PARTIAL | 통계상 차이가 일상에서 알아차려지는지와 사용자 설명 수준을 검증; Seed/점수 노출 금지 | C |
| Garden | 기록 시간이 공간에 영구 흔적을 남김 | growth_points에서 21/30/45/60/90 오브젝트 누적; Garden Reward V1 production 배포 완료 | DONE | 90 이후 장기 의미를 결정 | C |
| Pet Record | 함께 키운 아이의 기록을 되돌아봄 | 이름, 종, 성장 단계, 포인트/조각, trait와 진행 막대 표시 | PARTIAL | 생애 기록·대표 순간·trait 변화 등의 “내가 키운 기록” 의미 강화 | C |
| Archive / past answers | 이전 일기를 날짜로 찾아 다시 읽음 | 월 달력, 기록 목록, 답변 상세. 미소비 답변은 수정 가능; 삭제 경로 확인되지 않음 | PARTIAL | 검색/필터 필요성, 소비된 답변의 수정과 삭제 원칙, 삭제 UX | B |
| Monthly Review | 한 달의 기록과 캐릭터를 함께 회고 | 월간 요약·월 기록 표시; 펫 상태가 준비되면 trait/stage 언급 | PARTIAL | 회고가 선택 기록·성장 변화와 더 잘 연결되는지 제품 검증 | B |
| Keepsake | 완료된 달을 보관 가능한 한 장으로 남김 | 월 대표 기록을 모아 보관 페이지 구성 | DONE | 개인 기록 기준에서 선택 기준을 이해시키는 카피 검토 | B |
| Export / Share | Keepsake를 기기 밖에 저장하거나 공유 | PNG download; `navigator.share` 지원 시 파일 공유, 미지원 시 저장 fallback | PARTIAL | 브라우저별 성공/실패 경험을 제품 환경에서 확인 | B |
| Settings | 앱 선호와 계정/기록 관리를 이해하고 조정 | 종 선호 등 일부 preferences; 별도 계정 관리 화면은 확인되지 않음 | PARTIAL | 설정의 범위 및 저장 데이터 상태 안내 | B |
| Pet rename | 확정된 이름을 나중에 바꾸기 | 정상 입양 경로는 이름을 finalized로 저장하여 변경 UI가 숨겨짐; 기본 표시명 등 미확정 레거시 상태에만 이름 설정 UI가 나타날 수 있음 | DEFERRED | 별도 rename 기능은 Step 6 성격의 후속 작업으로 유지 | Later / Step 6 |
| Data ownership / backup / delete | 기록을 사용자가 소유·이동·복구·삭제 | Solo 답변은 브라우저 localStorage, 기기 간 자동 동기화 없음 | NEEDS_DECISION | 아래 네 정책을 각각 결정 | B |
| Error / recovery | 실패에도 답변과 보상 상태를 안전하게 회복 | fragment pending 재시도/복구; Room 일반 오류; localStorage parse fallback | PARTIAL | 로컬 손상 데이터 복구/내보내기, backend 연결 상태의 더 구체적인 안내 | A/B |
| Room / Shared | 친구와 답하고 서로의 답을 열어봄 | UI, Supabase backend, 방 생성·참여·일일 질문·답변 흐름이 코드에 있음; 이전 production smoke에서 backend 준비 실패 관측 | PARTIAL | 현재 production 가용성 확인과 backend 오류 해결; 낮은 우선순위 유지 | D |
| Long-term progression | 장기 기록에 압박 없이 새 의미를 더함 | 신체 성장 14pt 종료, garden reward 90pt까지, 월간 회고/Keepsake | PARTIAL | 90pt 이후의 의미 및 반복 사용 동기를 결정; streak/실패 penalty로 해결하지 않음 | C |
| Question classification / Daily composition | 질문 풀에서 기록과 캐릭터 성향을 균형 있게 제공 | 1,500 질문/분류 자료, C3 selector 배포 기준; Growth/Memory 분류는 내부 동작 | DONE | 분류명, 점수, 분석 결과를 사용자에게 노출하지 않음 | Done |

## PRIMARY_SOLO_JOURNEY

| Journey step | Status | User experience and breakpoints |
|---|---|---|
| First visit | PARTIAL | Adoption 화면은 있으나 tutorial 없이 시작하므로 제품 루프 전체는 설명되지 않는다. |
| Adoption | DONE | 후보 중 아이를 고르고 확정한다. |
| Naming | DONE | 초기 입양 흐름에서 이름을 저장한다. |
| Garden | DONE | 아이와 현재 공간을 보며 이후 행동의 home base가 된다. |
| Daily questions | DONE | 세 질문이 표시되고 C3는 production 배포 완료다. |
| Choose one | DONE | 하루 한 문항을 선택한다. |
| Write | DONE | 답변을 로컬에 저장하며 최대 100자다. |
| Fragment | PARTIAL | 로컬 대기 상태 생성은 답변 뒤 이어지지만 서버 claim은 backend 연결 상태에 좌우된다. |
| Feed | PARTIAL | 먹이기 CTA와 token flight helper가 있지만, 알려진 계획의 완성형 먹이기 연출은 남아 있고 backend가 막히면 행동할 수 없다. |
| Growth | DONE | 성공한 소비가 server-side growth point와 단계에 반영된다. |
| Trait | PARTIAL | 내부 행동 가중치와 기록 문구는 있으나 “성격이 생겼다”는 체감은 확인이 필요하다. |
| Garden reward | DONE | 21/30/45/60/90 누적 오브젝트가 production 배포됐다. |
| Archive / monthly revisit | PARTIAL | 월별 재열람과 회고/Keepsake는 있으나 검색 및 수정·삭제 정책이 완결되지 않았다. |

**명확한 끊김:** Solo 답변 저장은 backend 없이도 가능하지만 조각 claim/먹이기/성장은 backend를 필요로 한다. 따라서 “답변을 남겼다”에서 “아이에게 변화가 생겼다”로 넘어가는 구간이 설정/연결 문제에 민감하다. Tutorial이 없어 새 사용자가 이 관계를 알아채기 어려울 수 있다. Room 실패는 핵심 Solo 여정과 분리해 다루며 이 우선순위를 바꾸지 않는다.

## A–I PRODUCT REASSESSMENT

### A. Tutorial

- **현재 설명 충분성:** 부족할 가능성이 높다. adoption과 질문 안내는 행동별로 있으나 fragment 생성→먹이기→성장까지 연결한 첫 사용 흐름은 별도 tutorial에 없다.
- **Tutorial 없이 이해 가능?:** 각 화면의 단일 행동은 가능하지만, 조각이 언제 생기며 backend가 필요한 이유까지 자연스럽게 추론하기는 어렵다.
- **Status:** `NOT_STARTED`; Phase A에서 가벼운 단계 안내 또는 첫 회 경험을 설계한다.

### B. Feed motion

- **현재 구현:** token을 fragment CTA 위치에서 pet 위치까지 이동시키는 Web Animation helper가 코드에 있고 consume 성공 이후 milestone/일반 pose 반응이 있다.
- **기획 기준:** 알려진 계획에서 “feed motion / 먹이기 연출은 아직 미구현”이므로 helper의 존재만으로 계획된 feed 경험을 완료 처리하지 않는다. 현재 제품 상태는 `PARTIAL`로 기록한다.
- **남은 일:** 실제 흐름에서 token 이동, 먹는 pose/피드백, 성공·실패, reduced-motion 접근성을 검증하고 feed 경험 기준을 확정한다. 조각 token이 날아가는 구현을 곧바로 더 확장하는 것이 우선이라는 뜻은 아니다.

### C. Pet rename

- 정상 adoption은 이름을 finalized로 저장한다. 기록 화면의 “이름 정하기” 편집기는 확정된 이름에는 감춰진다.
- 레거시/기본 이름 상태에 한정된 편집 코드는 별도 post-adoption rename 제품 기능과 다르다.
- **Status:** `DEFERRED`; 알려진 계획대로 Step 6 성격의 후속으로 둔다.

### D. Trait

- walker/sleepy/collector/reader가 각각 걷기·잠들기·들기·읽기 행동 가중치를 바꾼다. UI에는 친근한 설명 문구가 나온다.
- trait는 표시·동작 연결이 존재하므로 기능 자체는 부분 구현 이상이지만, 반복 관찰 없이 사용자가 성격을 눈치채는지는 별도 체감 QA가 필요하다.
- **Status:** `PARTIAL`. seed/점수/성격 분석 결과를 노출하지 않는다.

### E. Pet Record

- 현재는 이름, 분류, stage, 함께한 조각 수, 성격, 진행도 중심의 상태 카드다.
- “내가 키운 기록”의 완전한 연대기나 대표 순간 모음이라기보다 현재 프로필/성장 요약에 가깝다.
- **Status:** `PARTIAL`; Archive/월간 기록과 묶이는 관계 기억은 후속 설계 대상이다.

### F. Archive

- 달력·월 기록·답변 상세와 미소비 답변 수정은 가능하다.
- 키워드 검색/필터 및 삭제가 없다. 소비된 답변은 수정 잠금 정책이며, 예외/삭제 절차는 확인되지 않는다.
- **Status:** `PARTIAL`; 수정·삭제·보존 정책부터 확정한다.

### G. Monthly / Keepsake

- **구현 존재:** 월별 기록 회고, 완료 월의 대표 기록 보관 화면, PNG 저장 및 가능한 환경의 공유 경로가 있다.
- **경험 완성:** 코어 기능은 존재하지만 monthly review가 성장 여정과 충분히 연결되는지, 파일 생성·공유가 주요 브라우저에서 일관적인지는 운영 확인 대상이다.
- **Status:** 회고 `PARTIAL`, Keepsake 생성 `DONE`, Export/Share `PARTIAL`.

### H. Data ownership — four independent decisions

| Policy | Current | Status | Decision needed |
|---|---|---|---|
| Backup | 앱 내 Solo 전체 백업 경로 확인되지 않음. 브라우저 저장소 자체는 사용자가 외부 도구로 관리해야 함 | NEEDS_DECISION | 지원할 백업 형식·범위와 백업 시점 |
| Restore | 앱 UI의 복원/기기 이전 경로 확인되지 않음 | NEEDS_DECISION | 백업으로부터 복구하는 경로와 충돌 처리 |
| Delete | 앱 내 전체 기록/계정 삭제 경로 확인되지 않음 | NEEDS_DECISION | 개별 답변·전체 로컬 기록·Room/server 데이터 각각의 삭제 정책 |
| Device migration | README상 Solo는 브라우저별 localStorage이며 자동 동기화 없음 | NEEDS_DECISION | 수동 이동, 사용자 계정 sync, 또는 local-only를 명시적으로 유지할지 |

이 네 항목은 아직 확정 제품 정책이 아니다. 이 문서에서 sync나 cloud backup을 확정 기능으로 제안하지 않는다.

### I. Room

- Room 구현 상태를 matrix에 보존하되 우선순위 backlog의 기본 순서는 Solo core experience, data safety, reflection, long-term 순으로 둔다.
- 현재 backend 연결은 이전 smoke에서 실패한 이력이 있으나, 이 문서 작성 시 production 재접속/DB 요청을 하지 않아 가용성은 `UNKNOWN`이다.
- 별도 Room Phase D에서 안전한 환경 기준으로 상태를 재확인한다.

## NOT_STARTED

- Tutorial 또는 first-run guided explanation: 계획상 필요, 현재 독립 tutorial 없음.
- Backup, restore, delete, device migration 정책을 제품 기능으로 완성: 아직 결정되지 않았고 앱 경로도 확인되지 않음. 정책 결정을 먼저 진행한다.

## PARTIAL

- **First-use understanding:** 행동별 안내는 있으나 전체 Solo loop 설명이 없다.
- **Writing recovery:** 작성과 미소비 수정은 가능하지만 소비 후 수정·삭제 원칙이 불완전하다.
- **Fragment → feed → growth continuity:** answer와 pending fragment 복구 경로는 있지만 backend 의존 구간이 사용자에게 완결적으로 설명되지 않는다.
- **Feed experience:** token flight helper와 pose feedback이 있지만 알려진 계획의 먹이기 경험은 완료되지 않았다.
- **Trait & Pet Record:** 기능·표시가 있으나 장기간 키운 느낌과 trait 체감은 더 검증해야 한다.
- **Archive / monthly / export:** 기본 재열람/회고/보관은 구현됐지만 검색, 수정·삭제 원칙, browser share 일관성은 남았다.
- **Room:** code path는 존재하나 이전 production smoke 실패와 현재 상태 미확인.
- **Long-term:** 90점까지의 보상은 있으나 이후 지속 경험은 정해지지 않았다.

## DEFERRED

- **Standalone pet rename UI** — 초기 naming과 구별되는 post-adoption 기능; Step 6 성격의 후속 작업.
- **Room / Shared 개선** — 제품에 남기되 Solo daily loop 완성 뒤 Phase D에서 다룬다.
- **Room v3 user-facing activation** — architecture/schema 작업 상태와 별도로 실제 runtime 활성화를 후속 검토한다.

## NEEDS_DECISION

- Backup 형식/범위.
- Restore와 기기 이전의 지원 방식.
- 답변 개별 삭제 및 전체 데이터 삭제 범위와 보존 규칙.
- local-only 지속 여부 또는 계정 기반 이동/동기화 방향.
- 90점 이후 장기 progression이 추가 보상을 필요로 하는지, 월간 회고·정원 보존으로 충분한지.
- 검색/필터와 Keepsake 내보내기 UX를 제품의 필수 범위로 둘지.

## UNKNOWN

- 공유 Room의 현재 production backend 가용성. 이전 smoke 실패 이후 이번 작업에서는 재확인하지 않았다.
- 주요 production 브라우저에서 token animation/fragment feed motion 및 keepsake share의 현재 호환성.
- 앱 밖에 존재하는 상세 제품 계획의 추가 결정 사항.

## PHASE_PLAN

### PHASE A — Solo Daily Loop Completion

1. First-run 경험에서 질문→답변→조각→먹이기→성장 관계를 짧고 부드럽게 설명할지 설계한다.
2. Fragment claim/consume 실패 시 상태 메시지와 재시도 후 회복을 사용자가 이해할 수 있게 마무리한다.
3. Feed motion을 알려진 계획의 목적 기준으로 정의하고 reduced-motion/성공/실패를 포함해 확인한다.
4. 기록 직후 반응과 성장 후 정원 반영 사이의 timing/feedback 연속성을 보장한다.

### PHASE B — Record Ownership & Reflection

1. Backup, restore, delete, device migration을 각각 제품 정책으로 결정한다.
2. 답변 수정/삭제와 fragment consumption 이후의 예외 정책을 명시한다.
3. Archive 검색/필터 필요성을 결정하고 다시 찾기 흐름을 완성한다.
4. Monthly Review와 Keepsake가 선택된 기록 및 캐릭터의 변화와 연결되는 목적을 확정한다.
5. PNG save/share 및 내보내기 실패 상태를 주요 기기에서 확인한다.

### PHASE C — Personality & Long-term Delight

1. Trait가 행동으로 얼마나 체감되는지 관찰하고 과도한 설명 없이 알아차릴 수 있는지 검증한다.
2. Pet Record를 상태 요약에서 함께 보낸 시간의 기록으로 확장할지 설계한다.
3. 90점 이후 progression과 monthly reflection의 역할을 결정한다.
4. Seed/점수 비노출과 “기록 앱” 정체성을 성장 보상 전반에서 지킨다.

### PHASE D — Shared / Room (deferred)

1. 안전한 개발 환경에서 Room backend/schema/RPC의 현재 준비 상태를 확인한다.
2. production 오류 이력을 원인별로 분류하고 연결 안내를 개선한다.
3. Room v3 registry의 architecture와 실제 사용자 흐름의 연결 시점을 결정한다.
4. Solo 데이터와 Room identity/answers의 소유권 경계를 문서화한다.

## NEXT_5_PRODUCT_TASKS

| Rank | Task | Why now | Phase |
|---:|---|---|---|
| 1 | First-use Solo loop를 짧게 설명하는 Tutorial/guide 기준 설계 | 가장 중요한 질문→기록→조각→성장 흐름이 현재 암묵적이며 연결 이해에 backend까지 필요 | A |
| 2 | Fragment pending/claim/feed/consume의 사용자 상태와 복구 UX를 종단 정리 | 일기 저장 뒤 보상 루프가 끊기는 경우 핵심 가치가 체감되지 않음 | A |
| 3 | Backup / restore / delete / device migration 네 정책 결정 | 사용자가 쌓는 개인 기록의 소유와 손실 대응에 직접 영향 | B |
| 4 | 수정·삭제 및 Archive 다시 찾기 정책 결정 | 사용자는 기록을 다시 보고 고치거나 관리할 수 있어야 함; 현재 접근은 부분적 | B |
| 5 | Trait 체감과 90pt 이후 지속 경험 평가 | 현재 trait가 행동 가중치로 동작하고 garden은 90까지; 장기 가치를 압박 없이 이어갈지 판단 | C |

Room은 별도 제품 축으로 유지하지만 이번 Next 5의 앞 순위에 두지 않는다. Feed motion의 구현 확장도 단순 visual polish만으로 우선하지 않고, task 2의 연결·복구 경험 안에서 검증한다.

## PRODUCT_COMPLETENESS_SUMMARY

- **Core daily experience:** 질문 선택과 답변 저장은 `DONE`; 첫 사용자 안내와 backend를 거치는 보상 연결은 `PARTIAL`.
- **Growth experience:** 성장 단계, trait 연결, 누적 garden reward는 구현; feed 경험과 trait 체감은 `PARTIAL`. Garden Reward V1은 21/30/45/60/90으로 production 배포 완료.
- **Reflection experience:** Archive와 Monthly/Keepsake가 존재; 검색·수정/삭제 정책·공유 호환성은 일부 남음.
- **Data ownership:** localStorage 중심이고 기기 간 sync 없음. Backup, restore, delete, migration 각각 `NEEDS_DECISION`.
- **Shared experience:** Room code path는 존재하지만 production availability `UNKNOWN`; 우선순위는 후순위.
- **Long-term experience:** C3 질문과 90점까지 누적 정원 변화가 있음; 이후 경험은 `NEEDS_DECISION`.

## EVIDENCE NOTES

- Known Product Plan supplied in the current request is authoritative for tutorial, feed-motion completion, rename deferral, Solo priority, C3 and Garden Reward release state.
- Current source checked at repository baseline `e073b80` (`main` tracks `origin/main`). Relevant implementation locations include `app.js` adoption, fragment lifecycle, consume animation, pet record, daily questions, archive/monthly, Room handlers; `pet-runtime.js`, `pet-profile-ui.js`, `daily-selector-lifecycle-config-v1.js`, `supabase-schema.sql`, `README.md`, and Garden reward UI/assets.
- Earlier product audit recorded a Room production smoke failure. This document does not claim a new production test or current failure reproduction.
- No code, DB, localStorage, test, commit, push, or deploy action was performed to produce this plan.

**MASTER_PRODUCT_PLAN_V1_COMPLETE**
