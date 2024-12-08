import IconError from "@/assets/icons/error-icon.svg?react";
import CustomInput from "@/components/CustomInput";
import TwoButtonModal from "../ModalBases/TwoButtonModal";

interface Props {
  hideModal: () => void;
  onClick: () => void;
  inputPassword: string;
  handleInputPassword: (newPassword: string) => void;
}
const CapsuleDigModal = ({
  hideModal,
  onClick,
  inputPassword,
  handleInputPassword,
}: Props) => (
  <TwoButtonModal
    rightButton={{ title: "네", onClick }}
    leftButton={{ title: "아니오", onClick: hideModal }}
    hideModal={hideModal}
    noGapBetweenChildrenAndButton
  >
    <div className="w-full flex flex-col items-center gap-[10px] mt-[-24px] px-[16px]">
      <p className="text-[18px] font-bold">캡슐을 파묻으시겠습니까?</p>
      <p className="text-[#9A9A9A] text-center text-[14px]">
        파묻기 전 캡슐 생성시 작성했던
        <br />
        비밀번호를 입력해 주세요.
      </p>
      <div className="w-[10px]" />
      <CustomInput
        mountFocus
        value={inputPassword}
        setValue={handleInputPassword}
        size="small"
        placeholder="비밀번호 입력"
      />
      <div className="h-[10px]" />
      <div className="flex gap-[5px] items-center">
        <IconError />
        <p className="text-[14px] text-error text-center">
          묻으면 새로운 내용을 추가할 수 없어요.
        </p>
      </div>
    </div>
  </TwoButtonModal>
);

export default CapsuleDigModal;
