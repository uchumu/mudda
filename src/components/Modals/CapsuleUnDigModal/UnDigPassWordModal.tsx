import IconComplete from "@/assets/icons/complete-icon.svg?react";
import OneButtonModal from "../ModalBases/OneButtonModal";

interface Props {
  hideModal: () => void;
  onClick: () => void;
}
const UnDigPassWordModal = ({ hideModal, onClick }: Props) => (
  <OneButtonModal button={{ title: "확인", onClick }} hideModal={hideModal}>
    <div className="flex flex-col items-center gap-[10px]">
      <IconComplete />
      <p className="text-[18px] font-bold">비밀번호를 확인해 주세요</p>
      <p className="text-[#9A9A9A] text-center text-[14px]">
        비밀번호가 잘못되었거나
        <br />
        미입력된 상태입니다.
      </p>
    </div>
  </OneButtonModal>
);

export default UnDigPassWordModal;
