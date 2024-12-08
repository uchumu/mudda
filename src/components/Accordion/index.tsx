import { Dispatch, SetStateAction, useCallback } from "react";

import Accordion from "@/components/Accordion/BaseAccordion";
import DatePicker from "@/components/Accordion/DatePicker";
import WheelTimePicker from "@/components/Accordion/TimePicker";

type Props = {
  selected: Date;
  setSelected: Dispatch<SetStateAction<Date>>;
};
export default function PickerAccordion({ selected, setSelected }: Props) {
  const isSelectedPicker = selected ? `${selected?.toLocaleDateString()}` : "";

  const formatTime = useCallback((date: Date) => {
    console.log(date,"format")
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, []);

  const handleTimeChange = useCallback(
    (hours: number, minutes: number, seconds: number) => {
      console.log('')
      setSelected((prev:Date) => {
        const newDate = new Date(prev);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        newDate.setSeconds(seconds);
        return newDate;
      });
    },
    []
  );

  return (
    <Accordion defaultSection="date">
      <Accordion.Section id="date" label="날짜" formatValue={isSelectedPicker}>
        <DatePicker setDataValue={setSelected} dataValue={selected ?? ""} />
      </Accordion.Section>
      <Accordion.Section
        id="time"
        label="시간"
        formatValue={selected ? formatTime(selected) : "00:00:00"}
      >
        <WheelTimePicker
          onChange={handleTimeChange}
          initialValue={new Date()}
        />
      </Accordion.Section>
    </Accordion>
  );
}
