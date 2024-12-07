import IconComplete from "@/assets/icons/complete-icon.svg?react";
import OneButtonModal from "../ModalBases/OneButtonModal";

interface Props {
  hideModal: () => void;
  onClick: () => void;
}
const CapsuleCreateCompleteModal = ({ hideModal, onClick }: Props) => (
  <OneButtonModal button={{ title: "확인", onClick }} hideModal={hideModal}>
    <div className="flex flex-col items-center gap-[10px]">
      <IconComplete />
      <p className="text-[18px] font-bold">캡슐 생성 완료!</p>
      <p className="text-[#9A9A9A] text-center text-[14px]">
        이제 생성한 캡슐을 공유하여
        <br />
        추억을 모아보세요.
      </p>
    </div>
  </OneButtonModal>
);

export default CapsuleCreateCompleteModal;
