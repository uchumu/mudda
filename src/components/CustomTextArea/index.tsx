import { isNull } from "@/utils";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

interface Props {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  mountFocus?: boolean;
}
const CustomTextArea = ({
  label,
  value,
  setValue,
  placeholder,
  mountFocus = false,
}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setValue(event.target.value);

  useEffect(() => {
    if (isNull(inputRef.current) || !mountFocus) return;

    inputRef.current.focus();
  }, []);

  const { height } = useWindowSize();

  return (
    <div
      style={{
        height: height - 54 - 18 - 32 - 10 - 64 - 42 - 18 - 20 - 18 - 56 - 30,
      }}
      className="flex flex-col gap-[10px]"
    >
      {label && <label className="text-[14px]">{label}</label>}
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full flex-1 p-[24px] text-[16px] font-normal border-[1px] rounded-[15px] focus:border-primary-main focus:outline-none resize-none overflow-y-auto"
      />
    </div>
  );
};

export default CustomTextArea;
