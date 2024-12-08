import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";
import CustomButtons from "@/components/CustomButtons";

interface Props {
  message?: string | number;
  onConfirm: () => void;
}

const Alert = ({ message, onConfirm }: Props) => {
  const [inProp, setProp] = useState<boolean>(false);
  const nodeRef = useRef(null); // ref 생성

  useEffect(() => {
    setProp(true);
  }, []);

  const handleAlert = () => {
    setProp(false);
    setTimeout(() => {
      onConfirm();
    }, 300);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[9] bg-[#000] bg-opacity-30">
      <CSSTransition
        in={inProp}
        timeout={300}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className=" w-full flex flex-col justify-between relative p-2 rounded-[15px] bg-white max-w-[360px] h-[200px] shadow-[0_0_15px_rgba(0,0,0,0.05)]"
        >
          <div className="flex justify-center text-[18px] items-center h-[calc(100%-72px)]">
            {message}
          </div>

          <CustomButtons.CommonButton
            title="확인"
            onClick={handleAlert}
          ></CustomButtons.CommonButton>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Alert;
