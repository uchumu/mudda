import { getIsPastTime } from "@/utils/formatTime";
import { useMemo, useState } from "react";

const useSelectDateStep = () => {
  const [selectDate, setSelectDate] = useState<Date>(() => {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    threeDaysLater.setHours(0, 0, 0, 0);
    return threeDaysLater;
  });

  const buttonDisabled = useMemo(() => {
    const valid = getIsPastTime(selectDate);
    return valid;
  }, [selectDate]);

  const stepProps = {
    BottomButton: {
      onClick: () => true,
      disabled: buttonDisabled,
    },
    errorMessage: "",
  };
  return { selectDate, setSelectDate, stepProps };
};

export default useSelectDateStep;
