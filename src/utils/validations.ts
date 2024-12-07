/**
 * input validation들을 모아놓습니다.
 * valid할 경우 True를, invalid할 경우 False를 반환하는 함수입니다.
 */

export const getInputCapsuleNameValid = (name: string) =>
  typeof name === "string";
export const getInputCapsulePasswordValid = (password: string) =>
  typeof password === "string";
export const getInputCapsuleTextValid = (text: string) =>
  typeof text === "string";
