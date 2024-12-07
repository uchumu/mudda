import clsx from "clsx";

export interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}
const CommonButton = ({ title, onClick, disabled = false }: ButtonProps) => (
  <button
    className={clsx(
      "w-full py-4 text-center z-[100] rounded-[16px]",
      disabled
        ? "bg-primary-disabled text-primary-disabled-text cursor-not-allowed"
        : "bg-primary-main text-primary-text cursor-pointer"
    )}
    onClick={disabled ? undefined : onClick}
    aria-disabled={disabled}
  >
    {title}
  </button>
);

export default CommonButton;
