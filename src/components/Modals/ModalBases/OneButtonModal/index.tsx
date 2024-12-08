import CustomButtons from "@/components/CustomButtons";
import { ButtonProps } from "@/components/CustomButtons/CommonButton";
import { PropsWithChildren } from "react";
import ModalBase from "../ModalBase";

interface Props extends PropsWithChildren {
  button: ButtonProps;
  hideModal: () => void;
}
const OneButtonModal = ({ children, button, hideModal }: Props) => (
  <ModalBase hideModal={hideModal}>
    <div className="w-full h-full pt-[56px] flex flex-col gap-[20px] items-center">
      {children}
      <div className="w-full flex gap-[6px] px-[16px] py-[14px]">
        <CustomButtons.CommonButton
          title={button.title}
          onClick={button.onClick}
          disabled={button.disabled}
        />
      </div>
    </div>
  </ModalBase>
);

export default OneButtonModal;
