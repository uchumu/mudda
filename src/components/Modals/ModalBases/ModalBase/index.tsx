import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";

interface ModalBaseProps extends PropsWithChildren {
  hideModal: () => void;
}
const ModalBase = ({ hideModal, children }: ModalBaseProps) => {
  const [inProp, setProp] = useState<boolean>(false);
  const nodeRef = useRef(null);

  useEffect(() => setProp(true), []);

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
          className=" w-full flex flex-col justify-between relative rounded-[15px] bg-white max-w-[300px] shadow-[0_0_15px_rgba(0,0,0,0.05)]"
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default ModalBase;
