interface Props {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}
const CustomInput = ({ label, value, setValue, placeholder }: Props) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setValue(event.target.value);

  return (
    <div className="flex flex-col gap-[10px]">
      {label && <label className="text-[14px]">{label}</label>}
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-[60px] px-[18px] text-[16px] border-[1px] rounded-[15px] focus:border-primary-main focus:outline-none"
      />
    </div>
  );
};

export default CustomInput;
