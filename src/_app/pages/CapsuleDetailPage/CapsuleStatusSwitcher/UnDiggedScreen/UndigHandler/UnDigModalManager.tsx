import { UnDigStatus } from "./type";
import UnDigConfirmationModal from "@/components/Modals/CapsuleUnDigModal/UnDigConfirmationModal";
import UnDigPassWordModal from "@/components/Modals/CapsuleUnDigModal/UnDigPassWordModal";
import { getFormattedDate } from "@/utils/formatTime";

interface Props {
  undigStatus: UnDigStatus;
  hideModal: () => void;
  onClick: () => void;
  goalTime: number;
}

/**
 * 캡슐 묻기 관련 모달을 상태에 따라 관리하는 컴포넌트
 * @param undigStatus - 묻기 상태 ('failUndig' | 'successUndig' | 'passwordError' | null)
 * @param hideModal - 모달 닫기 함수
 * @param onClick - 확인 버튼 클릭 핸들러
 * @param goalTime - 캡슐 목표 시간 (number)
 * @returns 상태에 맞는 모달 컴포넌트
 */
export default function UnDigModalManager({ undigStatus,hideModal,onClick,goalTime }: Props) {
  if (!undigStatus) return null;

  const formatGoalTime = getFormattedDate(new Date(goalTime))

  const modals = {
    failUndig: (
      <UnDigConfirmationModal
        hideModal={hideModal}
        isError={true}
        onClick={onClick}
      />
    ),
    successUndig: (
      <UnDigConfirmationModal
        hideModal={hideModal}
        isError={false}
        onClick={onClick}
        goalTime={formatGoalTime}
      />
    ),
    passwordError: (
      <UnDigPassWordModal
        hideModal={hideModal}
        onClick={onClick}
      />
    ),
  };

  return modals[undigStatus];
}
