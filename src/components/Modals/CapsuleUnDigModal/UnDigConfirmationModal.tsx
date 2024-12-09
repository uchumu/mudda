import clsx from "clsx";

import imageSrc from "@/assets/images/undig-apt-illust.png";

import OneButtonModal from "../ModalBases/OneButtonModal";

interface BaseProps {
  hideModal: () => void;
  onClick: () => void;
}

interface SuccessProps extends BaseProps {
  isError: false;
  goalTime: string;
}

interface ErrorProps extends BaseProps {
  isError: true;
  goalTime?: never; // goalTime을 명시적으로 제외
}

type Props = SuccessProps | ErrorProps;

/**
 * 캡슐 묻기 성공 여부 판단 모달
 * @param hideModal - 모달 닫기 함수
 * @param onClick - 확인 버튼 클릭 핸들러
 * @param goalTime - 목표 시간 텍스트
 * @param isError - 건물 생성 여부
 */
const UnDigConfirmationModal = ({
  hideModal,
  onClick,
  isError = false,
  goalTime,
}: Props) => {
  const statusText = isError ? "실패" : "성공";
  const subText = isError
    ? "지정한 영역에\n아파트가 들어섰어요 ㅜㅜ"
    : `${goalTime}에\n캡슐이 오픈됩니다`;

  return (
    <OneButtonModal button={{ title: "확인", onClick }} hideModal={hideModal}>
      <div className="relative bottom-5 flex flex-col items-center gap-4">
        <p className="text-[18px] font-bold">
          캡슐 파묻기를{" "}
          <span
            className={clsx({
              "text-[#FF3321]": isError,
              "text-primary-main": !isError,
            })}
          >
            {statusText}
          </span>
          했습니다.
        </p>
        <p className="text-[#9A9A9A] text-center text-[14px] whitespace-pre-line">
          {subText}
        </p>
        {isError && (
          <img
            src={imageSrc}
            alt="Error Illustration"
            className="relative top-[70px] left-3 w-[148px] h-[180px] bg-white"
          />
        )}
      </div>
    </OneButtonModal>
  );
};

export default UnDigConfirmationModal;
