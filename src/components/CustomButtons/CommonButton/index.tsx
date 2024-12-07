import clsx from "clsx";

export interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}
const CommonButton = ({ title, onClick, disabled = false }: ButtonProps) => (
  <button
    className={clsx(
      "w-full py-4 text-center z-[100] rounded-[16px] cursor-pointer",
      disabled
        ? "bg-primary-disabled text-primary-disabled-text"
        : "bg-primary-main text-primary-text"
    )}
    onClick={disabled ? undefined : onClick}
    aria-disabled={disabled}
  >
    {title}
  </button>
);

export default CommonButton;
