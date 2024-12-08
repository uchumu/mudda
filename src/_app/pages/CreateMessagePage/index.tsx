import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import MessageCreateFunnel from "@/components/Funnel/MessageCreateFunnel";
import MessageCreateCompleteModal from "@/components/Modals/MessageCreateCompleteModal";
import MessageCreateConfirmModal from "@/components/Modals/MessageCreateConfirmModal";
import { useMessageMutate } from "@/queries/Message/useMessageService";
import { Step } from "@/types/client";
import { isUndefined } from "@/utils";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NameInputStep from "./Steps/NameInputStep";
import useNameInputStep from "./Steps/NameInputStep/useNameInputStep";
import PhotoInputStep from "./Steps/PhotoInputStep";
import usePhotoInputStep from "./Steps/PhotoInputStep/usePhotoInputStep";
import TextInputStep from "./Steps/TextInputStep";
import useTextInputStep from "./Steps/TextInputStep/useTextInputStep";

const CreateMessagePage = () => {
  const { code } = useParams();
  const capsuleCode = useMemo(() => (isUndefined(code) ? "" : code), [code]);
  const navigate = useNavigate();

  const {
    inputName,
    setInputName,
    stepProps: nameInputStepProps,
  } = useNameInputStep();

  const {
    inputText,
    setInputText,
    stepProps: textInputStepProps,
  } = useTextInputStep();

  const {
    inputPhoto,
    setInputPhoto,
    stepProps: photoInputStepProps,
  } = usePhotoInputStep();

  const steps: Array<Step> = [
    {
      children: <NameInputStep name={inputName} setName={setInputName} />,
      ...nameInputStepProps,
    },
    {
      children: <TextInputStep text={inputText} setText={setInputText} />,
      ...textInputStepProps,
    },
    {
      children: <PhotoInputStep photo={inputPhoto} setPhoto={setInputPhoto} />,
      ...photoInputStepProps,
    },
  ];

  // 양쪽 끝 인덱스 콜백 함수
  const firstBackCallback = () => navigate(-1);
  const lastNextCallback = () => setIsCreateConfirmModalOpen(true);

  // 생성 확인 모달 관련
  const [isCreateConfirmModalOpen, setIsCreateConfirmModalOpen] =
    useState<boolean>(false);
  const hideCreateConfirmModal = () => setIsCreateConfirmModalOpen(false);
  const { mutateAsync } = useMessageMutate({ code: capsuleCode });
  const { setGlobalLoading } = useLoadingOverlay();

  const createConfirmModalCallback = async () => {
    setGlobalLoading(true);

    const formData = new FormData();
    formData.append("code", capsuleCode);
    formData.append(
      "dto",
      JSON.stringify({
        useName: inputName,
        text: inputText,
      })
    );
    if (!isUndefined(inputPhoto)) formData.append("file", inputPhoto?.file);

    mutateAsync(formData)
      .then(() => {
        setTimeout(() => setIsCreateCompleteModalOpen(true), 1000);
      })
      .finally(() => {
        setIsCreateConfirmModalOpen(false);
        setTimeout(() => setGlobalLoading(false), 1000);
      });
  };

  // 생성 완료 모달 관련
  const [isCreateCompleteModalOpen, setIsCreateCompleteModalOpen] =
    useState<boolean>(false);
  const hideCreateCompleteModal = () => setIsCreateCompleteModalOpen(false);
  const createCompleteModalCallback = async () => {
    hideCreateCompleteModal();
    navigate(`/capsule/${encodeURIComponent(capsuleCode)}`);
  };

  return (
    <div className="bg-primary-paper w-full h-full">
      <MessageCreateFunnel
        steps={steps}
        firstBackCallback={firstBackCallback}
        lastNextCallback={lastNextCallback}
      />
      {isCreateConfirmModalOpen && (
        <MessageCreateConfirmModal
          hideModal={hideCreateConfirmModal}
          confirmCallback={createConfirmModalCallback}
        />
      )}
      {isCreateCompleteModalOpen && (
        <MessageCreateCompleteModal
          hideModal={hideCreateCompleteModal}
          onClick={createCompleteModalCallback}
        />
      )}
    </div>
  );
};

export default CreateMessagePage;
