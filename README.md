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

## Shared Room backend

Solo 기록은 계속 브라우저별 `localStorage`에 남습니다. 방, 멤버십, 초대 코드는 Supabase PostgreSQL만 사용하며 localStorage fallback은 없습니다.

1. Supabase 프로젝트에서 Anonymous Sign-Ins를 활성화합니다.
2. SQL Editor에서 [supabase-schema.sql](./supabase-schema.sql)을 한 번 실행합니다.
3. [backend-config.js](./backend-config.js)에 프로젝트 URL과 **publishable key**를 입력합니다. `service_role` 키는 절대 브라우저나 저장소에 넣지 않습니다.
4. `main`에 배포하면 첫 방문에서 anonymous Auth user가 생성되고 닉네임을 설정할 수 있습니다.

`users.id`는 Supabase Auth user id를 그대로 사용합니다. 이후 Google/Apple/email identity를 같은 Auth user에 link하면, user/room/pet 데이터는 같은 record를 유지합니다.

## 범위

현재 배포에는 Solo Daily Core Loop와 Room Phase 1~2 UI가 포함됩니다. Room backend를 설정하면 anonymous identity, 닉네임, 방 만들기, 6자리 코드 참여를 사용할 수 있습니다. room daily question, answer unlock, fragment, growth는 다음 단계입니다.
