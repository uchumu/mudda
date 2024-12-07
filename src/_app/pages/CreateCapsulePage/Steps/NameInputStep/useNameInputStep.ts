import { getInputCapsuleNameValid } from "@/utils/validations";
import { useEffect, useMemo, useState } from "react";

const useNameInputStep = () => {
  const [inputName, setInputName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const buttonDisabled = useMemo(() => inputName.length === 0, [inputName]);

  const onClickButton = () => {
    const isValid = getInputCapsuleNameValid(inputName);

    if (!isValid) setErrorMessage("캡슐 이름이 유효하지 않습니다.");

    return isValid;
  };

  const stepProps = {
    BottomButton: {
      onClick: onClickButton,
      disabled: buttonDisabled,
    },
    errorMessage: errorMessage,
  };

  useEffect(() => setErrorMessage(""), [inputName]);

  return { inputName, setInputName, stepProps };
};

export default useNameInputStep;
