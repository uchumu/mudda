import { isUndefined } from "@/utils";
import CommonButton, { ButtonProps } from "../CommonButton";

interface Props extends ButtonProps {
  leftButton?: ButtonProps;
}
const BottomButton = ({ title, onClick, disabled, leftButton }: Props) => {
  return (
    <div className="fixed bottom-[30px] left-0 w-full px-[22px] flex gap-[5px]">
      {!isUndefined(leftButton) && <CommonButton {...leftButton} />}
      <CommonButton title={title} onClick={onClick} disabled={disabled} />
    </div>
  );
};

export default BottomButton;
