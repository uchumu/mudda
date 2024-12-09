# 우리들의 추억을 무따 | mudda

![alt text](public/open-graph.png)

추억을 캡슐로 묻어보세요.

우리들의 추억을 무따, **mudda** 프론트엔드 레포지토리입니다.

## 테오의 스프린트 18기 11조

|닉네임|포지션|Link|
|---|---|---|
|조디|디자이너||
|후니|BE|[깃허브](https://github.com/orgs/uchumu/people/Gem-o-b)|
|**브릭스**|**FE(프로젝트 리더)**|[깃허브](https://github.com/orgs/uchumu/people/bunzzeok)|
|바삭|FE|[깃허브](https://github.com/orgs/uchumu/people/yangBasak)|
|덕춘|FE|[깃허브](https://github.com/orgs/uchumu/people/Minsoek96)|
|쟌|FE|[깃허브](https://github.com/orgs/uchumu/people/bbbjihan)|

# 스크립트

- 자세한 내용은 `package.json`의 `"scripts"`에서 확인하실 수 있습니다.

|스크립트|설명|
|---|---|
|`npm i`|의존성 설치|
|`npm run dev`|개발 환경 가동|
|`npm run build`|빌드|

# 템플릿 코드 디렉토리 구조

```
src
├── _app                              # 애플리케이션의 전역 설정 및 로직을 관리하는 폴더
│   ├── pages                         # 애플리케이션의 주요 화면 컴포넌트를 구성하는 폴더
│   │   └── IntroPage
│   └── Providers                     # 전역 상태 및 라우터와 같은 Provider 설정 폴더
│       └── router                    # 애플리케이션 라우팅 관련 설정 및 구성 파일
│ 
├── assets                            # 이미지, 아이콘, 폰트와 같은 정적 자산을 저장하는 폴더
│ 
├── components                        # 애플리케이션에서 재사용 가능한 UI 컴포넌트를 저장하는 폴더
├── contants                          # 애플리케이션에서 사용하는 상수를 정의하는 폴더
├── hooks                             # 애플리케이션에서 재사용 가능한 React 커스텀 훅을 정의하는 폴더
│ 
├── queries                           # API 호출 및 상태 관리 로직을 정의하는 폴더
│   ├── Domain                        # 특정 도메인에 관련된 API 호출 및 상태 관리 폴더
│   │   ├── DomainService.ts          # 도메인 관련 API 서비스 로직 정의
│   │   └── useDomain.ts              # 도메인 관련 커스텀 훅 정의 (react-query에 의존)
│   └── Service.ts                    # 공통 API 서비스 로직 정의
│ 
├── types                             # TypeScript 타입 정의를 저장하는 폴더
│   ├── client.ts                     # 클라이언트 관련 타입 정의 파일
│   └── server.ts                     # 서버 관련 타입 정의 파일
│ 
└── utils                             # React에 의존되지 않는 공통 유틸리티 함수들을 저장하는 폴더
```

# 브랜치 명명 규칙

|명명|설명|
|---|---|
|`main`|PRD 혹은 stage 배포되는 수준의 브랜치|
|`dev/<featureName>`|개발 브랜치. `CI pass` 및 `review approve` 이후에 `main`에 `merge` 가능|

# 커밋 메시지 규칙

- 커밋 메시지 양식
  - `<type>(<scope>): <subject>`
  - (`<scope>`는 선택사항입니다.)

- Example
  ```
  feat: add hat wobble
  ^--^  ^------------^
  |     |
  |     +-> Summary in present tense.
  |
  +-------> Type: chore, docs, feat, fix, refactor, style, or test.
  ```

- 커밋 메시지 타입의 종류(임의로 작성 가능합니다.)
  - `feat`: (new feature for the user, not a new feature for build script)
  - `fix`: (bug fix for the user, not a fix to a build script)
  - `docs`: (changes to the documentation)
  - `style`: (formatting, missing semi colons, etc; no production code change)
  - `refactor`: (refactoring production code, eg. renaming a variable)
  - `test`: (adding missing tests, refactoring tests; no production code change)
  - `chore`: (updating grunt tasks etc; no production code change)

- References:
  - https://www.conventionalcommits.org/
  - https://seesparkbox.com/foundry/semantic_commit_messages
  - http://karma-runner.github.io/1.0/dev/git-commit-msg.html
