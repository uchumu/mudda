import CustomButtons from "@/components/CustomButtons";
import { ButtonProps } from "@/components/CustomButtons/CommonButton";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import ModalBase from "../ModalBase";

interface Props extends PropsWithChildren {
  leftButton?: ButtonProps;
  rightButton: ButtonProps;
  hideModal: () => void;
  noGapBetweenChildrenAndButton?: boolean;
}
const TwoButtonModal = ({
  children,
  leftButton,
  rightButton,
  hideModal,
  noGapBetweenChildrenAndButton = false,
}: Props) => (
  <ModalBase hideModal={hideModal}>
    <div
      className={clsx(
        noGapBetweenChildrenAndButton ? "" : "gap-[20px]",
        "w-full h-full flex flex-col pt-[56px] items-center"
      )}
    >
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
