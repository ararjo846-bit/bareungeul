# 바른글

한국어 맞춤법·띄어쓰기 검사와 어색한 문장 다듬기를 한 화면에서 하는 앱입니다.
같은 코드로 **웹사이트**와 **안드로이드 APK**를 함께 만듭니다.

- **맞춤법 검사**: 인터넷 없이 기기 안에서 돌아갑니다. 자주 틀리는 맞춤법, 띄어쓰기, 번역투·이중 피동·중복 표현 규칙 230여 개.
- **AI로 문장 다듬기**: Claude가 문맥을 보고 어색한 문장을 고쳐 제안합니다. 제안을 하나씩 고르거나 다듬은 글을 통째로 쓸 수 있습니다.

## APK 받는 법 (GitHub 자동 빌드)

1. GitHub에서 새 저장소를 만듭니다 (비공개도 됩니다).
2. 이 폴더의 파일을 **그대로** 올립니다. 숨김 폴더 `.github`도 꼭 함께 올려야 합니다.
   - 웹에서 올릴 때: 저장소 → *Add file* → *Upload files* 에 폴더 안 내용을 끌어다 놓기
   - PC에서: `git init && git add . && git commit -m "first" && git branch -M main && git remote add origin <저장소 주소> && git push -u origin main`
3. 저장소의 **Actions** 탭에서 `바른글 빌드`가 돌아가는지 봅니다 (5~8분).
4. 끝나면 실행 기록을 눌러 아래쪽 **Artifacts**의 `bareungeul-apk`를 내려받습니다. 압축을 풀면 `bareungeul.apk`가 나옵니다.
5. 휴대폰에 옮겨 설치합니다. "출처를 알 수 없는 앱 설치"를 허용해야 할 수 있습니다.

> 디버그 서명 APK라 개인 설치용입니다. Play 스토어에 올리려면 따로 서명 키를 만들어야 합니다.

## 웹사이트로 쓰기 (선택)

같은 작업이 `www` 폴더를 GitHub Pages로도 올립니다.
저장소 **Settings → Pages → Source**를 **GitHub Actions**로 한 번 바꿔 두면,
`https://<아이디>.github.io/<저장소이름>/` 주소로 열립니다.
(Pages를 켜지 않아도 APK 빌드에는 영향이 없습니다.)

## AI 다듬기 설정

앱에서 오른쪽 위 **설정**을 눌러 Claude API 키를 넣으세요.

- 키는 [console.anthropic.com](https://console.anthropic.com)에서 만들 수 있고, 쓴 만큼 요금이 나옵니다.
- 키는 그 기기에만 저장되고, 다듬기를 누를 때 Anthropic 서버로만 보내집니다.
- 모델은 Sonnet(정확함)과 Haiku(빠르고 저렴함) 중에서 고를 수 있습니다.
- 공개 웹사이트에 올리면 방문자도 **자기 키**를 넣어야 AI 기능을 씁니다. 내 키가 사이트에 담기지는 않습니다.

## 파일 구성

| 파일 | 역할 |
|---|---|
| `src/rules.js` | 오프라인 맞춤법 규칙과 검사 엔진 |
| `src/page.html` | 화면과 동작 (AI 연결 포함) |
| `build.mjs` | 위 두 파일을 합쳐 `www/index.html`(앱·사이트용)을 만듭니다 |
| `capacitor.config.json` | 앱 이름·패키지 이름 (`com.bareungeul.app`) |
| `assets/` | 앱 아이콘·시작 화면 원본 |
| `.github/workflows/build.yml` | APK 빌드와 Pages 배포 |

### 규칙 더하기

`src/rules.js`의 `words` 목록에 `['틀린 말', '바른 말', '설명']` 한 줄을 넣고 다시 올리면 됩니다.

### PC에서 직접 빌드하려면

Node 20 이상, JDK 21, Android Studio가 있으면:

```
npm install
node build.mjs
npx cap add android
npx cap open android
```
