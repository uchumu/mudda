/**
 * Date 객체를 초 단위의 타임스탬프로 변환하는 함수
 * @param date - 변환할 Date 객체
 * @returns 초 단위의 타임스탬프
 */
const getSecondsFromDate = (date: Date) => {
  console.log(date)
  return Math.floor(new Date(date).getTime() / 1000);
};

/**
 * 날짜를 "YYYY년 M월 D일" 형식으로 반환하는 유틸리티 함수
 * @param date - 포맷팅할 Date 객체
 * @returns "YYYY년 M월 D일" 형식의 문자열
 */
const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export { getFormattedDate, getSecondsFromDate };
