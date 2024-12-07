import { isNull } from "@/utils";
import { useEffect, useRef } from "react";

interface Props {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  mountFocus?: boolean;
}
const CustomInput = ({
  label,
  value,
  setValue,
  placeholder,
  mountFocus = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setValue(event.target.value);

  useEffect(() => {
    if (isNull(inputRef.current) || !mountFocus) return;

    inputRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col gap-[10px]">
      {label && <label className="text-[14px]">{label}</label>}
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-[60px] px-[18px] text-[16px] border-[1px] rounded-[15px] focus:border-primary-main focus:outline-none"
      />
    </div>
  );
};

export default CustomInput;
