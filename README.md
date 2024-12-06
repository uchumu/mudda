# 우리들의 추억을 무따

테오의 스프린트 18기 11조
우리들의 추억을 무따, mudda 프론트엔드 레포지토리입니다.

# 스크립트

- 자세한 내용은 `package.json`의 `"scripts"`에서 확인하실 수 있습니다.

|스크립트|설명|
|---|---|
|`npm i`|의존성 설치|
|`npm run dev`|개발 환경 가동|
|`npm run build`|빌드|

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
