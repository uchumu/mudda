import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import IconMap from "@/assets/icons/map-icon.svg?react";
import CapsuleNameHeader from "@/components/CapsuleNameHeader";
import CustomButtons from "@/components/CustomButtons";
import CapsuleDigModal from "@/components/Modals/CapsuleDigModal";
import { MapBottomSheet } from "@/components/BottomSheet";
import { useDigMutate } from "@/queries/Capsule/useCapsuleService";
import { UndiggedCapsule } from "@/types/server";
import { isUndefined } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import UndiggedImage from "@/assets/images/undiggedImage.png";
import UndiggedImage1 from "@/assets/images/undiggedImage1.png";
import UndiggedImage2 from "@/assets/images/undiggedImage2.png";
import UndiggedImage3 from "@/assets/images/undiggedImage3.png";
import UndiggedImage4 from "@/assets/images/undiggedImage4.png";
import UndiggedImage5 from "@/assets/images/undiggedImage5.png";

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
      {isMapShown && (
        <MapBottomSheet
          setIsShown={setIsMapShown}
          coordinateX={capsule.map.x}
          coordinateY={capsule.map.y}
        />
      )}
      <div className="w-full h-[calc(100vh-54px-56px-30px)] flex flex-col justify-center">
        <div className="justify-around w-full flex font-bold text-[22px] leading-[32px] flex-col mb-4">
          <div className="flex w-full justify-center">
            <span className="text-primary-main">캡슐 채우기</span>를 통해
          </div>

          <div className="flex w-full justify-center">
            더 많은 추억을 쌓으세요!
          </div>
        </div>

        {capsule.messageCount === 0 && (
          <img className="w-full object-contain" src={UndiggedImage} alt="" />
        )}
        {capsule.messageCount === 1 && (
          <img className="w-full object-contain" src={UndiggedImage1} alt="" />
        )}
        {capsule.messageCount === 2 && (
          <img className="w-full object-contain" src={UndiggedImage2} alt="" />
        )}
        {capsule.messageCount === 3 && (
          <img className="w-full object-contain" src={UndiggedImage3} alt="" />
        )}
        {capsule.messageCount === 4 && (
          <img className="w-full object-contain" src={UndiggedImage4} alt="" />
        )}
        {capsule.messageCount >= 5 && (
          <img className="w-full object-contain" src={UndiggedImage5} alt="" />
        )}

        <div className="mt-4">
          <div className="items-center text-[18px] leading-[26px] w-full flex flex-col">
            <div>
              현재까지
              <span className="text-primary-main font-bold ">
                {capsule.messageCount}개
              </span>
              의
            </div>
            <div>캡슐이 채워졌습니다.</div>
          </div>
        </div>
      </div>
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
