/**
 * 객체를 URL 쿼리 스트링 형식으로 변환합니다.
 *
 * @param obj - 쿼리 스트링으로 변환할 객체
 * @returns URL 쿼리 스트링 형식의 문자열
 *
 * 사용 예:
 * const query = getQueryString({ user: 'john', age: '30' });
 * console.log(query); // "user=john&age=30"
 */
const getQueryString = (obj: {
  [key: string]: string | number | boolean | Array<string | number | boolean>;
}) => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) =>
    Array.isArray(value)
      ? value.forEach((valueItem) => params.append(key, valueItem.toString()))
      : params.append(key, value.toString())
  );

  return params.toString();
};

export default getQueryString;
