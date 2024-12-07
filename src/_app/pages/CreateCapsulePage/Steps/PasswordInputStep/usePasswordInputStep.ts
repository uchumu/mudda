import { getInputCapsulePasswordValid } from "@/utils/validations";
import { useEffect, useMemo, useState } from "react";

const usePasswordInputStep = () => {
  const [inputPassword, setInputPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const buttonDisabled = useMemo(
    () => inputPassword.length === 0,
    [inputPassword]
  );

  const onClickButton = () => {
    const isValid = getInputCapsulePasswordValid(inputPassword);

    if (!isValid) setErrorMessage("캡슐 비밀번호가 유효하지 않습니다.");

    return isValid;
  };

  const stepProps = {
    BottomButton: {
      onClick: onClickButton,
      disabled: buttonDisabled,
    },
    errorMessage: errorMessage,
  };

  useEffect(() => setErrorMessage(""), [inputPassword]);

  return { inputPassword, setInputPassword, stepProps };
};

export default usePasswordInputStep;
