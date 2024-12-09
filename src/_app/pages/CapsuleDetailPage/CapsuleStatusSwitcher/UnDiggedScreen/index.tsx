import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import IconMap from "@/assets/icons/map-icon.svg?react";
import { MapBottomSheet } from "@/components/BottomSheet";
import CapsuleNameHeader from "@/components/CapsuleNameHeader";
import CustomButtons from "@/components/CustomButtons";
import CapsuleDigModal from "@/components/Modals/CapsuleDigModal";
import { useDigMutate } from "@/queries/Capsule/useCapsuleService";
import { UndiggedCapsule } from "@/types/server";
import { isUndefined } from "@/utils";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import CapsuleMessageCount from "./CaspuleMessageCount";
import { getIsPastTime } from "@/utils/formatTime";

import {
  UnDigStatus,
  UnDigModalManager,
  unDiggedErrorHandler,
} from "./UndigHandler";

interface Props {
  capsule: UndiggedCapsule;
}
const UnDiggedScreen = ({ capsule }: Props) => {
  const { code } = useParams();
  const capsuleCode = useMemo(() => (isUndefined(code) ? "" : code), [code]);
  const navigate = useNavigate();
  const { setGlobalLoading } = useLoadingOverlay();
  const [isDigModalOpen, setIsDigModalOpen] = useState<boolean>(false);
  const openDigModal = () => {
    setIsDigModalOpen(true);
    setInputPassword("");
  };
  const hideDigModal = () => setIsDigModalOpen(false);
  const [inputPassword, setInputPassword] = useState<string>("");
  const handleInputPassword = (newPassword: string) =>
    setInputPassword(newPassword);
  const { mutateAsync } = useDigMutate({ code: capsuleCode });

  const [unDigStatus, setUnDigStatus] = useState<UnDigStatus | null>(null);

  const hideUnDigModal = () => setUnDigStatus(null);
  const unDigComplateModal = async () => {
    hideUnDigModal();
    navigate(`/capsule/${encodeURIComponent(capsuleCode)}`);
  };

  const undiggedOverTime = () => {
    hideDigModal();
    setUnDigStatus("failUndig");
    return;
  };

  const digModalCallback = async () => {
    const isPastTime = getIsPastTime(new Date(capsule.goalTime));
    if (!isPastTime) {
      undiggedOverTime();
      return;
    }
    try {
      setGlobalLoading(true);
      await mutateAsync({ code: capsuleCode, password: inputPassword });
      setTimeout(() => {
        setUnDigStatus("successUndig");
      });
    } catch (error) {
      const message = await unDiggedErrorHandler(error);
      setTimeout(() => {
        setUnDigStatus(message);
      }, 1000);
    } finally {
      hideDigModal();
      setTimeout(() => setGlobalLoading(false), 1000);
    }
  };

  // const [isDigCompleteModalOpen, setIsDigCompleteModalOpen] =
  // useState<boolean>(false);
  // const [isDigFailModalOpen, setIsDigFailModalOpen] = useState<boolean>(false);
  // TODO: 파묻기 시도 후 콜백 설정(에러메시지 분기처리)

  const [isMapShown, setIsMapShown] = useState<boolean>(false);
  const onClickOpenMap = () => setIsMapShown(true);

  return (
    <>
      <CapsuleNameHeader
        capsuleName={capsule.title}
        rightButton={
          <IconMap className="cursor-pointer" onClick={onClickOpenMap} />
        }
      />
      <CapsuleMessageCount messageCount={capsule.messageCount} />

      <CustomButtons.CapsuleShareFAB code={capsuleCode} />
      <CustomButtons.BottomButton
        title="캡슐 채우기"
        onClick={() =>
          navigate(`/capsule/${encodeURIComponent(capsuleCode)}/message/create`)
        }
        leftButton={{
          title: "캡슐 파묻기",
          onClick: openDigModal,
          type: "secondary",
        }}
      />

      {isDigModalOpen && (
        <CapsuleDigModal
          inputPassword={inputPassword}
          handleInputPassword={handleInputPassword}
          hideModal={hideDigModal}
          onClick={digModalCallback}
        />
      )}
      {isMapShown && (
        <MapBottomSheet
          setIsShown={setIsMapShown}
          coordinateX={capsule.map.x}
          coordinateY={capsule.map.y}
        />
      )}

      {unDigStatus && (
        <UnDigModalManager
          undigStatus={unDigStatus}
          hideModal={hideUnDigModal}
          onClick={unDigComplateModal}
          goalTime={capsule.goalTime}
        />
      )}
    </>
  );
};

export default UnDiggedScreen;
