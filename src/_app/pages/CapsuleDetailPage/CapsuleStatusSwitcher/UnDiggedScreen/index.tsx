import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import IconMap from "@/assets/icons/map-icon.svg?react";
import CapsuleNameHeader from "@/components/CapsuleNameHeader";
import CustomButtons from "@/components/CustomButtons";
import CapsuleDigModal from "@/components/Modals/CapsuleDigModal";
import { useDigMutate } from "@/queries/Capsule/useCapsuleService";
import { UndiggedCapsule } from "@/types/server";
import { isUndefined } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
  const digModalCallback = async () => {
    setGlobalLoading(true);

    mutateAsync({ code: capsuleCode, password: inputPassword })
      .then(() => setTimeout(() => setIsDigCompleteModalOpen(true), 1000))
      .catch(() => setTimeout(() => setIsDigFailModalOpen(true), 1000))
      .finally(() => {
        hideDigModal();
        setTimeout(() => setGlobalLoading(false), 1000);
      });
  };

  const [isDigCompleteModalOpen, setIsDigCompleteModalOpen] =
    useState<boolean>(false);
  const [isDigFailModalOpen, setIsDigFailModalOpen] = useState<boolean>(false);
  // TODO: 파묻기 시도 후 콜백 설정(에러메시지 분기처리)
  useEffect(() => console.log(isDigCompleteModalOpen, isDigFailModalOpen));

  // TODO: 맵 바텀시트 구현
  const onClickOpenMap = () => console.log("bottom sheet open");

  return (
    <>
      <CapsuleNameHeader
        capsuleName={capsule.title}
        rightButton={
          <IconMap className="cursor-pointer" onClick={onClickOpenMap} />
        }
      />
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
      <CustomButtons.CapsuleShareFAB code={capsuleCode} />
      {isDigModalOpen && (
        <CapsuleDigModal
          inputPassword={inputPassword}
          handleInputPassword={handleInputPassword}
          hideModal={hideDigModal}
          onClick={digModalCallback}
        />
      )}
    </>
  );
};

export default UnDiggedScreen;
