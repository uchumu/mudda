import { isUndefined } from "@/utils";
import CommonButton, { ButtonProps } from "../CommonButton";

interface Props extends ButtonProps {
  leftButton?: ButtonProps;
}
const BottomButton = ({ title, onClick, disabled, leftButton }: Props) => {
  return (
    <div className="fixed top-0 w-full max-w-[480px] h-full pointer-events-none">
      <div className="absolute z-50 bottom-[30px] left-0 w-full px-[22px] flex gap-[5px] h-[60px] pointer-events-auto">
        {!isUndefined(leftButton) && <CommonButton {...leftButton} />}
        <CommonButton title={title} onClick={onClick} disabled={disabled} />
      </div>
    </div>
  );
};

export default BottomButton;
