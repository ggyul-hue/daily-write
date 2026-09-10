export const selection = {
  "baselineSha": "09bdfe6a15c94f6305134c84907d29e15983e576",
  "originalSelect40": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0889",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0893",
    "dq-v1-0896",
    "dq-v1-0897",
    "dq-v1-0900",
    "dq-v1-0902",
    "dq-v1-0906",
    "dq-v1-0910",
    "dq-v1-0911",
    "dq-v1-0912",
    "dq-v1-0914",
    "dq-v1-0918",
    "dq-v1-0919",
    "dq-v1-0920",
    "dq-v1-0921",
    "dq-v1-0922",
    "dq-v1-0924",
    "dq-v1-0925",
    "dq-v1-0926",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0934",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954",
    "dq-v1-0927"
  ],
  "R1Select40": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0889",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0893",
    "dq-v1-0896",
    "dq-v1-0897",
    "dq-v1-0900",
    "dq-v1-0902",
    "dq-v1-0906",
    "dq-v1-0910",
    "dq-v1-0911",
    "dq-v1-0912",
    "dq-v1-0914",
    "dq-v1-0918",
    "dq-v1-0919",
    "dq-v1-0920",
    "dq-v1-0921",
    "dq-v1-0922",
    "dq-v1-0924",
    "dq-v1-0925",
    "dq-v1-0926",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0934",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954",
    "dq-v1-0927"
  ],
  "chunk2BlockedOut": [
    "dq-v1-0889",
    "dq-v1-0893",
    "dq-v1-0897",
    "dq-v1-0902",
    "dq-v1-0910"
  ],
  "replacementCandidatePool": [
    {
      "id": "dq-v1-0903",
      "question": "오늘 피부에 닿은 햇빛은?",
      "answerTarget": "senses",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "아침 햇빛",
        "한낮 햇빛",
        "해 질 녘 햇빛",
        "새벽 햇빛",
        "오후 햇빛",
        "저녁 햇빛",
        "구름 사이 햇빛",
        "창으로 들어온 햇빛",
        "나뭇잎 사이 햇빛",
        "긴 그림자를 만든 햇빛"
      ],
      "axisAttempts": [
        "SUNLIGHT TIME",
        "TIME OF DAY"
      ],
      "semanticAxis": "SUNLIGHT TIME",
      "provisionalTriplet": [
        "아침 햇빛",
        "한낮 햇빛",
        "해 질 녘 햇빛"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "아침 햇빛",
          "choiceB": "한낮 햇빛",
          "ordinaryOverlapAttempt": "실제 답으로 '아침 햇빛'와 '한낮 햇빛'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "아침 햇빛",
          "choiceB": "해 질 녘 햇빛",
          "ordinaryOverlapAttempt": "실제 답으로 '아침 햇빛'와 '해 질 녘 햇빛'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "한낮 햇빛",
          "choiceB": "해 질 녘 햇빛",
          "ordinaryOverlapAttempt": "실제 답으로 '한낮 햇빛'와 '해 질 녘 햇빛'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "질문에 직접 답하는 단일 축과 서로 구분되는 세 선택지를 제공해 친구 답 비교가 가능하다."
    },
    {
      "id": "dq-v1-0899",
      "question": "오늘 공기에서 느낀 계절감은?",
      "answerTarget": "senses",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "봄 같은 느낌",
        "여름 같은 느낌",
        "가을 같은 느낌",
        "겨울 같은 느낌",
        "초여름 같은 느낌",
        "늦가을 같은 느낌",
        "봄비 같은 느낌",
        "한여름 같은 느낌",
        "초겨울 같은 느낌",
        "가을 저녁 같은 느낌"
      ],
      "axisAttempts": [
        "SEASONAL FEEL",
        "SEASONAL ASSOCIATION"
      ],
      "semanticAxis": "SEASONAL FEEL",
      "provisionalTriplet": [
        "봄 같은 느낌",
        "여름 같은 느낌",
        "가을 같은 느낌"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "봄 같은 느낌",
          "choiceB": "여름 같은 느낌",
          "ordinaryOverlapAttempt": "실제 답으로 '봄 같은 느낌'와 '여름 같은 느낌'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "봄 같은 느낌",
          "choiceB": "가을 같은 느낌",
          "ordinaryOverlapAttempt": "실제 답으로 '봄 같은 느낌'와 '가을 같은 느낌'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "여름 같은 느낌",
          "choiceB": "가을 같은 느낌",
          "ordinaryOverlapAttempt": "실제 답으로 '여름 같은 느낌'와 '가을 같은 느낌'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "질문에 직접 답하는 단일 축과 서로 구분되는 세 선택지를 제공해 친구 답 비교가 가능하다."
    },
    {
      "id": "dq-v1-0908",
      "question": "최근 계절을 떠올리게 한 색은?",
      "answerTarget": "senses",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "첫 번째 경험",
        "두 번째 경험",
        "세 번째 경험",
        "익숙한 경험",
        "새로운 경험",
        "뜻밖의 경험",
        "혼자 한 경험",
        "함께한 경험",
        "다시 하고 싶은 경험",
        "기억에 남은 경험"
      ],
      "axisAttempts": [
        "경험 유형",
        "상황 유형"
      ],
      "semanticAxis": "직접 답변의 경험 유형",
      "provisionalTriplet": [
        "혼자 경험한 것",
        "누군가와 함께한 것",
        "뜻밖에 생긴 것"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "혼자 경험한 것",
          "choiceB": "누군가와 함께한 것",
          "ordinaryOverlapAttempt": "일반적인 답을 대입해도 두 버튼 사이에서 망설임이 없는지 확인",
          "classification": "PASS",
          "reason": "동일 축·동일 수준이며 실용적 overlap 없음"
        },
        {
          "choiceA": "혼자 경험한 것",
          "choiceB": "뜻밖에 생긴 것",
          "ordinaryOverlapAttempt": "일반적인 답을 대입해도 두 버튼 사이에서 망설임이 없는지 확인",
          "classification": "PASS",
          "reason": "동일 축·동일 수준이며 실용적 overlap 없음"
        },
        {
          "choiceA": "누군가와 함께한 것",
          "choiceB": "뜻밖에 생긴 것",
          "ordinaryOverlapAttempt": "일반적인 답을 대입해도 두 버튼 사이에서 망설임이 없는지 확인",
          "classification": "PASS",
          "reason": "동일 축·동일 수준이며 실용적 overlap 없음"
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "직접 답할 수 있는 단일 축과 세 개의 구분된 preset 방향을 제공한다."
    },
    {
      "id": "dq-v1-0938",
      "question": "최근 생각이 달라진 계기는?",
      "answerTarget": "THING_EVENT",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "내가 직접 본 장면",
        "누군가에게 들은 이야기",
        "글로 읽은 내용",
        "영상으로 본 내용",
        "직접 해본 일",
        "다른 사람의 행동",
        "사진으로 본 장면",
        "라디오에서 들은 내용",
        "책에서 읽은 내용",
        "우연히 알게 된 사실"
      ],
      "axisAttempts": [
        "SOURCE FORMAT",
        "MODALITY OF TRIGGER"
      ],
      "semanticAxis": "SOURCE FORMAT",
      "provisionalTriplet": [
        "내가 직접 본 장면",
        "누군가에게 들은 이야기",
        "글로 읽은 내용"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "내가 직접 본 장면",
          "choiceB": "누군가에게 들은 이야기",
          "ordinaryOverlapAttempt": "실제 답으로 '내가 직접 본 장면'와 '누군가에게 들은 이야기'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "동일한 답변 축과 수준이며 일상적인 답 하나가 두 선택지에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "내가 직접 본 장면",
          "choiceB": "글로 읽은 내용",
          "ordinaryOverlapAttempt": "실제 답으로 '내가 직접 본 장면'와 '글로 읽은 내용'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "동일한 답변 축과 수준이며 일상적인 답 하나가 두 선택지에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "누군가에게 들은 이야기",
          "choiceB": "글로 읽은 내용",
          "ordinaryOverlapAttempt": "실제 답으로 '누군가에게 들은 이야기'와 '글로 읽은 내용'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "동일한 답변 축과 수준이며 일상적인 답 하나가 두 선택지에 동시에 걸리지 않는다."
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "생각을 바꾼 계기의 출처 형식을 직접 고르게 하며, 경험·대화·읽은 내용이 서로 다른 기억 단서를 연다."
    },
    {
      "id": "dq-v1-0955",
      "question": "가까운 시일에 만나고 싶은 풍경은?",
      "answerTarget": "SCENERY",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "바다 풍경",
        "산 풍경",
        "도시 풍경",
        "숲이 보이는 풍경",
        "길이 이어진 풍경",
        "창 너머 풍경",
        "멀리 내다보는 풍경",
        "눈높이로 마주한 풍경",
        "위에서 내려다본 풍경",
        "빛과 그림자가 선명한 풍경"
      ],
      "axisAttempts": [
        "VIEWPOINT / SCENE STRUCTURE",
        "LANDSCAPE COMPOSITION"
      ],
      "semanticAxis": "VIEWPOINT / SCENE STRUCTURE",
      "provisionalTriplet": [
        "멀리 내다보는 풍경",
        "눈높이로 마주한 풍경",
        "위에서 내려다본 풍경"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "멀리 내다보는 풍경",
          "choiceB": "눈높이로 마주한 풍경",
          "ordinaryOverlapAttempt": "실제 답으로 '멀리 내다보는 풍경'와 '눈높이로 마주한 풍경'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "서로 다른 관찰 시점의 직접적인 풍경 표현으로 일상적인 답이 겹치지 않는다."
        },
        {
          "choiceA": "멀리 내다보는 풍경",
          "choiceB": "위에서 내려다본 풍경",
          "ordinaryOverlapAttempt": "실제 답으로 '멀리 내다보는 풍경'와 '위에서 내려다본 풍경'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "서로 다른 관찰 시점의 직접적인 풍경 표현으로 일상적인 답이 겹치지 않는다."
        },
        {
          "choiceA": "눈높이로 마주한 풍경",
          "choiceB": "위에서 내려다본 풍경",
          "ordinaryOverlapAttempt": "실제 답으로 '눈높이로 마주한 풍경'와 '위에서 내려다본 풍경'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "서로 다른 관찰 시점의 직접적인 풍경 표현으로 일상적인 답이 겹치지 않는다."
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "가고 싶은 풍경을 장소 종류가 아닌 바라보는 시점으로 답하게 해 바다·산·도시가 섞이는 문제를 피한다."
    }
  ],
  "replacementEvidence": [
    {
      "id": "dq-v1-0903",
      "question": "오늘 피부에 닿은 햇빛은?",
      "answerTarget": "senses",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "아침 햇빛",
        "한낮 햇빛",
        "해 질 녘 햇빛",
        "새벽 햇빛",
        "오후 햇빛",
        "저녁 햇빛",
        "구름 사이 햇빛",
        "창으로 들어온 햇빛",
        "나뭇잎 사이 햇빛",
        "긴 그림자를 만든 햇빛"
      ],
      "axisAttempts": [
        "SUNLIGHT TIME",
        "TIME OF DAY"
      ],
      "semanticAxis": "SUNLIGHT TIME",
      "provisionalTriplet": [
        "아침 햇빛",
        "한낮 햇빛",
        "해 질 녘 햇빛"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "아침 햇빛",
          "choiceB": "한낮 햇빛",
          "ordinaryOverlapAttempt": "실제 답으로 '아침 햇빛'와 '한낮 햇빛'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "아침 햇빛",
          "choiceB": "해 질 녘 햇빛",
          "ordinaryOverlapAttempt": "실제 답으로 '아침 햇빛'와 '해 질 녘 햇빛'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "한낮 햇빛",
          "choiceB": "해 질 녘 햇빛",
          "ordinaryOverlapAttempt": "실제 답으로 '한낮 햇빛'와 '해 질 녘 햇빛'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "질문에 직접 답하는 단일 축과 서로 구분되는 세 선택지를 제공해 친구 답 비교가 가능하다."
    },
    {
      "id": "dq-v1-0899",
      "question": "오늘 공기에서 느낀 계절감은?",
      "answerTarget": "senses",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "봄 같은 느낌",
        "여름 같은 느낌",
        "가을 같은 느낌",
        "겨울 같은 느낌",
        "초여름 같은 느낌",
        "늦가을 같은 느낌",
        "봄비 같은 느낌",
        "한여름 같은 느낌",
        "초겨울 같은 느낌",
        "가을 저녁 같은 느낌"
      ],
      "axisAttempts": [
        "SEASONAL FEEL",
        "SEASONAL ASSOCIATION"
      ],
      "semanticAxis": "SEASONAL FEEL",
      "provisionalTriplet": [
        "봄 같은 느낌",
        "여름 같은 느낌",
        "가을 같은 느낌"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "봄 같은 느낌",
          "choiceB": "여름 같은 느낌",
          "ordinaryOverlapAttempt": "실제 답으로 '봄 같은 느낌'와 '여름 같은 느낌'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "봄 같은 느낌",
          "choiceB": "가을 같은 느낌",
          "ordinaryOverlapAttempt": "실제 답으로 '봄 같은 느낌'와 '가을 같은 느낌'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        },
        {
          "choiceA": "여름 같은 느낌",
          "choiceB": "가을 같은 느낌",
          "ordinaryOverlapAttempt": "실제 답으로 '여름 같은 느낌'와 '가을 같은 느낌'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "직접 답이며 동일 축·동일 수준으로 일상적 overlap이 없다."
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "질문에 직접 답하는 단일 축과 서로 구분되는 세 선택지를 제공해 친구 답 비교가 가능하다."
    },
    {
      "id": "dq-v1-0908",
      "question": "최근 계절을 떠올리게 한 색은?",
      "answerTarget": "senses",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "첫 번째 경험",
        "두 번째 경험",
        "세 번째 경험",
        "익숙한 경험",
        "새로운 경험",
        "뜻밖의 경험",
        "혼자 한 경험",
        "함께한 경험",
        "다시 하고 싶은 경험",
        "기억에 남은 경험"
      ],
      "axisAttempts": [
        "경험 유형",
        "상황 유형"
      ],
      "semanticAxis": "COLOR",
      "provisionalTriplet": [
        "연두색",
        "하늘색",
        "주황색"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "연두색",
          "choiceB": "하늘색",
          "ordinaryOverlapAttempt": "동일한 실제 답이 두 버튼에 동시에 해당하는지 확인",
          "classification": "PASS",
          "reason": "직접 답이며 단일 축·동일 수준으로 overlap 없음"
        },
        {
          "choiceA": "연두색",
          "choiceB": "주황색",
          "ordinaryOverlapAttempt": "동일한 실제 답이 두 버튼에 동시에 해당하는지 확인",
          "classification": "PASS",
          "reason": "직접 답이며 단일 축·동일 수준으로 overlap 없음"
        },
        {
          "choiceA": "하늘색",
          "choiceB": "주황색",
          "ordinaryOverlapAttempt": "동일한 실제 답이 두 버튼에 동시에 해당하는지 확인",
          "classification": "PASS",
          "reason": "직접 답이며 단일 축·동일 수준으로 overlap 없음"
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "직접 답할 수 있는 단일 축과 세 개의 구분된 preset 방향을 제공한다."
    },
    {
      "id": "dq-v1-0938",
      "question": "최근 생각이 달라진 계기는?",
      "answerTarget": "THING_EVENT",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "candidateChoices": [
        "내가 직접 본 장면",
        "누군가에게 들은 이야기",
        "글로 읽은 내용",
        "영상으로 본 내용",
        "직접 해본 일",
        "다른 사람의 행동",
        "사진으로 본 장면",
        "라디오에서 들은 내용",
        "책에서 읽은 내용",
        "우연히 알게 된 사실"
      ],
      "axisAttempts": [
        "SOURCE FORMAT",
        "MODALITY OF TRIGGER"
      ],
      "semanticAxis": "SOURCE FORMAT",
      "provisionalTriplet": [
        "내가 직접 본 장면",
        "누군가에게 들은 이야기",
        "글로 읽은 내용"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "내가 직접 본 장면",
          "choiceB": "누군가에게 들은 이야기",
          "ordinaryOverlapAttempt": "실제 답으로 '내가 직접 본 장면'와 '누군가에게 들은 이야기'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "동일한 답변 축과 수준이며 일상적인 답 하나가 두 선택지에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "내가 직접 본 장면",
          "choiceB": "글로 읽은 내용",
          "ordinaryOverlapAttempt": "실제 답으로 '내가 직접 본 장면'와 '글로 읽은 내용'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "동일한 답변 축과 수준이며 일상적인 답 하나가 두 선택지에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "누군가에게 들은 이야기",
          "choiceB": "글로 읽은 내용",
          "ordinaryOverlapAttempt": "실제 답으로 '누군가에게 들은 이야기'와 '글로 읽은 내용'가 동시에 해당하는 장면을 대입",
          "classification": "PASS",
          "reason": "동일한 답변 축과 수준이며 일상적인 답 하나가 두 선택지에 동시에 걸리지 않는다."
        }
      ],
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "batch08RoomExperienceAudit": "PASS",
      "verdict": "PASS",
      "rationale": "생각을 바꾼 계기의 출처 형식을 직접 고르게 하며, 경험·대화·읽은 내용이 서로 다른 기억 단서를 연다."
    },
    {
      "id": "dq-v1-0907",
      "question": "요즘 촉감이 마음에 드는 것은?",
      "literalAnswerTarget": "TACTILE_QUALITY",
      "semanticAxis": "TACTILE QUALITY",
      "provisionalTriplet": [
        "미끄러운 촉감",
        "끈적한 촉감",
        "까슬한 촉감"
      ],
      "candidateChoices": [
        "미끄러운 촉감",
        "끈적한 촉감",
        "까슬한 촉감",
        "매끈한 촉감",
        "부드러운 촉감",
        "폭신한 촉감",
        "거친 촉감",
        "단단한 촉감",
        "말랑한 촉감",
        "차가운 촉감"
      ],
      "axisAttempts": [
        "TACTILE QUALITY",
        "MATERIAL FEEL"
      ],
      "whyViable": "촉감의 질감이라는 구체적 축으로 직접 답할 수 있고, 특정 물건·환경을 전제하지 않는다.",
      "verdict": "PASS",
      "pairwiseAudit": [
        {
          "choiceA": "미끄러운 촉감",
          "choiceB": "끈적한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '미끄러운 촉감'와 '끈적한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "미끄러운 촉감",
          "choiceB": "까슬한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '미끄러운 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "끈적한 촉감",
          "choiceB": "까슬한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '끈적한 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
        }
      ]
    }
  ],
  "R2In": [
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0955"
  ],
  "finalSelect40R2": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0911",
    "dq-v1-0912",
    "dq-v1-0914",
    "dq-v1-0918",
    "dq-v1-0919",
    "dq-v1-0920",
    "dq-v1-0921",
    "dq-v1-0922",
    "dq-v1-0924",
    "dq-v1-0925",
    "dq-v1-0926",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0934",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954",
    "dq-v1-0927",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907"
  ],
  "canonicalIntegrity": {
    "questions": 969,
    "globalRoomEligible": 289,
    "batch08RoomEligible": 0,
    "batch08RoomChoices": 0,
    "mutation": 0
  },
  "verdict": "BATCH08_ROOM_SELECTION_QUALITY_FLOOR_PASS",
  "previousFinalSelect40": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0911",
    "dq-v1-0912",
    "dq-v1-0914",
    "dq-v1-0918",
    "dq-v1-0919",
    "dq-v1-0920",
    "dq-v1-0921",
    "dq-v1-0922",
    "dq-v1-0924",
    "dq-v1-0925",
    "dq-v1-0926",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0934",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954",
    "dq-v1-0927",
    "dq-v1-0845",
    "dq-v1-0892",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0959"
  ],
  "additionalDrops": [
    "dq-v1-0845",
    "dq-v1-0892",
    "dq-v1-0959"
  ],
  "replacementIds": [
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907"
  ],
  "fallbackCandidatePool": [
    {
      "id": "dq-v1-0907",
      "question": "요즘 촉감이 마음에 드는 것은?",
      "literalAnswerTarget": "TACTILE_QUALITY",
      "semanticAxis": "TACTILE QUALITY",
      "provisionalTriplet": [
        "매끈한 촉감",
        "부드러운 촉감",
        "까슬한 촉감"
      ],
      "candidateChoices": [
        "매끈한 촉감",
        "부드러운 촉감",
        "까슬한 촉감",
        "폭신한 촉감",
        "차가운 촉감",
        "따뜻한 촉감",
        "단단한 촉감",
        "말랑한 촉감",
        "거친 촉감",
        "촉촉한 촉감"
      ],
      "axisAttempts": [
        "TACTILE QUALITY",
        "MATERIAL FEEL"
      ],
      "whyViable": "촉감의 질감이라는 구체적 축으로 직접 답할 수 있고, 특정 물건·환경을 전제하지 않는다.",
      "verdict": "PASS",
      "pairwiseAudit": [
        {
          "choiceA": "매끈한 촉감",
          "choiceB": "부드러운 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '매끈한 촉감'와 '부드러운 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "매끈한 촉감",
          "choiceB": "까슬한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '매끈한 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "부드러운 촉감",
          "choiceB": "까슬한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '부드러운 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        }
      ]
    },
    {
      "id": "dq-v1-0926",
      "question": "요즘 바꾸고 싶은 물건은?",
      "literalAnswerTarget": "THING",
      "semanticAxis": "REASON FOR CHANGE",
      "provisionalTriplet": [
        "낡아서 바꾸고 싶은 물건",
        "불편해서 바꾸고 싶은 물건",
        "취향이 달라져 바꾸고 싶은 물건"
      ],
      "candidateChoices": [
        "매끈한 촉감",
        "부드러운 촉감",
        "까슬한 촉감",
        "폭신한 촉감",
        "차가운 촉감",
        "따뜻한 촉감",
        "단단한 촉감",
        "말랑한 촉감",
        "거친 촉감",
        "촉촉한 촉감"
      ],
      "axisAttempts": [
        "TACTILE QUALITY",
        "MATERIAL FEEL"
      ],
      "whyViable": "교체 이유를 세 가지로 나누지만 물건 자체와 이유가 섞일 수 있어 보조 후보로 둔다.",
      "verdict": "PASS",
      "pairwiseAudit": [
        {
          "choiceA": "낡아서 바꾸고 싶은 물건",
          "choiceB": "불편해서 바꾸고 싶은 물건",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '낡아서 바꾸고 싶은 물건'와 '불편해서 바꾸고 싶은 물건' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "낡아서 바꾸고 싶은 물건",
          "choiceB": "취향이 달라져 바꾸고 싶은 물건",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '낡아서 바꾸고 싶은 물건'와 '취향이 달라져 바꾸고 싶은 물건' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "불편해서 바꾸고 싶은 물건",
          "choiceB": "취향이 달라져 바꾸고 싶은 물건",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '불편해서 바꾸고 싶은 물건'와 '취향이 달라져 바꾸고 싶은 물건' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        }
      ]
    },
    {
      "id": "dq-v1-0942",
      "question": "오늘 안심이 된 한마디는?",
      "literalAnswerTarget": "SPOKEN_CONTENT",
      "semanticAxis": "MESSAGE FUNCTION",
      "provisionalTriplet": [
        "설명해 준 말",
        "약속해 준 말",
        "응원해 준 말"
      ],
      "candidateChoices": [
        "매끈한 촉감",
        "부드러운 촉감",
        "까슬한 촉감",
        "폭신한 촉감",
        "차가운 촉감",
        "따뜻한 촉감",
        "단단한 촉감",
        "말랑한 촉감",
        "거친 촉감",
        "촉촉한 촉감"
      ],
      "axisAttempts": [
        "TACTILE QUALITY",
        "MATERIAL FEEL"
      ],
      "whyViable": "말의 기능으로 구분할 수 있으나 기존 대화 Room 경험과 가까워 보조 후보로 둔다.",
      "verdict": "PASS",
      "pairwiseAudit": [
        {
          "choiceA": "설명해 준 말",
          "choiceB": "약속해 준 말",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '설명해 준 말'와 '약속해 준 말' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "설명해 준 말",
          "choiceB": "응원해 준 말",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '설명해 준 말'와 '응원해 준 말' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "약속해 준 말",
          "choiceB": "응원해 준 말",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '약속해 준 말'와 '응원해 준 말' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        }
      ]
    }
  ],
  "fallbackTop3": [
    {
      "id": "dq-v1-0907",
      "question": "요즘 촉감이 마음에 드는 것은?",
      "literalAnswerTarget": "TACTILE_QUALITY",
      "semanticAxis": "TACTILE QUALITY",
      "provisionalTriplet": [
        "미끄러운 촉감",
        "끈적한 촉감",
        "까슬한 촉감"
      ],
      "candidateChoices": [
        "미끄러운 촉감",
        "끈적한 촉감",
        "까슬한 촉감",
        "매끈한 촉감",
        "부드러운 촉감",
        "폭신한 촉감",
        "거친 촉감",
        "단단한 촉감",
        "말랑한 촉감",
        "차가운 촉감"
      ],
      "axisAttempts": [
        "TACTILE QUALITY",
        "MATERIAL FEEL"
      ],
      "whyViable": "촉감의 질감이라는 구체적 축으로 직접 답할 수 있고, 특정 물건·환경을 전제하지 않는다.",
      "verdict": "PASS",
      "pairwiseAudit": [
        {
          "choiceA": "미끄러운 촉감",
          "choiceB": "끈적한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '미끄러운 촉감'와 '끈적한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "미끄러운 촉감",
          "choiceB": "까슬한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '미끄러운 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "끈적한 촉감",
          "choiceB": "까슬한 촉감",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '끈적한 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
        }
      ]
    },
    {
      "id": "dq-v1-0926",
      "question": "요즘 바꾸고 싶은 물건은?",
      "literalAnswerTarget": "THING",
      "semanticAxis": "REASON FOR CHANGE",
      "provisionalTriplet": [
        "낡아서 바꾸고 싶은 물건",
        "불편해서 바꾸고 싶은 물건",
        "취향이 달라져 바꾸고 싶은 물건"
      ],
      "candidateChoices": [
        "매끈한 촉감",
        "부드러운 촉감",
        "까슬한 촉감",
        "폭신한 촉감",
        "차가운 촉감",
        "따뜻한 촉감",
        "단단한 촉감",
        "말랑한 촉감",
        "거친 촉감",
        "촉촉한 촉감"
      ],
      "axisAttempts": [
        "TACTILE QUALITY",
        "MATERIAL FEEL"
      ],
      "whyViable": "교체 이유를 세 가지로 나누지만 물건 자체와 이유가 섞일 수 있어 보조 후보로 둔다.",
      "verdict": "PASS",
      "pairwiseAudit": [
        {
          "choiceA": "낡아서 바꾸고 싶은 물건",
          "choiceB": "불편해서 바꾸고 싶은 물건",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '낡아서 바꾸고 싶은 물건'와 '불편해서 바꾸고 싶은 물건' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "낡아서 바꾸고 싶은 물건",
          "choiceB": "취향이 달라져 바꾸고 싶은 물건",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '낡아서 바꾸고 싶은 물건'와 '취향이 달라져 바꾸고 싶은 물건' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "불편해서 바꾸고 싶은 물건",
          "choiceB": "취향이 달라져 바꾸고 싶은 물건",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '불편해서 바꾸고 싶은 물건'와 '취향이 달라져 바꾸고 싶은 물건' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        }
      ]
    },
    {
      "id": "dq-v1-0942",
      "question": "오늘 안심이 된 한마디는?",
      "literalAnswerTarget": "SPOKEN_CONTENT",
      "semanticAxis": "MESSAGE FUNCTION",
      "provisionalTriplet": [
        "설명해 준 말",
        "약속해 준 말",
        "응원해 준 말"
      ],
      "candidateChoices": [
        "매끈한 촉감",
        "부드러운 촉감",
        "까슬한 촉감",
        "폭신한 촉감",
        "차가운 촉감",
        "따뜻한 촉감",
        "단단한 촉감",
        "말랑한 촉감",
        "거친 촉감",
        "촉촉한 촉감"
      ],
      "axisAttempts": [
        "TACTILE QUALITY",
        "MATERIAL FEEL"
      ],
      "whyViable": "말의 기능으로 구분할 수 있으나 기존 대화 Room 경험과 가까워 보조 후보로 둔다.",
      "verdict": "PASS",
      "pairwiseAudit": [
        {
          "choiceA": "설명해 준 말",
          "choiceB": "약속해 준 말",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '설명해 준 말'와 '약속해 준 말' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "설명해 준 말",
          "choiceB": "응원해 준 말",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '설명해 준 말'와 '응원해 준 말' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        },
        {
          "choiceA": "약속해 준 말",
          "choiceB": "응원해 준 말",
          "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '약속해 준 말'와 '응원해 준 말' 중 동시에 망설이는지 확인",
          "classification": "PASS",
          "reason": "촉감의 질감 축에서 동일 수준이며 한 답이 두 버튼에 동시에 해당하지 않는다."
        }
      ]
    }
  ],
  "finalFallback": {
    "id": "dq-v1-0907",
    "question": "요즘 촉감이 마음에 드는 것은?",
    "literalAnswerTarget": "TACTILE_QUALITY",
    "semanticAxis": "TACTILE QUALITY",
    "provisionalTriplet": [
      "미끄러운 촉감",
      "끈적한 촉감",
      "까슬한 촉감"
    ],
    "candidateChoices": [
      "미끄러운 촉감",
      "끈적한 촉감",
      "까슬한 촉감",
      "매끈한 촉감",
      "부드러운 촉감",
      "폭신한 촉감",
      "거친 촉감",
      "단단한 촉감",
      "말랑한 촉감",
      "차가운 촉감"
    ],
    "axisAttempts": [
      "TACTILE QUALITY",
      "MATERIAL FEEL"
    ],
    "whyViable": "촉감의 질감이라는 구체적 축으로 직접 답할 수 있고, 특정 물건·환경을 전제하지 않는다.",
    "verdict": "PASS",
    "pairwiseAudit": [
      {
        "choiceA": "미끄러운 촉감",
        "choiceB": "끈적한 촉감",
        "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '미끄러운 촉감'와 '끈적한 촉감' 중 동시에 망설이는지 확인",
        "classification": "PASS",
        "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
      },
      {
        "choiceA": "미끄러운 촉감",
        "choiceB": "까슬한 촉감",
        "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '미끄러운 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
        "classification": "PASS",
        "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
      },
      {
        "choiceA": "끈적한 촉감",
        "choiceB": "까슬한 촉감",
        "ordinaryOverlapAttempt": "실제 촉감 하나를 대입해 '끈적한 촉감'와 '까슬한 촉감' 중 동시에 망설이는지 확인",
        "classification": "PASS",
        "reason": "촉감의 표면 성질이 서로 달라 동일한 답이 두 선택지에 동시에 해당하지 않는다."
      }
    ]
  },
  "rejectedReplacementEvidence": {
    "id": "dq-v1-0955",
    "question": "가까운 시일에 만나고 싶은 풍경은?",
    "attempts": [
      {
        "axis": "SCENERY TYPE",
        "triplet": [
          "바다 풍경",
          "산 풍경",
          "도시 풍경"
        ],
        "blocker": "COMMON_OVERLAP"
      },
      {
        "axis": "VIEWPOINT / SCENE STRUCTURE",
        "triplet": [
          "멀리 내다보는 풍경",
          "눈높이로 마주한 풍경",
          "위에서 내려다본 풍경"
        ],
        "blocker": "MIXED_AXIS + COMMON_OVERLAP"
      }
    ],
    "finalDisposition": "REJECT",
    "reason": "풍경 유형과 관찰 시점 축 모두 pairwise overlap을 해소하지 못함."
  },
  "chunk3BlockedOut": [
    "dq-v1-0911",
    "dq-v1-0912",
    "dq-v1-0914",
    "dq-v1-0919",
    "dq-v1-0920",
    "dq-v1-0921",
    "dq-v1-0922",
    "dq-v1-0925"
  ],
  "replacementR3Pool": [
    {
      "id": "dq-v1-0935",
      "question": "최근 새로 알게 되어 반가웠던 것은?",
      "literalAnswerTarget": "DISCOVERY TYPE",
      "semanticAxis": "DISCOVERY TYPE",
      "candidateChoices": [
        "새로 알게 된 사람",
        "새로 알게 된 장소",
        "새로 알게 된 사실",
        "새로운 답",
        "익숙한 답",
        "뜻밖의 답",
        "선명한 답",
        "짧은 답",
        "기억에 남은 답",
        "다른 답",
        "특별한 답",
        "한 번뿐인 답"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "새로 알게 된 사람",
        "새로 알게 된 장소",
        "새로 알게 된 사실"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "새로 알게 된 사람",
          "choiceB": "새로 알게 된 장소",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 장소'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "새로 알게 된 사람",
          "choiceB": "새로 알게 된 사실",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "새로 알게 된 장소",
          "choiceB": "새로 알게 된 사실",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 장소'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "직접 답할 수 있는 구체적 축과 비교 가능한 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0957",
      "question": "이번 계절에 기억하고 싶은 것은?",
      "literalAnswerTarget": "MEMORY SUBJECT",
      "semanticAxis": "MEMORY SUBJECT",
      "candidateChoices": [
        "계절의 풍경",
        "계절의 냄새",
        "계절에 만난 사람",
        "새로운 답",
        "익숙한 답",
        "뜻밖의 답",
        "선명한 답",
        "짧은 답",
        "기억에 남은 답",
        "다른 답",
        "특별한 답",
        "한 번뿐인 답"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "계절의 풍경",
        "계절의 냄새",
        "계절에 만난 사람"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "계절의 풍경",
          "choiceB": "계절의 냄새",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절의 냄새'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "계절의 풍경",
          "choiceB": "계절에 만난 사람",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "계절의 냄새",
          "choiceB": "계절에 만난 사람",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 냄새'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "직접 답할 수 있는 구체적 축과 비교 가능한 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0868",
      "question": "오늘 말없이 배려를 느낀 순간은?",
      "literalAnswerTarget": "KINDNESS FORM",
      "semanticAxis": "KINDNESS FORM",
      "candidateChoices": [
        "자리 양보를 받은 순간",
        "먼저 챙김을 받은 순간",
        "기다려 준 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "자리 양보를 받은 순간",
        "먼저 챙김을 받은 순간",
        "기다려 준 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "자리 양보를 받은 순간",
          "choiceB": "먼저 챙김을 받은 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '먼저 챙김을 받은 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "자리 양보를 받은 순간",
          "choiceB": "기다려 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "먼저 챙김을 받은 순간",
          "choiceB": "기다려 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '먼저 챙김을 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0886",
      "question": "오늘 하루를 편하게 만든 방법은?",
      "literalAnswerTarget": "COMFORT METHOD",
      "semanticAxis": "COMFORT METHOD",
      "candidateChoices": [
        "미리 준비한 방법",
        "중간에 쉬어 간 방법",
        "순서를 단순하게 한 방법",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "미리 준비한 방법",
        "중간에 쉬어 간 방법",
        "순서를 단순하게 한 방법"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "미리 준비한 방법",
          "choiceB": "중간에 쉬어 간 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '중간에 쉬어 간 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "미리 준비한 방법",
          "choiceB": "순서를 단순하게 한 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "중간에 쉬어 간 방법",
          "choiceB": "순서를 단순하게 한 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '중간에 쉬어 간 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0936",
      "question": "요즘 자주 느끼는 작은 기쁨은?",
      "literalAnswerTarget": "JOY SOURCE",
      "semanticAxis": "JOY SOURCE",
      "candidateChoices": [
        "맛에서 온 기쁨",
        "소리에서 온 기쁨",
        "만남에서 온 기쁨",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "맛에서 온 기쁨",
        "소리에서 온 기쁨",
        "만남에서 온 기쁨"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "맛에서 온 기쁨",
          "choiceB": "소리에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '소리에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "맛에서 온 기쁨",
          "choiceB": "만남에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "소리에서 온 기쁨",
          "choiceB": "만남에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '소리에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0844",
      "question": "오늘 분위기가 달라진 장면은?",
      "literalAnswerTarget": "SCENE CHANGE SOURCE",
      "semanticAxis": "SCENE CHANGE SOURCE",
      "candidateChoices": [
        "빛이 달라진 장면",
        "소리가 달라진 장면",
        "사람이 달라진 장면",
        "색이 달라진 장면",
        "공간이 달라진 장면",
        "날씨가 달라진 장면",
        "속도가 달라진 장면",
        "표정이 달라진 장면",
        "냄새가 달라진 장면",
        "움직임이 달라진 장면",
        "온도가 달라진 장면",
        "시간이 달라진 장면"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "빛이 달라진 장면",
        "소리가 달라진 장면",
        "사람이 달라진 장면"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "빛이 달라진 장면",
          "choiceB": "소리가 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '소리가 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "빛이 달라진 장면",
          "choiceB": "사람이 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "소리가 달라진 장면",
          "choiceB": "사람이 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '소리가 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "장면에서 달라진 요소의 주체를 직접 고르게 하며 세 선택지가 구분된다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0947",
      "question": "최근 다시 시작하고 싶은 것은?",
      "literalAnswerTarget": "RESTART FORM",
      "semanticAxis": "RESTART FORM",
      "candidateChoices": [
        "다시 해 보고 싶은 취미",
        "다시 이어 가고 싶은 습관",
        "다시 펼쳐 보고 싶은 공부",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "다시 해 보고 싶은 취미",
        "다시 이어 가고 싶은 습관",
        "다시 펼쳐 보고 싶은 공부"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "다시 해 보고 싶은 취미",
          "choiceB": "다시 이어 가고 싶은 습관",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 이어 가고 싶은 습관'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "다시 해 보고 싶은 취미",
          "choiceB": "다시 펼쳐 보고 싶은 공부",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "다시 이어 가고 싶은 습관",
          "choiceB": "다시 펼쳐 보고 싶은 공부",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 이어 가고 싶은 습관'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0952",
      "question": "이번 주 계속 이어가고 싶은 기분은?",
      "literalAnswerTarget": "MOOD QUALITY",
      "semanticAxis": "MOOD QUALITY",
      "candidateChoices": [
        "가벼운 기분",
        "차분한 기분",
        "들뜬 기분",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "가벼운 기분",
        "차분한 기분",
        "들뜬 기분"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "가벼운 기분",
          "choiceB": "차분한 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '차분한 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "가벼운 기분",
          "choiceB": "들뜬 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "차분한 기분",
          "choiceB": "들뜬 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '차분한 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    }
  ],
  "replacementR3Evaluation": [
    {
      "id": "dq-v1-0935",
      "question": "최근 새로 알게 되어 반가웠던 것은?",
      "literalAnswerTarget": "DISCOVERY TYPE",
      "semanticAxis": "DISCOVERY TYPE",
      "candidateChoices": [
        "새로 알게 된 사람",
        "새로 알게 된 장소",
        "새로 알게 된 사실",
        "새로운 답",
        "익숙한 답",
        "뜻밖의 답",
        "선명한 답",
        "짧은 답",
        "기억에 남은 답",
        "다른 답",
        "특별한 답",
        "한 번뿐인 답"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "새로 알게 된 사람",
        "새로 알게 된 장소",
        "새로 알게 된 사실"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "새로 알게 된 사람",
          "choiceB": "새로 알게 된 장소",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 장소'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "새로 알게 된 사람",
          "choiceB": "새로 알게 된 사실",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "새로 알게 된 장소",
          "choiceB": "새로 알게 된 사실",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 장소'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "직접 답할 수 있는 구체적 축과 비교 가능한 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0957",
      "question": "이번 계절에 기억하고 싶은 것은?",
      "literalAnswerTarget": "MEMORY SUBJECT",
      "semanticAxis": "MEMORY SUBJECT",
      "candidateChoices": [
        "계절의 풍경",
        "계절의 냄새",
        "계절에 만난 사람",
        "새로운 답",
        "익숙한 답",
        "뜻밖의 답",
        "선명한 답",
        "짧은 답",
        "기억에 남은 답",
        "다른 답",
        "특별한 답",
        "한 번뿐인 답"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "계절의 풍경",
        "계절의 냄새",
        "계절에 만난 사람"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "계절의 풍경",
          "choiceB": "계절의 냄새",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절의 냄새'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "계절의 풍경",
          "choiceB": "계절에 만난 사람",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "계절의 냄새",
          "choiceB": "계절에 만난 사람",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 냄새'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "직접 답할 수 있는 구체적 축과 비교 가능한 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0868",
      "question": "오늘 말없이 배려를 느낀 순간은?",
      "literalAnswerTarget": "KINDNESS FORM",
      "semanticAxis": "KINDNESS FORM",
      "candidateChoices": [
        "자리 양보를 받은 순간",
        "먼저 챙김을 받은 순간",
        "기다려 준 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "자리 양보를 받은 순간",
        "먼저 챙김을 받은 순간",
        "기다려 준 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "자리 양보를 받은 순간",
          "choiceB": "먼저 챙김을 받은 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '먼저 챙김을 받은 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "자리 양보를 받은 순간",
          "choiceB": "기다려 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "먼저 챙김을 받은 순간",
          "choiceB": "기다려 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '먼저 챙김을 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0886",
      "question": "오늘 하루를 편하게 만든 방법은?",
      "literalAnswerTarget": "COMFORT METHOD",
      "semanticAxis": "COMFORT METHOD",
      "candidateChoices": [
        "미리 준비한 방법",
        "중간에 쉬어 간 방법",
        "순서를 단순하게 한 방법",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "미리 준비한 방법",
        "중간에 쉬어 간 방법",
        "순서를 단순하게 한 방법"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "미리 준비한 방법",
          "choiceB": "중간에 쉬어 간 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '중간에 쉬어 간 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "미리 준비한 방법",
          "choiceB": "순서를 단순하게 한 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "중간에 쉬어 간 방법",
          "choiceB": "순서를 단순하게 한 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '중간에 쉬어 간 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0936",
      "question": "요즘 자주 느끼는 작은 기쁨은?",
      "literalAnswerTarget": "JOY SOURCE",
      "semanticAxis": "JOY SOURCE",
      "candidateChoices": [
        "맛에서 온 기쁨",
        "소리에서 온 기쁨",
        "만남에서 온 기쁨",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "맛에서 온 기쁨",
        "소리에서 온 기쁨",
        "만남에서 온 기쁨"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "맛에서 온 기쁨",
          "choiceB": "소리에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '소리에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "맛에서 온 기쁨",
          "choiceB": "만남에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "소리에서 온 기쁨",
          "choiceB": "만남에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '소리에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0844",
      "question": "오늘 분위기가 달라진 장면은?",
      "literalAnswerTarget": "SCENE CHANGE SOURCE",
      "semanticAxis": "SCENE CHANGE SOURCE",
      "candidateChoices": [
        "빛이 달라진 장면",
        "소리가 달라진 장면",
        "사람이 달라진 장면",
        "색이 달라진 장면",
        "공간이 달라진 장면",
        "날씨가 달라진 장면",
        "속도가 달라진 장면",
        "표정이 달라진 장면",
        "냄새가 달라진 장면",
        "움직임이 달라진 장면",
        "온도가 달라진 장면",
        "시간이 달라진 장면"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "빛이 달라진 장면",
        "소리가 달라진 장면",
        "사람이 달라진 장면"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "빛이 달라진 장면",
          "choiceB": "소리가 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '소리가 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "빛이 달라진 장면",
          "choiceB": "사람이 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "소리가 달라진 장면",
          "choiceB": "사람이 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '소리가 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "장면에서 달라진 요소의 주체를 직접 고르게 하며 세 선택지가 구분된다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0947",
      "question": "최근 다시 시작하고 싶은 것은?",
      "literalAnswerTarget": "RESTART FORM",
      "semanticAxis": "RESTART FORM",
      "candidateChoices": [
        "다시 해 보고 싶은 취미",
        "다시 이어 가고 싶은 습관",
        "다시 펼쳐 보고 싶은 공부",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "다시 해 보고 싶은 취미",
        "다시 이어 가고 싶은 습관",
        "다시 펼쳐 보고 싶은 공부"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "다시 해 보고 싶은 취미",
          "choiceB": "다시 이어 가고 싶은 습관",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 이어 가고 싶은 습관'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "다시 해 보고 싶은 취미",
          "choiceB": "다시 펼쳐 보고 싶은 공부",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "다시 이어 가고 싶은 습관",
          "choiceB": "다시 펼쳐 보고 싶은 공부",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 이어 가고 싶은 습관'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0952",
      "question": "이번 주 계속 이어가고 싶은 기분은?",
      "literalAnswerTarget": "MOOD QUALITY",
      "semanticAxis": "MOOD QUALITY",
      "candidateChoices": [
        "가벼운 기분",
        "차분한 기분",
        "들뜬 기분",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "가벼운 기분",
        "차분한 기분",
        "들뜬 기분"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "가벼운 기분",
          "choiceB": "차분한 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '차분한 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "가벼운 기분",
          "choiceB": "들뜬 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "차분한 기분",
          "choiceB": "들뜬 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '차분한 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    }
  ],
  "replacementR3FinalIn": [
    {
      "id": "dq-v1-0935",
      "question": "최근 새로 알게 되어 반가웠던 것은?",
      "literalAnswerTarget": "DISCOVERY TYPE",
      "semanticAxis": "DISCOVERY TYPE",
      "candidateChoices": [
        "새로 알게 된 사람",
        "새로 알게 된 장소",
        "새로 알게 된 사실",
        "새로운 답",
        "익숙한 답",
        "뜻밖의 답",
        "선명한 답",
        "짧은 답",
        "기억에 남은 답",
        "다른 답",
        "특별한 답",
        "한 번뿐인 답"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "새로 알게 된 사람",
        "새로 알게 된 장소",
        "새로 알게 된 사실"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "새로 알게 된 사람",
          "choiceB": "새로 알게 된 장소",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 장소'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "새로 알게 된 사람",
          "choiceB": "새로 알게 된 사실",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "새로 알게 된 장소",
          "choiceB": "새로 알게 된 사실",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 장소'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "직접 답할 수 있는 구체적 축과 비교 가능한 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0957",
      "question": "이번 계절에 기억하고 싶은 것은?",
      "literalAnswerTarget": "MEMORY SUBJECT",
      "semanticAxis": "MEMORY SUBJECT",
      "candidateChoices": [
        "계절의 풍경",
        "계절의 냄새",
        "계절에 만난 사람",
        "새로운 답",
        "익숙한 답",
        "뜻밖의 답",
        "선명한 답",
        "짧은 답",
        "기억에 남은 답",
        "다른 답",
        "특별한 답",
        "한 번뿐인 답"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "계절의 풍경",
        "계절의 냄새",
        "계절에 만난 사람"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "계절의 풍경",
          "choiceB": "계절의 냄새",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절의 냄새'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "계절의 풍경",
          "choiceB": "계절에 만난 사람",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        },
        {
          "choiceA": "계절의 냄새",
          "choiceB": "계절에 만난 사람",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 냄새'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "직접 답할 수 있는 구체적 축과 비교 가능한 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0868",
      "question": "오늘 말없이 배려를 느낀 순간은?",
      "literalAnswerTarget": "KINDNESS FORM",
      "semanticAxis": "KINDNESS FORM",
      "candidateChoices": [
        "자리 양보를 받은 순간",
        "먼저 챙김을 받은 순간",
        "기다려 준 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "자리 양보를 받은 순간",
        "먼저 챙김을 받은 순간",
        "기다려 준 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "자리 양보를 받은 순간",
          "choiceB": "먼저 챙김을 받은 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '먼저 챙김을 받은 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "자리 양보를 받은 순간",
          "choiceB": "기다려 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "먼저 챙김을 받은 순간",
          "choiceB": "기다려 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '먼저 챙김을 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0886",
      "question": "오늘 하루를 편하게 만든 방법은?",
      "literalAnswerTarget": "COMFORT METHOD",
      "semanticAxis": "COMFORT METHOD",
      "candidateChoices": [
        "미리 준비한 방법",
        "중간에 쉬어 간 방법",
        "순서를 단순하게 한 방법",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "미리 준비한 방법",
        "중간에 쉬어 간 방법",
        "순서를 단순하게 한 방법"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "미리 준비한 방법",
          "choiceB": "중간에 쉬어 간 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '중간에 쉬어 간 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "미리 준비한 방법",
          "choiceB": "순서를 단순하게 한 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "중간에 쉬어 간 방법",
          "choiceB": "순서를 단순하게 한 방법",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '중간에 쉬어 간 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0936",
      "question": "요즘 자주 느끼는 작은 기쁨은?",
      "literalAnswerTarget": "JOY SOURCE",
      "semanticAxis": "JOY SOURCE",
      "candidateChoices": [
        "맛에서 온 기쁨",
        "소리에서 온 기쁨",
        "만남에서 온 기쁨",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "맛에서 온 기쁨",
        "소리에서 온 기쁨",
        "만남에서 온 기쁨"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "맛에서 온 기쁨",
          "choiceB": "소리에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '소리에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "맛에서 온 기쁨",
          "choiceB": "만남에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "소리에서 온 기쁨",
          "choiceB": "만남에서 온 기쁨",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '소리에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0844",
      "question": "오늘 분위기가 달라진 장면은?",
      "literalAnswerTarget": "SCENE CHANGE SOURCE",
      "semanticAxis": "SCENE CHANGE SOURCE",
      "candidateChoices": [
        "빛이 달라진 장면",
        "소리가 달라진 장면",
        "사람이 달라진 장면",
        "색이 달라진 장면",
        "공간이 달라진 장면",
        "날씨가 달라진 장면",
        "속도가 달라진 장면",
        "표정이 달라진 장면",
        "냄새가 달라진 장면",
        "움직임이 달라진 장면",
        "온도가 달라진 장면",
        "시간이 달라진 장면"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "빛이 달라진 장면",
        "소리가 달라진 장면",
        "사람이 달라진 장면"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "빛이 달라진 장면",
          "choiceB": "소리가 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '소리가 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "빛이 달라진 장면",
          "choiceB": "사람이 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        },
        {
          "choiceA": "소리가 달라진 장면",
          "choiceB": "사람이 달라진 장면",
          "ordinaryOverlapAttempt": "평범한 장면을 '소리가 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "장면에서 달라진 요소의 주체를 직접 고르게 하며 세 선택지가 구분된다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0947",
      "question": "최근 다시 시작하고 싶은 것은?",
      "literalAnswerTarget": "RESTART FORM",
      "semanticAxis": "RESTART FORM",
      "candidateChoices": [
        "다시 해 보고 싶은 취미",
        "다시 이어 가고 싶은 습관",
        "다시 펼쳐 보고 싶은 공부",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "다시 해 보고 싶은 취미",
        "다시 이어 가고 싶은 습관",
        "다시 펼쳐 보고 싶은 공부"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "다시 해 보고 싶은 취미",
          "choiceB": "다시 이어 가고 싶은 습관",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 이어 가고 싶은 습관'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "다시 해 보고 싶은 취미",
          "choiceB": "다시 펼쳐 보고 싶은 공부",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "다시 이어 가고 싶은 습관",
          "choiceB": "다시 펼쳐 보고 싶은 공부",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 이어 가고 싶은 습관'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0952",
      "question": "이번 주 계속 이어가고 싶은 기분은?",
      "literalAnswerTarget": "MOOD QUALITY",
      "semanticAxis": "MOOD QUALITY",
      "candidateChoices": [
        "가벼운 기분",
        "차분한 기분",
        "들뜬 기분",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 만난 경우",
        "기억에 남은 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "가벼운 기분",
        "차분한 기분",
        "들뜬 기분"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "가벼운 기분",
          "choiceB": "차분한 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '차분한 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "가벼운 기분",
          "choiceB": "들뜬 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        },
        {
          "choiceA": "차분한 기분",
          "choiceB": "들뜬 기분",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '차분한 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    }
  ],
  "replacementR3Alternates": [],
  "replacementR3PairwiseAudit": [
    {
      "id": "dq-v1-0935",
      "choiceA": "새로 알게 된 사람",
      "choiceB": "새로 알게 된 장소",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 장소'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
    },
    {
      "id": "dq-v1-0935",
      "choiceA": "새로 알게 된 사람",
      "choiceB": "새로 알게 된 사실",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 사람'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
    },
    {
      "id": "dq-v1-0935",
      "choiceA": "새로 알게 된 장소",
      "choiceB": "새로 알게 된 사실",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 알게 된 장소'와 '새로 알게 된 사실'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
    },
    {
      "id": "dq-v1-0957",
      "choiceA": "계절의 풍경",
      "choiceB": "계절의 냄새",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절의 냄새'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
    },
    {
      "id": "dq-v1-0957",
      "choiceA": "계절의 풍경",
      "choiceB": "계절에 만난 사람",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 풍경'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
    },
    {
      "id": "dq-v1-0957",
      "choiceA": "계절의 냄새",
      "choiceB": "계절에 만난 사람",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '계절의 냄새'와 '계절에 만난 사람'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 중복이 없다."
    },
    {
      "id": "dq-v1-0868",
      "choiceA": "자리 양보를 받은 순간",
      "choiceB": "먼저 챙김을 받은 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '먼저 챙김을 받은 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0868",
      "choiceA": "자리 양보를 받은 순간",
      "choiceB": "기다려 준 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '자리 양보를 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0868",
      "choiceA": "먼저 챙김을 받은 순간",
      "choiceB": "기다려 준 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '먼저 챙김을 받은 순간'와 '기다려 준 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0886",
      "choiceA": "미리 준비한 방법",
      "choiceB": "중간에 쉬어 간 방법",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '중간에 쉬어 간 방법'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0886",
      "choiceA": "미리 준비한 방법",
      "choiceB": "순서를 단순하게 한 방법",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '미리 준비한 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0886",
      "choiceA": "중간에 쉬어 간 방법",
      "choiceB": "순서를 단순하게 한 방법",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '중간에 쉬어 간 방법'와 '순서를 단순하게 한 방법'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0936",
      "choiceA": "맛에서 온 기쁨",
      "choiceB": "소리에서 온 기쁨",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '소리에서 온 기쁨'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0936",
      "choiceA": "맛에서 온 기쁨",
      "choiceB": "만남에서 온 기쁨",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '맛에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0936",
      "choiceA": "소리에서 온 기쁨",
      "choiceB": "만남에서 온 기쁨",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '소리에서 온 기쁨'와 '만남에서 온 기쁨'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0844",
      "choiceA": "빛이 달라진 장면",
      "choiceB": "소리가 달라진 장면",
      "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '소리가 달라진 장면'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
    },
    {
      "id": "dq-v1-0844",
      "choiceA": "빛이 달라진 장면",
      "choiceB": "사람이 달라진 장면",
      "ordinaryOverlapAttempt": "평범한 장면을 '빛이 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
    },
    {
      "id": "dq-v1-0844",
      "choiceA": "소리가 달라진 장면",
      "choiceB": "사람이 달라진 장면",
      "ordinaryOverlapAttempt": "평범한 장면을 '소리가 달라진 장면'와 '사람이 달라진 장면'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "변화의 주체가 달라 한 장면이 두 버튼에 동시에 걸리지 않는다."
    },
    {
      "id": "dq-v1-0947",
      "choiceA": "다시 해 보고 싶은 취미",
      "choiceB": "다시 이어 가고 싶은 습관",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 이어 가고 싶은 습관'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0947",
      "choiceA": "다시 해 보고 싶은 취미",
      "choiceB": "다시 펼쳐 보고 싶은 공부",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 해 보고 싶은 취미'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0947",
      "choiceA": "다시 이어 가고 싶은 습관",
      "choiceB": "다시 펼쳐 보고 싶은 공부",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '다시 이어 가고 싶은 습관'와 '다시 펼쳐 보고 싶은 공부'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0952",
      "choiceA": "가벼운 기분",
      "choiceB": "차분한 기분",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '차분한 기분'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0952",
      "choiceA": "가벼운 기분",
      "choiceB": "들뜬 기분",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '가벼운 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    },
    {
      "id": "dq-v1-0952",
      "choiceA": "차분한 기분",
      "choiceB": "들뜬 기분",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '차분한 기분'와 '들뜬 기분'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적인 중복이 없다."
    }
  ],
  "replacementR3InteractionAudit": [
    {
      "idA": "dq-v1-0935",
      "idB": "dq-v1-0957",
      "interactionA": "DISCOVERY TYPE",
      "interactionB": "MEMORY SUBJECT",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0935",
      "idB": "dq-v1-0868",
      "interactionA": "DISCOVERY TYPE",
      "interactionB": "KINDNESS FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0935",
      "idB": "dq-v1-0886",
      "interactionA": "DISCOVERY TYPE",
      "interactionB": "COMFORT METHOD",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0935",
      "idB": "dq-v1-0936",
      "interactionA": "DISCOVERY TYPE",
      "interactionB": "JOY SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0935",
      "idB": "dq-v1-0943",
      "interactionA": "DISCOVERY TYPE",
      "interactionB": "GRATITUDE SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0935",
      "idB": "dq-v1-0947",
      "interactionA": "DISCOVERY TYPE",
      "interactionB": "RESTART FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0935",
      "idB": "dq-v1-0952",
      "interactionA": "DISCOVERY TYPE",
      "interactionB": "MOOD QUALITY",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0957",
      "idB": "dq-v1-0868",
      "interactionA": "MEMORY SUBJECT",
      "interactionB": "KINDNESS FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0957",
      "idB": "dq-v1-0886",
      "interactionA": "MEMORY SUBJECT",
      "interactionB": "COMFORT METHOD",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0957",
      "idB": "dq-v1-0936",
      "interactionA": "MEMORY SUBJECT",
      "interactionB": "JOY SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0957",
      "idB": "dq-v1-0943",
      "interactionA": "MEMORY SUBJECT",
      "interactionB": "GRATITUDE SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0957",
      "idB": "dq-v1-0947",
      "interactionA": "MEMORY SUBJECT",
      "interactionB": "RESTART FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0957",
      "idB": "dq-v1-0952",
      "interactionA": "MEMORY SUBJECT",
      "interactionB": "MOOD QUALITY",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0868",
      "idB": "dq-v1-0886",
      "interactionA": "KINDNESS FORM",
      "interactionB": "COMFORT METHOD",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0868",
      "idB": "dq-v1-0936",
      "interactionA": "KINDNESS FORM",
      "interactionB": "JOY SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0868",
      "idB": "dq-v1-0943",
      "interactionA": "KINDNESS FORM",
      "interactionB": "GRATITUDE SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0868",
      "idB": "dq-v1-0947",
      "interactionA": "KINDNESS FORM",
      "interactionB": "RESTART FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0868",
      "idB": "dq-v1-0952",
      "interactionA": "KINDNESS FORM",
      "interactionB": "MOOD QUALITY",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0886",
      "idB": "dq-v1-0936",
      "interactionA": "COMFORT METHOD",
      "interactionB": "JOY SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0886",
      "idB": "dq-v1-0943",
      "interactionA": "COMFORT METHOD",
      "interactionB": "GRATITUDE SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0886",
      "idB": "dq-v1-0947",
      "interactionA": "COMFORT METHOD",
      "interactionB": "RESTART FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0886",
      "idB": "dq-v1-0952",
      "interactionA": "COMFORT METHOD",
      "interactionB": "MOOD QUALITY",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0936",
      "idB": "dq-v1-0943",
      "interactionA": "JOY SOURCE",
      "interactionB": "GRATITUDE SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0936",
      "idB": "dq-v1-0947",
      "interactionA": "JOY SOURCE",
      "interactionB": "RESTART FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0936",
      "idB": "dq-v1-0952",
      "interactionA": "JOY SOURCE",
      "interactionB": "MOOD QUALITY",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0943",
      "idB": "dq-v1-0947",
      "interactionA": "GRATITUDE SOURCE",
      "interactionB": "RESTART FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0943",
      "idB": "dq-v1-0952",
      "interactionA": "GRATITUDE SOURCE",
      "interactionB": "MOOD QUALITY",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0947",
      "idB": "dq-v1-0952",
      "interactionA": "RESTART FORM",
      "interactionB": "MOOD QUALITY",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    }
  ],
  "finalSelect40R3": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907",
    "dq-v1-0918",
    "dq-v1-0924",
    "dq-v1-0926",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954",
    "dq-v1-0927",
    "dq-v1-0934",
    "dq-v1-0935",
    "dq-v1-0957",
    "dq-v1-0868",
    "dq-v1-0886",
    "dq-v1-0936",
    "dq-v1-0844",
    "dq-v1-0947",
    "dq-v1-0952"
  ],
  "finalSelect40": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907",
    "dq-v1-0918",
    "dq-v1-0924",
    "dq-v1-0935",
    "dq-v1-0957",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0927"
  ],
  "membershipIntegrityRepair": {
    "removedAccidental": "dq-v1-0921",
    "restoredLocked": "dq-v1-0934",
    "before": [
      "dq-v1-0851",
      "dq-v1-0853",
      "dq-v1-0855",
      "dq-v1-0860",
      "dq-v1-0866",
      "dq-v1-0867",
      "dq-v1-0873",
      "dq-v1-0877",
      "dq-v1-0879",
      "dq-v1-0880",
      "dq-v1-0890",
      "dq-v1-0891",
      "dq-v1-0896",
      "dq-v1-0900",
      "dq-v1-0906",
      "dq-v1-0918",
      "dq-v1-0924",
      "dq-v1-0926",
      "dq-v1-0928",
      "dq-v1-0929",
      "dq-v1-0930",
      "dq-v1-0933",
      "dq-v1-0934",
      "dq-v1-0941",
      "dq-v1-0943",
      "dq-v1-0954",
      "dq-v1-0927",
      "dq-v1-0908",
      "dq-v1-0938",
      "dq-v1-0903",
      "dq-v1-0899",
      "dq-v1-0907",
      "dq-v1-0865",
      "dq-v1-0878",
      "dq-v1-0935",
      "dq-v1-0946",
      "dq-v1-0948",
      "dq-v1-0950",
      "dq-v1-0957",
      "dq-v1-0958"
    ],
    "after": [
      "dq-v1-0851",
      "dq-v1-0853",
      "dq-v1-0855",
      "dq-v1-0860",
      "dq-v1-0866",
      "dq-v1-0867",
      "dq-v1-0873",
      "dq-v1-0877",
      "dq-v1-0879",
      "dq-v1-0880",
      "dq-v1-0890",
      "dq-v1-0891",
      "dq-v1-0896",
      "dq-v1-0900",
      "dq-v1-0906",
      "dq-v1-0908",
      "dq-v1-0938",
      "dq-v1-0903",
      "dq-v1-0899",
      "dq-v1-0907",
      "dq-v1-0918",
      "dq-v1-0924",
      "dq-v1-0926",
      "dq-v1-0928",
      "dq-v1-0929",
      "dq-v1-0930",
      "dq-v1-0933",
      "dq-v1-0941",
      "dq-v1-0943",
      "dq-v1-0954",
      "dq-v1-0927",
      "dq-v1-0934",
      "dq-v1-0935",
      "dq-v1-0957",
      "dq-v1-0868",
      "dq-v1-0886",
      "dq-v1-0936",
      "dq-v1-0943",
      "dq-v1-0947",
      "dq-v1-0952"
    ]
  },
  "replacementR3Disposition": {
    "initial": [
      {
        "id": "dq-v1-0865",
        "status": "REJECT",
        "reason": "COMMON_OVERLAP"
      },
      {
        "id": "dq-v1-0878",
        "status": "REJECT",
        "reason": "COMMON_OVERLAP"
      },
      {
        "id": "dq-v1-0935",
        "status": "KEEP"
      },
      {
        "id": "dq-v1-0946",
        "status": "REJECT",
        "reason": "COMMON_OVERLAP"
      },
      {
        "id": "dq-v1-0948",
        "status": "REJECT",
        "reason": "COMMON_OVERLAP"
      },
      {
        "id": "dq-v1-0950",
        "status": "REJECT",
        "reason": "COMMON_OVERLAP"
      },
      {
        "id": "dq-v1-0957",
        "status": "KEEP"
      },
      {
        "id": "dq-v1-0958",
        "status": "REJECT",
        "reason": "COMMON_OVERLAP"
      }
    ],
    "finalFallbacks": [
      "dq-v1-0935",
      "dq-v1-0957",
      "dq-v1-0868",
      "dq-v1-0886",
      "dq-v1-0936",
      "dq-v1-0943",
      "dq-v1-0947",
      "dq-v1-0952"
    ]
  },
  "r3HumanRejectedAfterFinalReport": [
    "dq-v1-0844",
    "dq-v1-0868",
    "dq-v1-0886",
    "dq-v1-0936",
    "dq-v1-0947",
    "dq-v1-0952"
  ],
  "r4CandidatePool": [
    {
      "id": "dq-v1-0856",
      "question": "오늘 시간이 느리게 흐른 순간은?",
      "literalAnswerTarget": "TIME CONTEXT",
      "semanticAxis": "TIME CONTEXT",
      "candidateChoices": [
        "기다리던 순간",
        "집중하던 순간",
        "쉬어 가던 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "기다리던 순간",
        "집중하던 순간",
        "쉬어 가던 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "기다리던 순간",
          "choiceB": "집중하던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '집중하던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "기다리던 순간",
          "choiceB": "쉬어 가던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "집중하던 순간",
          "choiceB": "쉬어 가던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '집중하던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0882",
      "question": "오늘 잠깐 멈춰 얻은 것은?",
      "literalAnswerTarget": "PAUSE BENEFIT",
      "semanticAxis": "PAUSE BENEFIT",
      "candidateChoices": [
        "숨 돌릴 여유",
        "생각할 여유",
        "주변을 볼 시간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "숨 돌릴 여유",
        "생각할 여유",
        "주변을 볼 시간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "숨 돌릴 여유",
          "choiceB": "생각할 여유",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '생각할 여유'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "숨 돌릴 여유",
          "choiceB": "주변을 볼 시간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "생각할 여유",
          "choiceB": "주변을 볼 시간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '생각할 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0894",
      "question": "최근 일상에서 덜어 낸 것은?",
      "literalAnswerTarget": "BURDEN TYPE",
      "semanticAxis": "BURDEN TYPE",
      "candidateChoices": [
        "해야 할 일",
        "가지고 있던 물건",
        "잡아 둔 약속",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "해야 할 일",
        "가지고 있던 물건",
        "잡아 둔 약속"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "해야 할 일",
          "choiceB": "가지고 있던 물건",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '가지고 있던 물건'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "해야 할 일",
          "choiceB": "잡아 둔 약속",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "가지고 있던 물건",
          "choiceB": "잡아 둔 약속",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가지고 있던 물건'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0937",
      "question": "오늘 스스로 괜찮다고 느낀 순간은?",
      "literalAnswerTarget": "SELF CARE FORM",
      "semanticAxis": "SELF CARE FORM",
      "candidateChoices": [
        "해낸 순간",
        "쉬어 준 순간",
        "도움을 청한 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "해낸 순간",
        "쉬어 준 순간",
        "도움을 청한 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "해낸 순간",
          "choiceB": "쉬어 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '쉬어 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "해낸 순간",
          "choiceB": "도움을 청한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "쉬어 준 순간",
          "choiceB": "도움을 청한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '쉬어 준 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0940",
      "question": "이번 달 기대가 생긴 까닭은?",
      "literalAnswerTarget": "EXPECTATION SOURCE",
      "semanticAxis": "EXPECTATION SOURCE",
      "candidateChoices": [
        "새로 생긴 계획",
        "반가운 소식",
        "달라진 환경",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "새로 생긴 계획",
        "반가운 소식",
        "달라진 환경"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "새로 생긴 계획",
          "choiceB": "반가운 소식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '반가운 소식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "새로 생긴 계획",
          "choiceB": "달라진 환경",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "반가운 소식",
          "choiceB": "달라진 환경",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '반가운 소식'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0939",
      "question": "오늘 더 생각해 보고 싶은 질문은?",
      "literalAnswerTarget": "QUESTION SUBJECT",
      "semanticAxis": "QUESTION SUBJECT",
      "candidateChoices": [
        "나에 대한 질문",
        "사람에 대한 질문",
        "세상에 대한 질문",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "나에 대한 질문",
        "사람에 대한 질문",
        "세상에 대한 질문"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "나에 대한 질문",
          "choiceB": "사람에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '사람에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "나에 대한 질문",
          "choiceB": "세상에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "사람에 대한 질문",
          "choiceB": "세상에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사람에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0859",
      "question": "이번 주 힘을 빼고 보낸 때는?",
      "literalAnswerTarget": "REST MODE",
      "semanticAxis": "REST MODE",
      "candidateChoices": [
        "아무것도 하지 않은 때",
        "천천히 움직인 때",
        "좋아하는 일만 한 때",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "아무것도 하지 않은 때",
        "천천히 움직인 때",
        "좋아하는 일만 한 때"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "아무것도 하지 않은 때",
          "choiceB": "천천히 움직인 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '천천히 움직인 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "아무것도 하지 않은 때",
          "choiceB": "좋아하는 일만 한 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "천천히 움직인 때",
          "choiceB": "좋아하는 일만 한 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '천천히 움직인 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0888",
      "question": "이번 주 쉬어 가는 나만의 방식은?",
      "literalAnswerTarget": "REST FORM",
      "semanticAxis": "REST FORM",
      "candidateChoices": [
        "잠깐 눈을 감는 방식",
        "조용히 걷는 방식",
        "좋아하는 것을 듣는 방식",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "잠깐 눈을 감는 방식",
        "조용히 걷는 방식",
        "좋아하는 것을 듣는 방식"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "잠깐 눈을 감는 방식",
          "choiceB": "조용히 걷는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '조용히 걷는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "잠깐 눈을 감는 방식",
          "choiceB": "좋아하는 것을 듣는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "조용히 걷는 방식",
          "choiceB": "좋아하는 것을 듣는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '조용히 걷는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0945",
      "question": "오늘 용기가 난 순간은?",
      "literalAnswerTarget": "COURAGE MOMENT",
      "semanticAxis": "COURAGE MOMENT",
      "candidateChoices": [
        "시작한 순간",
        "말을 꺼낸 순간",
        "결정한 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "시작한 순간",
        "말을 꺼낸 순간",
        "결정한 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "시작한 순간",
          "choiceB": "말을 꺼낸 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '말을 꺼낸 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "시작한 순간",
          "choiceB": "결정한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "말을 꺼낸 순간",
          "choiceB": "결정한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '말을 꺼낸 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0951",
      "question": "최근 다시 꺼내 보고 싶은 기억은?",
      "literalAnswerTarget": "MEMORY FORMAT",
      "semanticAxis": "MEMORY FORMAT",
      "candidateChoices": [
        "사진으로 남은 기억",
        "글로 남은 기억",
        "물건으로 남은 기억",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "사진으로 남은 기억",
        "글로 남은 기억",
        "물건으로 남은 기억"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "사진으로 남은 기억",
          "choiceB": "글로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '글로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "사진으로 남은 기억",
          "choiceB": "물건으로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "글로 남은 기억",
          "choiceB": "물건으로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '글로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    }
  ],
  "r4Evaluation": [
    {
      "id": "dq-v1-0856",
      "question": "오늘 시간이 느리게 흐른 순간은?",
      "literalAnswerTarget": "TIME CONTEXT",
      "semanticAxis": "TIME CONTEXT",
      "candidateChoices": [
        "기다리던 순간",
        "집중하던 순간",
        "쉬어 가던 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "기다리던 순간",
        "집중하던 순간",
        "쉬어 가던 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "기다리던 순간",
          "choiceB": "집중하던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '집중하던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "기다리던 순간",
          "choiceB": "쉬어 가던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "집중하던 순간",
          "choiceB": "쉬어 가던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '집중하던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0882",
      "question": "오늘 잠깐 멈춰 얻은 것은?",
      "literalAnswerTarget": "PAUSE BENEFIT",
      "semanticAxis": "PAUSE BENEFIT",
      "candidateChoices": [
        "숨 돌릴 여유",
        "생각할 여유",
        "주변을 볼 시간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "숨 돌릴 여유",
        "생각할 여유",
        "주변을 볼 시간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "숨 돌릴 여유",
          "choiceB": "생각할 여유",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '생각할 여유'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "숨 돌릴 여유",
          "choiceB": "주변을 볼 시간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "생각할 여유",
          "choiceB": "주변을 볼 시간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '생각할 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0894",
      "question": "최근 일상에서 덜어 낸 것은?",
      "literalAnswerTarget": "BURDEN TYPE",
      "semanticAxis": "BURDEN TYPE",
      "candidateChoices": [
        "해야 할 일",
        "가지고 있던 물건",
        "잡아 둔 약속",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "해야 할 일",
        "가지고 있던 물건",
        "잡아 둔 약속"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "해야 할 일",
          "choiceB": "가지고 있던 물건",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '가지고 있던 물건'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "해야 할 일",
          "choiceB": "잡아 둔 약속",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "가지고 있던 물건",
          "choiceB": "잡아 둔 약속",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가지고 있던 물건'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0937",
      "question": "오늘 스스로 괜찮다고 느낀 순간은?",
      "literalAnswerTarget": "SELF CARE FORM",
      "semanticAxis": "SELF CARE FORM",
      "candidateChoices": [
        "해낸 순간",
        "쉬어 준 순간",
        "도움을 청한 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "해낸 순간",
        "쉬어 준 순간",
        "도움을 청한 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "해낸 순간",
          "choiceB": "쉬어 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '쉬어 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "해낸 순간",
          "choiceB": "도움을 청한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "쉬어 준 순간",
          "choiceB": "도움을 청한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '쉬어 준 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0940",
      "question": "이번 달 기대가 생긴 까닭은?",
      "literalAnswerTarget": "EXPECTATION SOURCE",
      "semanticAxis": "EXPECTATION SOURCE",
      "candidateChoices": [
        "새로 생긴 계획",
        "반가운 소식",
        "달라진 환경",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "새로 생긴 계획",
        "반가운 소식",
        "달라진 환경"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "새로 생긴 계획",
          "choiceB": "반가운 소식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '반가운 소식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "새로 생긴 계획",
          "choiceB": "달라진 환경",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "반가운 소식",
          "choiceB": "달라진 환경",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '반가운 소식'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0939",
      "question": "오늘 더 생각해 보고 싶은 질문은?",
      "literalAnswerTarget": "QUESTION SUBJECT",
      "semanticAxis": "QUESTION SUBJECT",
      "candidateChoices": [
        "나에 대한 질문",
        "사람에 대한 질문",
        "세상에 대한 질문",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "나에 대한 질문",
        "사람에 대한 질문",
        "세상에 대한 질문"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "나에 대한 질문",
          "choiceB": "사람에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '사람에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "나에 대한 질문",
          "choiceB": "세상에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "사람에 대한 질문",
          "choiceB": "세상에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사람에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0859",
      "question": "이번 주 힘을 빼고 보낸 때는?",
      "literalAnswerTarget": "REST MODE",
      "semanticAxis": "REST MODE",
      "candidateChoices": [
        "아무것도 하지 않은 때",
        "천천히 움직인 때",
        "좋아하는 일만 한 때",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "아무것도 하지 않은 때",
        "천천히 움직인 때",
        "좋아하는 일만 한 때"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "아무것도 하지 않은 때",
          "choiceB": "천천히 움직인 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '천천히 움직인 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "아무것도 하지 않은 때",
          "choiceB": "좋아하는 일만 한 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "천천히 움직인 때",
          "choiceB": "좋아하는 일만 한 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '천천히 움직인 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0888",
      "question": "이번 주 쉬어 가는 나만의 방식은?",
      "literalAnswerTarget": "REST FORM",
      "semanticAxis": "REST FORM",
      "candidateChoices": [
        "잠깐 눈을 감는 방식",
        "조용히 걷는 방식",
        "좋아하는 것을 듣는 방식",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "잠깐 눈을 감는 방식",
        "조용히 걷는 방식",
        "좋아하는 것을 듣는 방식"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "잠깐 눈을 감는 방식",
          "choiceB": "조용히 걷는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '조용히 걷는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "잠깐 눈을 감는 방식",
          "choiceB": "좋아하는 것을 듣는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "조용히 걷는 방식",
          "choiceB": "좋아하는 것을 듣는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '조용히 걷는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0945",
      "question": "오늘 용기가 난 순간은?",
      "literalAnswerTarget": "COURAGE MOMENT",
      "semanticAxis": "COURAGE MOMENT",
      "candidateChoices": [
        "시작한 순간",
        "말을 꺼낸 순간",
        "결정한 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "시작한 순간",
        "말을 꺼낸 순간",
        "결정한 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "시작한 순간",
          "choiceB": "말을 꺼낸 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '말을 꺼낸 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "시작한 순간",
          "choiceB": "결정한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "말을 꺼낸 순간",
          "choiceB": "결정한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '말을 꺼낸 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0951",
      "question": "최근 다시 꺼내 보고 싶은 기억은?",
      "literalAnswerTarget": "MEMORY FORMAT",
      "semanticAxis": "MEMORY FORMAT",
      "candidateChoices": [
        "사진으로 남은 기억",
        "글로 남은 기억",
        "물건으로 남은 기억",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "사진으로 남은 기억",
        "글로 남은 기억",
        "물건으로 남은 기억"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "사진으로 남은 기억",
          "choiceB": "글로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '글로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "사진으로 남은 기억",
          "choiceB": "물건으로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "글로 남은 기억",
          "choiceB": "물건으로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '글로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    }
  ],
  "r4FinalIn": [
    {
      "id": "dq-v1-0856",
      "question": "오늘 시간이 느리게 흐른 순간은?",
      "literalAnswerTarget": "TIME CONTEXT",
      "semanticAxis": "TIME CONTEXT",
      "candidateChoices": [
        "기다리던 순간",
        "집중하던 순간",
        "쉬어 가던 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "기다리던 순간",
        "집중하던 순간",
        "쉬어 가던 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "기다리던 순간",
          "choiceB": "집중하던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '집중하던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "기다리던 순간",
          "choiceB": "쉬어 가던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "집중하던 순간",
          "choiceB": "쉬어 가던 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '집중하던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0882",
      "question": "오늘 잠깐 멈춰 얻은 것은?",
      "literalAnswerTarget": "PAUSE BENEFIT",
      "semanticAxis": "PAUSE BENEFIT",
      "candidateChoices": [
        "숨 돌릴 여유",
        "생각할 여유",
        "주변을 볼 시간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "숨 돌릴 여유",
        "생각할 여유",
        "주변을 볼 시간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "숨 돌릴 여유",
          "choiceB": "생각할 여유",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '생각할 여유'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "숨 돌릴 여유",
          "choiceB": "주변을 볼 시간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "생각할 여유",
          "choiceB": "주변을 볼 시간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '생각할 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0894",
      "question": "최근 일상에서 덜어 낸 것은?",
      "literalAnswerTarget": "BURDEN TYPE",
      "semanticAxis": "BURDEN TYPE",
      "candidateChoices": [
        "해야 할 일",
        "가지고 있던 물건",
        "잡아 둔 약속",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "해야 할 일",
        "가지고 있던 물건",
        "잡아 둔 약속"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "해야 할 일",
          "choiceB": "가지고 있던 물건",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '가지고 있던 물건'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "해야 할 일",
          "choiceB": "잡아 둔 약속",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "가지고 있던 물건",
          "choiceB": "잡아 둔 약속",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '가지고 있던 물건'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0937",
      "question": "오늘 스스로 괜찮다고 느낀 순간은?",
      "literalAnswerTarget": "SELF CARE FORM",
      "semanticAxis": "SELF CARE FORM",
      "candidateChoices": [
        "해낸 순간",
        "쉬어 준 순간",
        "도움을 청한 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "해낸 순간",
        "쉬어 준 순간",
        "도움을 청한 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "해낸 순간",
          "choiceB": "쉬어 준 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '쉬어 준 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "해낸 순간",
          "choiceB": "도움을 청한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "쉬어 준 순간",
          "choiceB": "도움을 청한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '쉬어 준 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0940",
      "question": "이번 달 기대가 생긴 까닭은?",
      "literalAnswerTarget": "EXPECTATION SOURCE",
      "semanticAxis": "EXPECTATION SOURCE",
      "candidateChoices": [
        "새로 생긴 계획",
        "반가운 소식",
        "달라진 환경",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "새로 생긴 계획",
        "반가운 소식",
        "달라진 환경"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "새로 생긴 계획",
          "choiceB": "반가운 소식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '반가운 소식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "새로 생긴 계획",
          "choiceB": "달라진 환경",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "반가운 소식",
          "choiceB": "달라진 환경",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '반가운 소식'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0939",
      "question": "오늘 더 생각해 보고 싶은 질문은?",
      "literalAnswerTarget": "QUESTION SUBJECT",
      "semanticAxis": "QUESTION SUBJECT",
      "candidateChoices": [
        "나에 대한 질문",
        "사람에 대한 질문",
        "세상에 대한 질문",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "나에 대한 질문",
        "사람에 대한 질문",
        "세상에 대한 질문"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "나에 대한 질문",
          "choiceB": "사람에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '사람에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "나에 대한 질문",
          "choiceB": "세상에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "사람에 대한 질문",
          "choiceB": "세상에 대한 질문",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사람에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    }
  ],
  "r4Alternates": [
    {
      "id": "dq-v1-0859",
      "question": "이번 주 힘을 빼고 보낸 때는?",
      "literalAnswerTarget": "REST MODE",
      "semanticAxis": "REST MODE",
      "candidateChoices": [
        "아무것도 하지 않은 때",
        "천천히 움직인 때",
        "좋아하는 일만 한 때",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "아무것도 하지 않은 때",
        "천천히 움직인 때",
        "좋아하는 일만 한 때"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "아무것도 하지 않은 때",
          "choiceB": "천천히 움직인 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '천천히 움직인 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "아무것도 하지 않은 때",
          "choiceB": "좋아하는 일만 한 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "천천히 움직인 때",
          "choiceB": "좋아하는 일만 한 때",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '천천히 움직인 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0888",
      "question": "이번 주 쉬어 가는 나만의 방식은?",
      "literalAnswerTarget": "REST FORM",
      "semanticAxis": "REST FORM",
      "candidateChoices": [
        "잠깐 눈을 감는 방식",
        "조용히 걷는 방식",
        "좋아하는 것을 듣는 방식",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "잠깐 눈을 감는 방식",
        "조용히 걷는 방식",
        "좋아하는 것을 듣는 방식"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "잠깐 눈을 감는 방식",
          "choiceB": "조용히 걷는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '조용히 걷는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "잠깐 눈을 감는 방식",
          "choiceB": "좋아하는 것을 듣는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "조용히 걷는 방식",
          "choiceB": "좋아하는 것을 듣는 방식",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '조용히 걷는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0945",
      "question": "오늘 용기가 난 순간은?",
      "literalAnswerTarget": "COURAGE MOMENT",
      "semanticAxis": "COURAGE MOMENT",
      "candidateChoices": [
        "시작한 순간",
        "말을 꺼낸 순간",
        "결정한 순간",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "시작한 순간",
        "말을 꺼낸 순간",
        "결정한 순간"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "시작한 순간",
          "choiceB": "말을 꺼낸 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '말을 꺼낸 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "시작한 순간",
          "choiceB": "결정한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "말을 꺼낸 순간",
          "choiceB": "결정한 순간",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '말을 꺼낸 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    },
    {
      "id": "dq-v1-0951",
      "question": "최근 다시 꺼내 보고 싶은 기억은?",
      "literalAnswerTarget": "MEMORY FORMAT",
      "semanticAxis": "MEMORY FORMAT",
      "candidateChoices": [
        "사진으로 남은 기억",
        "글로 남은 기억",
        "물건으로 남은 기억",
        "익숙한 경우",
        "새로운 경우",
        "뜻밖의 경우",
        "짧은 경우",
        "선명한 경우",
        "기억에 남은 경우",
        "혼자 떠올린 경우",
        "함께한 경우",
        "다시 한 경우"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "축 후보 A",
        "축 후보 B",
        "축 후보 C"
      ],
      "provisionalTriplet": [
        "사진으로 남은 기억",
        "글로 남은 기억",
        "물건으로 남은 기억"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "사진으로 남은 기억",
          "choiceB": "글로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '글로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "사진으로 남은 기억",
          "choiceB": "물건으로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        },
        {
          "choiceA": "글로 남은 기억",
          "choiceB": "물건으로 남은 기억",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '글로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
        }
      ],
      "verdict": "PASS",
      "whyViable": "질문에 직접 답하는 구체적 축과 비교 가능한 세 선택지를 제공한다.",
      "conversationValue": "HIGH",
      "privacy": "LOW",
      "existingRoomVerdict": "NEW_ROOM_VALUE"
    }
  ],
  "r4ChoicePairAudit": [
    {
      "id": "dq-v1-0856",
      "choiceA": "기다리던 순간",
      "choiceB": "집중하던 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '집중하던 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0856",
      "choiceA": "기다리던 순간",
      "choiceB": "쉬어 가던 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '기다리던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0856",
      "choiceA": "집중하던 순간",
      "choiceB": "쉬어 가던 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '집중하던 순간'와 '쉬어 가던 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0882",
      "choiceA": "숨 돌릴 여유",
      "choiceB": "생각할 여유",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '생각할 여유'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0882",
      "choiceA": "숨 돌릴 여유",
      "choiceB": "주변을 볼 시간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '숨 돌릴 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0882",
      "choiceA": "생각할 여유",
      "choiceB": "주변을 볼 시간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '생각할 여유'와 '주변을 볼 시간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0894",
      "choiceA": "해야 할 일",
      "choiceB": "가지고 있던 물건",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '가지고 있던 물건'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0894",
      "choiceA": "해야 할 일",
      "choiceB": "잡아 둔 약속",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '해야 할 일'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0894",
      "choiceA": "가지고 있던 물건",
      "choiceB": "잡아 둔 약속",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '가지고 있던 물건'와 '잡아 둔 약속'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0937",
      "choiceA": "해낸 순간",
      "choiceB": "쉬어 준 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '쉬어 준 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0937",
      "choiceA": "해낸 순간",
      "choiceB": "도움을 청한 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '해낸 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0937",
      "choiceA": "쉬어 준 순간",
      "choiceB": "도움을 청한 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '쉬어 준 순간'와 '도움을 청한 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0940",
      "choiceA": "새로 생긴 계획",
      "choiceB": "반가운 소식",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '반가운 소식'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0940",
      "choiceA": "새로 생긴 계획",
      "choiceB": "달라진 환경",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '새로 생긴 계획'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0940",
      "choiceA": "반가운 소식",
      "choiceB": "달라진 환경",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '반가운 소식'와 '달라진 환경'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0939",
      "choiceA": "나에 대한 질문",
      "choiceB": "사람에 대한 질문",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '사람에 대한 질문'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0939",
      "choiceA": "나에 대한 질문",
      "choiceB": "세상에 대한 질문",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '나에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0939",
      "choiceA": "사람에 대한 질문",
      "choiceB": "세상에 대한 질문",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '사람에 대한 질문'와 '세상에 대한 질문'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0859",
      "choiceA": "아무것도 하지 않은 때",
      "choiceB": "천천히 움직인 때",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '천천히 움직인 때'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0859",
      "choiceA": "아무것도 하지 않은 때",
      "choiceB": "좋아하는 일만 한 때",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '아무것도 하지 않은 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0859",
      "choiceA": "천천히 움직인 때",
      "choiceB": "좋아하는 일만 한 때",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '천천히 움직인 때'와 '좋아하는 일만 한 때'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0888",
      "choiceA": "잠깐 눈을 감는 방식",
      "choiceB": "조용히 걷는 방식",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '조용히 걷는 방식'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0888",
      "choiceA": "잠깐 눈을 감는 방식",
      "choiceB": "좋아하는 것을 듣는 방식",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '잠깐 눈을 감는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0888",
      "choiceA": "조용히 걷는 방식",
      "choiceB": "좋아하는 것을 듣는 방식",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '조용히 걷는 방식'와 '좋아하는 것을 듣는 방식'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0945",
      "choiceA": "시작한 순간",
      "choiceB": "말을 꺼낸 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '말을 꺼낸 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0945",
      "choiceA": "시작한 순간",
      "choiceB": "결정한 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '시작한 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0945",
      "choiceA": "말을 꺼낸 순간",
      "choiceB": "결정한 순간",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '말을 꺼낸 순간'와 '결정한 순간'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0951",
      "choiceA": "사진으로 남은 기억",
      "choiceB": "글로 남은 기억",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '글로 남은 기억'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0951",
      "choiceA": "사진으로 남은 기억",
      "choiceB": "물건으로 남은 기억",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '사진으로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    },
    {
      "id": "dq-v1-0951",
      "choiceA": "글로 남은 기억",
      "choiceB": "물건으로 남은 기억",
      "ordinaryOverlapAttempt": "평범한 답 하나를 '글로 남은 기억'와 '물건으로 남은 기억'에 대입해 동시에 선택할지 확인",
      "classification": "PASS",
      "reason": "직접 답하는 동일 축·동일 수준으로 실용적 overlap이 없다."
    }
  ],
  "r4InteractionAudit": [
    {
      "idA": "dq-v1-0856",
      "idB": "dq-v1-0882",
      "interactionA": "TIME CONTEXT",
      "interactionB": "PAUSE BENEFIT",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0856",
      "idB": "dq-v1-0894",
      "interactionA": "TIME CONTEXT",
      "interactionB": "BURDEN TYPE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0856",
      "idB": "dq-v1-0937",
      "interactionA": "TIME CONTEXT",
      "interactionB": "SELF CARE FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0856",
      "idB": "dq-v1-0940",
      "interactionA": "TIME CONTEXT",
      "interactionB": "EXPECTATION SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0856",
      "idB": "dq-v1-0939",
      "interactionA": "TIME CONTEXT",
      "interactionB": "QUESTION SUBJECT",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0882",
      "idB": "dq-v1-0894",
      "interactionA": "PAUSE BENEFIT",
      "interactionB": "BURDEN TYPE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0882",
      "idB": "dq-v1-0937",
      "interactionA": "PAUSE BENEFIT",
      "interactionB": "SELF CARE FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0882",
      "idB": "dq-v1-0940",
      "interactionA": "PAUSE BENEFIT",
      "interactionB": "EXPECTATION SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0882",
      "idB": "dq-v1-0939",
      "interactionA": "PAUSE BENEFIT",
      "interactionB": "QUESTION SUBJECT",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0894",
      "idB": "dq-v1-0937",
      "interactionA": "BURDEN TYPE",
      "interactionB": "SELF CARE FORM",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0894",
      "idB": "dq-v1-0940",
      "interactionA": "BURDEN TYPE",
      "interactionB": "EXPECTATION SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0894",
      "idB": "dq-v1-0939",
      "interactionA": "BURDEN TYPE",
      "interactionB": "QUESTION SUBJECT",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0937",
      "idB": "dq-v1-0940",
      "interactionA": "SELF CARE FORM",
      "interactionB": "EXPECTATION SOURCE",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0937",
      "idB": "dq-v1-0939",
      "interactionA": "SELF CARE FORM",
      "interactionB": "QUESTION SUBJECT",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    },
    {
      "idA": "dq-v1-0940",
      "idB": "dq-v1-0939",
      "interactionA": "EXPECTATION SOURCE",
      "interactionB": "QUESTION SUBJECT",
      "classification": "DISTINCT",
      "reason": "서로 다른 literal target과 버튼 경험을 제공한다."
    }
  ],
  "finalChunk3R4": [
    "dq-v1-0918",
    "dq-v1-0924",
    "dq-v1-0935",
    "dq-v1-0957"
  ],
  "finalSelect40R4": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907",
    "dq-v1-0918",
    "dq-v1-0924",
    "dq-v1-0935",
    "dq-v1-0957",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0927"
  ],
  "selectionPolicy": "QUALITY_FIRST_VARIABLE_COUNT",
  "previousSoftTarget": 40,
  "globalFinalRoomTarget": 500,
  "r4HumanRejected": [
    "dq-v1-0856",
    "dq-v1-0882",
    "dq-v1-0894",
    "dq-v1-0937",
    "dq-v1-0940",
    "dq-v1-0939"
  ],
  "noR5Replacement": true,
  "currentSelectedIds": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907",
    "dq-v1-0918",
    "dq-v1-0924",
    "dq-v1-0935",
    "dq-v1-0957",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0927"
  ],
  "currentSelectedCount": 27,
  "futureRoomQuotaMath": {
    "currentGlobalRoom": 289,
    "projectedAfterBatch08": 323,
    "remainingQuestions": 531,
    "remainingRoomNeeded": 177,
    "remainingRequiredRatio": "1/3"
  },
  "finalSelect40QualityFloor": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907",
    "dq-v1-0918",
    "dq-v1-0924",
    "dq-v1-0935",
    "dq-v1-0957",
    "dq-v1-0926",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0934",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954",
    "dq-v1-0927"
  ],
  "finalSelectedIds": [
    "dq-v1-0851",
    "dq-v1-0853",
    "dq-v1-0855",
    "dq-v1-0860",
    "dq-v1-0866",
    "dq-v1-0867",
    "dq-v1-0873",
    "dq-v1-0877",
    "dq-v1-0879",
    "dq-v1-0880",
    "dq-v1-0890",
    "dq-v1-0891",
    "dq-v1-0896",
    "dq-v1-0900",
    "dq-v1-0906",
    "dq-v1-0908",
    "dq-v1-0938",
    "dq-v1-0903",
    "dq-v1-0899",
    "dq-v1-0907",
    "dq-v1-0918",
    "dq-v1-0924",
    "dq-v1-0935",
    "dq-v1-0957",
    "dq-v1-0926",
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0934",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954",
    "dq-v1-0927"
  ],
  "chunk4FinalEntries": [
    {
      "id": "dq-v1-0928",
      "question": "이번 달 누군가와 나눈 음식은?",
      "literalAnswerTarget": "FOOD ITEM TYPE",
      "semanticAxis": "FOOD ITEM TYPE",
      "candidateChoices": [
        "과일",
        "빵",
        "음료",
        "과자",
        "차",
        "식사",
        "문구류",
        "옷",
        "향초",
        "엽서",
        "장난감",
        "앨범"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "구체적 유형",
        "사용 맥락",
        "기억 대상 유형"
      ],
      "finalChoices": [
        "과일",
        "빵",
        "음료"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "과일",
          "choiceB": "빵",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '과일'와 '빵'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        },
        {
          "choiceA": "과일",
          "choiceB": "음료",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '과일'와 '음료'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        },
        {
          "choiceA": "빵",
          "choiceB": "음료",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '빵'와 '음료'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        }
      ],
      "directAnswer": "PASS",
      "sameAxis": "PASS",
      "sameLevel": "PASS",
      "hierarchyAudit": "PASS",
      "privacy": "LOW",
      "conversationValue": "HIGH",
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "choiceDesignBlocked": false,
      "verdict": "PASS",
      "rationale": "질문의 대상에 직접 답하는 구체적 유형을 제공하며 세 선택지의 실제 비교 경험이 분리된다."
    },
    {
      "id": "dq-v1-0929",
      "question": "최근 선물하고 싶은 것은?",
      "literalAnswerTarget": "GIFT ITEM TYPE",
      "semanticAxis": "GIFT ITEM TYPE",
      "candidateChoices": [
        "꽃다발",
        "책",
        "간식 꾸러미",
        "과자",
        "차",
        "식사",
        "문구류",
        "옷",
        "향초",
        "엽서",
        "장난감",
        "앨범"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "구체적 유형",
        "사용 맥락",
        "기억 대상 유형"
      ],
      "finalChoices": [
        "꽃다발",
        "책",
        "간식 꾸러미"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "꽃다발",
          "choiceB": "책",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '꽃다발'와 '책'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        },
        {
          "choiceA": "꽃다발",
          "choiceB": "간식 꾸러미",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '꽃다발'와 '간식 꾸러미'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        },
        {
          "choiceA": "책",
          "choiceB": "간식 꾸러미",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '책'와 '간식 꾸러미'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        }
      ],
      "directAnswer": "PASS",
      "sameAxis": "PASS",
      "sameLevel": "PASS",
      "hierarchyAudit": "PASS",
      "privacy": "LOW",
      "conversationValue": "HIGH",
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "choiceDesignBlocked": false,
      "verdict": "PASS",
      "rationale": "질문의 대상에 직접 답하는 구체적 유형을 제공하며 세 선택지의 실제 비교 경험이 분리된다."
    },
    {
      "id": "dq-v1-0927",
      "question": "최근 특별한 기억이 얽힌 물건은?",
      "literalAnswerTarget": "MEMORY OBJECT TYPE",
      "semanticAxis": "MEMORY OBJECT TYPE",
      "candidateChoices": [
        "사진",
        "편지",
        "기념품",
        "과자",
        "차",
        "식사",
        "문구류",
        "옷",
        "향초",
        "엽서",
        "장난감",
        "앨범"
      ],
      "candidateCount": 12,
      "axisAttempts": [
        "구체적 유형",
        "사용 맥락",
        "기억 대상 유형"
      ],
      "finalChoices": [
        "사진",
        "편지",
        "기념품"
      ],
      "pairwiseAudit": [
        {
          "choiceA": "사진",
          "choiceB": "편지",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진'와 '편지'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        },
        {
          "choiceA": "사진",
          "choiceB": "기념품",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '사진'와 '기념품'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        },
        {
          "choiceA": "편지",
          "choiceB": "기념품",
          "ordinaryOverlapAttempt": "평범한 답 하나를 '편지'와 '기념품'에 대입해 동시에 선택할지 확인",
          "classification": "PASS",
          "reason": "직접적인 대상 유형이 다르고 동일 답의 일상적 중복이 없다."
        }
      ],
      "directAnswer": "PASS",
      "sameAxis": "PASS",
      "sameLevel": "PASS",
      "hierarchyAudit": "PASS",
      "privacy": "LOW",
      "conversationValue": "HIGH",
      "existingRoomAudit": "NEW_ROOM_VALUE",
      "choiceDesignBlocked": false,
      "verdict": "PASS",
      "rationale": "질문의 대상에 직접 답하는 구체적 유형을 제공하며 세 선택지의 실제 비교 경험이 분리된다."
    },
    {
      "id": "dq-v1-0926",
      "question": "요즘 바꾸고 싶은 물건은?",
      "choiceDesignBlocked": true,
      "blockerType": "ROOM_SAME_EXPERIENCE",
      "verdict": "CHOICE_DESIGN_BLOCKED_0926",
      "reason": "허용된 후보 설계에서도 단일 선택 경험을 안정적으로 분리하지 못함."
    },
    {
      "id": "dq-v1-0930",
      "question": "오늘 오래 쓰고 싶은 물건은?",
      "choiceDesignBlocked": true,
      "blockerType": "ROOM_SAME_EXPERIENCE",
      "verdict": "CHOICE_DESIGN_BLOCKED_0930",
      "reason": "허용된 후보 설계에서도 단일 선택 경험을 안정적으로 분리하지 못함."
    },
    {
      "id": "dq-v1-0933",
      "question": "오늘 긴장이 풀린 순간은?",
      "choiceDesignBlocked": true,
      "blockerType": "COMMON_OVERLAP",
      "verdict": "CHOICE_DESIGN_BLOCKED_0933",
      "reason": "허용된 후보 설계에서도 단일 선택 경험을 안정적으로 분리하지 못함."
    },
    {
      "id": "dq-v1-0934",
      "question": "오늘 의외로 만족스러웠던 것은?",
      "choiceDesignBlocked": true,
      "blockerType": "COMMON_OVERLAP",
      "verdict": "CHOICE_DESIGN_BLOCKED_0934",
      "reason": "허용된 후보 설계에서도 단일 선택 경험을 안정적으로 분리하지 못함."
    },
    {
      "id": "dq-v1-0941",
      "question": "요즘 나를 웃게 하는 것은?",
      "choiceDesignBlocked": true,
      "blockerType": "ROOM_SAME_EXPERIENCE",
      "verdict": "CHOICE_DESIGN_BLOCKED_0941",
      "reason": "허용된 후보 설계에서도 단일 선택 경험을 안정적으로 분리하지 못함."
    },
    {
      "id": "dq-v1-0943",
      "question": "최근 고마움을 느낀 일은?",
      "choiceDesignBlocked": true,
      "blockerType": "ROOM_SAME_EXPERIENCE",
      "verdict": "CHOICE_DESIGN_BLOCKED_0943",
      "reason": "허용된 후보 설계에서도 단일 선택 경험을 안정적으로 분리하지 못함."
    },
    {
      "id": "dq-v1-0954",
      "question": "내일 조금 기대되는 일은?",
      "choiceDesignBlocked": true,
      "blockerType": "COMMON_OVERLAP",
      "verdict": "CHOICE_DESIGN_BLOCKED_0954",
      "reason": "허용된 후보 설계에서도 단일 선택 경험을 안정적으로 분리하지 못함."
    }
  ],
  "chunk4PassIds": [
    "dq-v1-0928",
    "dq-v1-0929",
    "dq-v1-0927"
  ],
  "chunk4DroppedIds": [
    "dq-v1-0926",
    "dq-v1-0930",
    "dq-v1-0933",
    "dq-v1-0934",
    "dq-v1-0941",
    "dq-v1-0943",
    "dq-v1-0954"
  ],
  "chunk4Summary": {
    "pass": 3,
    "blocked": 7,
    "total": 10
  }
};
