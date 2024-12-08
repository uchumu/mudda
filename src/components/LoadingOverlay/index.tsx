import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";

const Dot = ({ delay }: { delay: string }) => (
  <span
    className={clsx("w-2 h-2 bg-primary-text rounded-full", "animate-bounce")}
    style={{
      animation: `bounce 1.2s ${delay} infinite ease-in-out`,
    }}
  />
);

const BouncingDots = () => {
  const [inProp, setProp] = useState<boolean>(false);
  const nodeRef = useRef(null); // ref 생성

  useEffect(() => {
    setProp(true);
  }, []);

  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="fade"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className="flex justify-center items-center gap-2 h-12">
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </div>
    </CSSTransition>
  );
};

const LoadingOverlay = () => (
  <div className="fixed z-50 top-0 w-full max-w-[480px] h-full bg-[#00000020] flex items-center justify-center">
    <BouncingDots />
  </div>
);

export default LoadingOverlay;
