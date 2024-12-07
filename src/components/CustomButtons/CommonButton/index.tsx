import clsx from "clsx";

export interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "primary" | "secondary";
}
const CommonButton = ({
  title,
  onClick,
  disabled = false,
  type = "primary",
}: ButtonProps) => (
  <button
    className={clsx(
      "w-full py-4 text-center z-[100] rounded-[16px] pointer-events-auto",
      disabled
        ? "bg-primary-disabled text-primary-disabled-text cursor-not-allowed"
        : type === "primary"
        ? "bg-primary-main text-primary-text cursor-pointer"
        : "bg-secondary-main text-secondary-text cursor-pointer"
    )}
    onClick={disabled ? undefined : onClick}
    aria-disabled={disabled}
  >
    {title}
  </button>
);

export default CommonButton;
