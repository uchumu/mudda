import IconComplete from "@/assets/icons/complete-icon.svg?react";
import OneButtonModal from "../ModalBases/OneButtonModal";

interface Props {
  hideModal: () => void;
  onClick: () => void;
}
// TODO: mark up
const MessageCreateCompleteModal = ({ hideModal, onClick }: Props) => (
  <OneButtonModal button={{ title: "확인", onClick }} hideModal={hideModal}>
    <div className="flex flex-col items-center gap-[10px]">
      <IconComplete />
      <p className="text-[18px] font-bold">캡슐이 추가되었습니다!</p>
      <p className="text-[#9A9A9A] text-center text-[14px]">야호!</p>
    </div>
  </OneButtonModal>
);

export default MessageCreateCompleteModal;
