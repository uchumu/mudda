import { isNull } from "@/utils";
import clsx from "clsx";
import { useEffect, useRef } from "react";

interface Props {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  mountFocus?: boolean;
  size?: "medium" | "small";
}
const CustomInput = ({
  label,
  value,
  setValue,
  placeholder,
  mountFocus = false,
  size = "medium",
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setValue(event.target.value);

  useEffect(() => {
    if (isNull(inputRef.current) || !mountFocus) return;

    inputRef.current.focus();
  }, []);

  return (
    <div className="w-full flex flex-col gap-[10px]">
      {label && <label className="text-[14px]">{label}</label>}
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={clsx(
          "w-full px-[18px] text-[16px] border-[1px] rounded-[15px] focus:border-primary-main focus:outline-none",
          size === "medium" ? "h-[60px]" : "h-[50px] text-center"
        )}
      />
    </div>
  );
};

export default CustomInput;
