import { getInputCapsuleTextValid } from "@/utils/validations";
import { useEffect, useMemo, useState } from "react";

const useTextInputStep = () => {
  const [inputText, setInputText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const buttonDisabled = useMemo(() => inputText.length === 0, [inputText]);

  const onClickButton = () => {
    const isValid = getInputCapsuleTextValid(inputText);

    if (!isValid) setErrorMessage("입력이 유효하지 않습니다.");

    return isValid;
  };

  const stepProps = {
    BottomButton: {
      onClick: onClickButton,
      disabled: buttonDisabled,
    },
    errorMessage: errorMessage,
  };

  useEffect(() => setErrorMessage(""), [inputText]);

  return { inputText, setInputText, stepProps };
};

export default useTextInputStep;
