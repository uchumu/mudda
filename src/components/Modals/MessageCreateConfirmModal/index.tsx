import TwoButtonModal from "../ModalBases/TwoButtonModal";

interface Props {
  hideModal: () => void;
  confirmCallback: () => void;
}
const MessageCreateConfirmModal = ({ hideModal, confirmCallback }: Props) => (
  <TwoButtonModal
    hideModal={hideModal}
    rightButton={{ title: "네", onClick: confirmCallback }}
    leftButton={{ title: "아니오", onClick: hideModal }}
  >
    <p className="text-[16px]">{"캡슐을 추가하시겠습니까?"}</p>
  </TwoButtonModal>
);

export default MessageCreateConfirmModal;
