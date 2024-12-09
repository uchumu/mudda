import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";

import "react-day-picker/style.css";
import "./index.css";
import { useAccordion } from "@/components/Accordion/BaseAccordion/useAcordionContext";
import { Dispatch, SetStateAction } from "react";

interface Props {
  dataValue: Date;
  setDataValue: Dispatch<SetStateAction<Date>>;
}

/**데이트 선택 컴포넌트 */
export default function DatePicker({ dataValue, setDataValue }: Props) {
  //TODO : 좋은 방법
  const { setActiveSection } = useAccordion();

  const formatYearMonthKorean = (month: Date) => {
    const year = month.getFullYear();
    const monthName = month.toLocaleDateString("ko-KR", { month: "long" });
    return `${year} ${monthName}`;
  };

  const handleChangeDate = (date: Date | undefined) => {
    setDataValue(date ?? new Date());
    setActiveSection("time");
  };

  //이전 날짜 차단
  const disabledDays = {
    before: new Date(),
  };

  return (
    <div className="flex items-center justify-center w-full h-[350px] px-[24px] py-[34px] picker-wrap ">
      <DayPicker
        mode="single"
        formatters={{ formatCaption: formatYearMonthKorean }}
        selected={dataValue}
        onSelect={(date) => handleChangeDate(date)}
        required={false}
        locale={ko}
        disabled={disabledDays}
        classNames={{
          month: "text-primary-main",
          day: "text-[#202020]",
          selected: "text-primary-text",
        }}
      />
    </div>
  );
}
