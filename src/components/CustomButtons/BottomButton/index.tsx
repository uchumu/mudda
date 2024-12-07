import IconError from "@/assets/icons/error-icon.svg?react";
import { isUndefined } from "@/utils";
import CommonButton, { ButtonProps } from "../CommonButton";

interface Props extends ButtonProps {
  leftButton?: ButtonProps;
  errorMessage?: string;
}
const BottomButton = ({
  title,
  onClick,
  disabled,
  leftButton,
  errorMessage,
}: Props) => {
  return (
    <div className="fixed top-0 w-full max-w-[480px] h-full pointer-events-none">
      <div className="absolute z-50 bottom-[30px] left-0 w-full h-[60px] px-[22px] flex flex-col gap-[10px] justify-end items-center">
        {errorMessage && (
          <div className="flex items-center gap-[5px]">
            <IconError />
            <p className="text-[14px] text-error">{errorMessage}</p>
          </div>
        )}
        <div className="flex gap-[5px] w-full">
          {!isUndefined(leftButton) && <CommonButton {...leftButton} />}
          <CommonButton title={title} onClick={onClick} disabled={disabled} />
        </div>
      </div>
    </div>
  );
};

export default BottomButton;
