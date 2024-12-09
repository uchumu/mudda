import { UnDigStatus } from "./type";


/**
 * "UnDigged" 작업 오류를 처리합니다.
 * 
 * 전달된 오류 메시지를 상태와 매핑하여 `UnDigStatus`를 반환합니다.
 * 매핑되지 않을 경우 기본값으로 "failUndig"를 반환합니다.
 * 
 * @param error - 처리할 오류 객체
 * @returns 매핑된 `UnDigStatus` 값
 */
async function unDiggedErrorHandler(error: unknown): Promise<NonNullable<UnDigStatus>> {
  const errorMappings: Record<string, NonNullable<UnDigStatus>> = {
    "패스워드를 입력해주세요.": "passwordError",
    "캡슐 열람 시간은 1시간 이상이어야 합니다.": "failUndig",
    "비밀번호가 일치하지 않습니다.": "passwordError",
  };

  if (error instanceof Error) {
    const message = error.message;
    return (
      Object.entries(errorMappings).find(([key]) =>
        message.includes(key)
      )?.[1] || "failUndig"
    );
  }

  return "failUndig";
}

export { unDiggedErrorHandler };