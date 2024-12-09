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

import useAlert from "@/hooks/useAlert";
import useToast from "@/hooks/useToast";
import CapsuleMessageCount from "./CaspuleMessageCount";

interface Props {
  capsule: UndiggedCapsule;
}
const UnDiggedScreen = ({ capsule }: Props) => {
  const { code } = useParams();
  const capsuleCode = useMemo(() => (isUndefined(code) ? "" : code), [code]);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { alert } = useAlert();
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
  const digModalCallback = async () => {
    if (capsule.goalTime > new Date().getTime()) {
      await alert("오픈시간이 지나, 캡슐 파묻기를 실패했습니다.");

      return;
    }

    setGlobalLoading(true);

    mutateAsync({ code: capsuleCode, password: inputPassword })
      // .then(() => setTimeout(() => setIsDigCompleteModalOpen(true), 1000))
      // .catch(() => setTimeout(() => setIsDigFailModalOpen(true), 1000))
      .then(() => setTimeout(() => showToast("캡슐을 파묻었어요!"), 1000))
      .catch(() =>
        setTimeout(
          () =>
            showToast("파묻기에 실패했어요. 비밀번호를 확인해주세요.", "error"),
          1000
        )
      )
      .finally(() => {
        hideDigModal();
        setTimeout(() => setGlobalLoading(false), 1000);
      });
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
    </>
  );
};

export default UnDiggedScreen;
