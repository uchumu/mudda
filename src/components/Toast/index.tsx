import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";

interface Props {
  message: string;
  hideToast: () => void;
  type: "normal" | "error";
}
const TOAST_AUTO_HIDE_DURATION = 2000;
const SLIDE_TRANSITION_DURATION = 500;
const Toast = ({ message, hideToast, type = "normal" }: Props) => {
  const [inProp, setProp] = useState<boolean>(false);
  const nodeRef = useRef(null); // ref 생성

  useEffect(() => {
    setProp(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setProp(false);
      setTimeout(hideToast, SLIDE_TRANSITION_DURATION);
    }, TOAST_AUTO_HIDE_DURATION);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center z-[9] bg-opacity-30 pointer-events-none">
      <CSSTransition
        in={inProp}
        timeout={SLIDE_TRANSITION_DURATION}
        classNames="slide"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className={clsx(
            "relative max-w-[360px] w-max px-[16px] py-[6px] rounded-[5px] mb-[30px]",
            type === "normal" ? "bg-[#E2EEFF]" : "bg-[#FF988D]"
          )}
        >
          <p
            className={clsx(
              "text-[14px]",
              type === "normal" ? "text-primary-main" : "text-error"
            )}
          >
            {message}
          </p>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Toast;
