import { Photo } from "@/types/client";
import { useEffect, useMemo, useState } from "react";

const usePhotoInputStep = () => {
  const [inputPhoto, setInputPhoto] = useState<Photo>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const buttonDisabled = useMemo(() => false, []);

  const onClickButton = () => {
    return true;
  };

  const stepProps = {
    BottomButton: {
      onClick: onClickButton,
      disabled: buttonDisabled,
    },
    errorMessage: errorMessage,
  };

  useEffect(() => setErrorMessage(""), [inputPhoto]);

  return { inputPhoto, setInputPhoto, stepProps };
};

export default usePhotoInputStep;
