/**
 * Date 객체를 초 단위의 타임스탬프로 변환하는 함수
 * @param date - 변환할 Date 객체
 * @returns 초 단위의 타임스탬프
 */
const getSecondsFromDate = (date: Date) => {
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

/**
 * 날짜를 "YYYY년" M월 D일 H시 mm분" 형식으로 반환하는 유틸리티 함수
 * @param date - 포맷팅할 Date 객체  
 * @returns "YYYY년 M월 D일 H시 mm분" 형식의 문자열
 */
const getFormattedDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2,'0');

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};


/**
 * 날짜가 과거 시간인지 확인
 * @param date 확인할 Date 객체
 * @returns true면 미래, false면 과거 또는 현재
 */
const getIsPastTime = (date: Date) => {
  const currentTime = getSecondsFromDate(new Date());
  const selectedTime = getSecondsFromDate(date);
  return currentTime > selectedTime;
};

export {
  getFormattedDate,
  getSecondsFromDate,
  getIsPastTime,
  getFormattedDateTime,
};
