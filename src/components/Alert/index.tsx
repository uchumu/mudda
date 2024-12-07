import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";

interface Props {
  message?: string | number;
  onConfirm: () => void;
}

const Alert = ({ message, onConfirm }: Props) => {
  const [inProp, setProp] = useState<boolean>(false);

  useEffect(() => {
    setProp(true);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[9] bg-[#000] bg-opacity-30 test">
      <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit>
        <div className="w-full flex flex-col justify-between relative p-2 rounded-[15px] bg-white max-w-[360px] h-[200px] shadow-[0_0_15px_rgba(0,0,0,0.05)]">
          <div className="flex justify-center text-[18px] items-center h-[calc(100%-72px)]">
            {message}
          </div>
          <div
            onClick={onConfirm}
            className="cursor-pointer bg-[#5194F9] text-[#ffffff] h-[60px] w-full flex items-center justify-center rounded-[15px] font-bold"
          >
            확인
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Alert;
