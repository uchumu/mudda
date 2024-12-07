import CustomButtons from "@/components/CustomButtons";
import { ButtonProps } from "@/components/CustomButtons/CommonButton";
import { PropsWithChildren } from "react";
import ModalBase from "../ModalBase";

interface Props extends PropsWithChildren {
  leftButton?: ButtonProps;
  rightButton: ButtonProps;
  hideModal: () => void;
}
const TwoButtonModal = ({
  children,
  leftButton,
  rightButton,
  hideModal,
}: Props) => (
  <ModalBase hideModal={hideModal}>
    <div className="w-full h-full pt-[56px] flex flex-col gap-[20px] items-center">
      {children}
      <div className="w-full flex gap-[6px] px-[16px] py-[14px]">
        {leftButton ? (
          <CustomButtons.CommonButton
            title={leftButton.title}
            onClick={leftButton.onClick}
            disabled={leftButton.disabled}
            type="secondary"
          />
        ) : (
          <CustomButtons.CommonButton
            title="취소"
            onClick={hideModal}
            type="secondary"
          />
        )}
        <CustomButtons.CommonButton
          title={rightButton.title}
          onClick={rightButton.onClick}
          disabled={rightButton.disabled}
        />
      </div>
    </div>
  </ModalBase>
);

export default TwoButtonModal;
