import Funnel, { Step } from "@/components/Funnel";
import { useNavigate } from "react-router";
import NameInputStep from "./Steps/NameInputStep";
import useNameInputStep from "./Steps/NameInputStep/useNameInputStep";
import PasswordInputStep from "./Steps/PasswordInputStep";
import usePasswordInputStep from "./Steps/PasswordInputStep/usePasswordInputStep";
import SelectMapStep from "./Steps/SelectMapStep";
import useSelectMapStep from "./Steps/SelectMapStep/useSelectMapStep";

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
  const { coordinates, setCoordinates } = useSelectMapStep();

  const steps: Array<Step> = [
    {
      children: <div>step 1</div>,
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

  const firstBackCallback = () => navigate("/");

  const lastNextCallback = () => navigate("/capsule");

  return (
    <Funnel
      steps={steps}
      firstBackCallback={firstBackCallback}
      lastNextCallback={lastNextCallback}
    />
  );
};

export default CreateCapsulePage;
