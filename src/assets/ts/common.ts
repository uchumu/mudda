const parseGoalTime = (goalTime: number) => {
  // goalTime이 밀리초 단위라면 초 단위로 변환

  const totalTime = goalTime - Math.floor(new Date().getTime() / 1000); // 밀리초 -> 초로 변환

  // 일, 시, 분 계산
  const days = Math.floor(totalTime / 86400); // 1일 = 86400초
  const hours = Math.floor((totalTime % 86400) / 3600); // 나머지 초에서 시간 계산
  const minutes = Math.floor((totalTime % 3600) / 60); // 나머지 초에서 분 계산

  // 결과 반환
  return {
    days,
    hours,
    minutes,
  };
};

const formatTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // timestamp를 Date 객체로 변환

  const year = date.getFullYear(); // 연도
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
  const day = String(date.getDate()).padStart(2, "0"); // 일 (두 자리로 변환)

  return `${year}.${month}.${day}`; // 'YYYY-MM-DD' 형식 반환
};

export { parseGoalTime, formatTimestampToDate };
