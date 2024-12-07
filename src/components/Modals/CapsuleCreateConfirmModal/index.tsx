import TwoButtonModal from "../ModalBases/TwoButtonModal";

interface Props {
  hideModal: () => void;
  confirmCallback: () => void;
}
const CapsuleCreateConfirmModal = ({ hideModal, confirmCallback }: Props) => (
  <TwoButtonModal
    hideModal={hideModal}
    rightButton={{ title: "네", onClick: confirmCallback }}
    leftButton={{ title: "아니오", onClick: hideModal }}
  >
    <p className="text-[16px]">{"캡슐을 생성하시겠습니까?"}</p>
  </TwoButtonModal>
);

export default CapsuleCreateConfirmModal;
