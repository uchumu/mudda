import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import Funnel, { Step } from "@/components/Funnel";
import CapsuleCreateCompleteModal from "@/components/Modals/CapsuleCreateCompleteModal";
import CapsuleCreateConfirmModal from "@/components/Modals/CapsuleCreateConfirmModal";
import { useCapsuleMutate } from "@/queries/Capsule/useCapsuleService";
import { useState } from "react";
import { useNavigate } from "react-router";
import NameInputStep from "./Steps/NameInputStep";
import useNameInputStep from "./Steps/NameInputStep/useNameInputStep";
import PasswordInputStep from "./Steps/PasswordInputStep";
import usePasswordInputStep from "./Steps/PasswordInputStep/usePasswordInputStep";
import SelectMapStep from "./Steps/SelectMapStep";
import useSelectMapStep from "./Steps/SelectMapStep/useSelectMapStep";
import PickerAccordion from "@/components/Accordion";

const CreateCapsulePage = () => {
  const navigate = useNavigate();

  const {
    inputName,
    setInputName,
    stepProps: nameInputStepProps,
  } = useNameInputStep();

  const {
    inputPassword,
    setInputPassword,
    stepProps: passwordInputStepProps,
  } = usePasswordInputStep();

  // plz send coordinates
  // plz useing this comment, because it is build failed.
  // const { coordinates, setCoordinates } = useSelectMapStep();
  const { setCoordinates } = useSelectMapStep();

  const steps: Array<Step> = [
    {
      children: <PickerAccordion/>,
      BottomButton: {
        onClick: () => true,
      },
      errorMessage: "잘못된 입력입니다.",
    },

    {
      children: <NameInputStep name={inputName} setName={setInputName} />,
      ...nameInputStepProps,
    },

    {
      children: <SelectMapStep setCoordinates={setCoordinates} />,
      BottomButton: {
        onClick: () => true,
      },
      errorMessage: "잘못된 입력입니다.",
    },

    {
      children: (
        <PasswordInputStep
          password={inputPassword}
          setPassword={setInputPassword}
        />
      ),
      ...passwordInputStepProps,
    },
  ];

  // 양쪽 끝 인덱스 콜백 함수
  const firstBackCallback = () => navigate("/");
  const lastNextCallback = async () => setIsCreateConfirmModalOpen(true);

  const [createdCapsuleCode, setCreatedCapsuleCode] = useState<string>();
  // 생성 확인 모달 관련
  const [isCreateConfirmModalOpen, setIsCreateConfirmModalOpen] =
    useState<boolean>(false);
  const hideCreateConfirmModal = () => setIsCreateConfirmModalOpen(false);
  const { mutateAsync } = useCapsuleMutate();
  const { setGlobalLoading } = useLoadingOverlay();
  const createConfirmModalCallback = async () => {
    setGlobalLoading(true);
    mutateAsync({
      title: inputName,
      map: {
        x: 0,
        y: 0,
      },
      goalTime: 1733599233,
      capsuleDesignId: 1,
      password: inputPassword,
    })
      .then((res) => {
        setCreatedCapsuleCode(res.data);
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
    if (createdCapsuleCode)
      navigate(`/capsule/${encodeURIComponent(createdCapsuleCode)}`);
  };

  return (
    <>
      <Funnel
        steps={steps}
        firstBackCallback={firstBackCallback}
        lastNextCallback={lastNextCallback}
      />
      {isCreateConfirmModalOpen && (
        <CapsuleCreateConfirmModal
          hideModal={hideCreateConfirmModal}
          confirmCallback={createConfirmModalCallback}
        />
      )}
      {isCreateCompleteModalOpen && (
        <CapsuleCreateCompleteModal
          hideModal={hideCreateCompleteModal}
          onClick={createCompleteModalCallback}
        />
      )}
    </>
  );
};

export default CreateCapsulePage;
