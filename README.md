# 하루 한 조각

모바일 브라우저에서 하루 하나의 기록을 남기고, 작은 햄스터와 함께 지내는 Stage 1 Solo v0.1입니다.

## 모바일 접속

GitHub Pages 배포가 완료되면 모바일 Chrome에서 아래 URL을 엽니다.

<https://ggyul-hue.github.io/daily-write/>

처음 접속한 기기에서 작성한 답변은 해당 브라우저의 `localStorage`에 저장됩니다. 같은 모바일 Chrome 프로필에서 다시 열면 오늘의 답변과 지난 기록이 유지됩니다. 브라우저 사이트 데이터 삭제, 시크릿 모드, 다른 기기에서는 기록이 공유되지 않습니다.

## GitHub Pages 배포

이 저장소는 빌드 단계가 없는 정적 사이트입니다. `.github/workflows/deploy-pages.yml`이 `main` 브랜치에 push될 때 자동으로 배포합니다.

1. 이 파일들을 `ggyul-hue/daily-write` 저장소의 기본 브랜치에 push합니다.
2. GitHub 저장소의 `Settings` → `Pages`에서 `Source`를 `GitHub Actions`로 설정합니다.
3. `Actions` 탭에서 `Deploy to GitHub Pages` 실행이 완료될 때까지 기다립니다.
4. 모바일 Chrome에서 <https://ggyul-hue.github.io/daily-write/>를 엽니다.

이후 `main`에 push할 때마다 같은 URL이 갱신됩니다. 수동 배포가 필요하면 `Actions` → `Deploy to GitHub Pages` → `Run workflow`를 사용합니다.

## 로컬 확인

Node.js가 설치되어 있다면:

```text
npm test
```

정적 파일은 임의의 정적 서버로도 제공할 수 있습니다. 예를 들어 Python이 설치되어 있다면 프로젝트 루트에서:

```text
py -m http.server 4173
```

그 다음 브라우저에서 <http://127.0.0.1:4173/>를 엽니다.

## 범위

현재 배포에는 Stage 1 Solo v0.1만 포함됩니다. 답변 저장과 기록 조회는 브라우저별 `localStorage`를 사용하며, 친구 방·월간 생명주기·추가 동물 기능은 포함하지 않습니다.
