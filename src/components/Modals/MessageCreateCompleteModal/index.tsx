import imageSrc from "@/assets/images/capsule-create-modal-illust.png";
import OneButtonModal from "../ModalBases/OneButtonModal";

interface Props {
  hideModal: () => void;
  onClick: () => void;
}
// TODO: mark up
const MessageCreateCompleteModal = ({ hideModal, onClick }: Props) => (
  <OneButtonModal button={{ title: "확인", onClick }} hideModal={hideModal}>
    <div className="flex flex-col items-center gap-[10px]">
      <p className="text-[18px] font-bold">캡슐이 추가되었습니다!</p>
      <p className="text-[#9A9A9A] text-center text-[14px]">
        소중한 추억이 쌓이고 있어요!
      </p>
      <img src={imageSrc} className="w-[158px]" />
    </div>
  </OneButtonModal>
);

export default MessageCreateCompleteModal;
