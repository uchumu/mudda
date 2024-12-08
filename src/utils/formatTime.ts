/**
 * Date 객체를 밀리초 단위의 타임스탬프로 변환하는 함수
 * @param date - 변환할 Date 객체
 * @returns 밀리초 단위의 타임스탬프
 */
export const getTimeStampByDate = (date: Date) => {
  return date.getTime();
};
