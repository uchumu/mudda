import { useState } from "react";

const useSelectDateStep = () => {
  const [selectDate, setSelectDate] = useState<Date>(() => {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    threeDaysLater.setHours(0, 0, 0, 0);
    return threeDaysLater;
  });
  console.log(selectDate)
  //저는 개발
  return { selectDate, setSelectDate };
};

export default useSelectDateStep;
