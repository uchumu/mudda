import PickerAccordion from "@/components/Accordion";
import StepHeader from "@/components/Funnel/StepHeader";
import Margin from "@/components/Margin";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectDate: Date;
  setSelectDate: Dispatch<SetStateAction<Date>>;
};
const SelectDateStep = ({ selectDate, setSelectDate }: Props) => {
  return (
    <div
      className="flex-col px-[22px] pb-[60px] overflow-auto h-[calc(100vh-58px-56px-30px)]"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Margin H="54px" />
      <StepHeader text={`캡슐을 $오픈할 일시$를\n 선택해 주세요.`} />
      <Margin H="54px" />
      <PickerAccordion selected={selectDate} setSelected={setSelectDate} />
    </div>
  );
};
export default SelectDateStep;
