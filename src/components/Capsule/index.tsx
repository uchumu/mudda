import { PropsWithChildren } from "react";

const Capsule = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-[22px]">
      <div className="w-max px-[20px] h-[32px] flex items-center justify-center rounded-full bg-[#E8EEF5]">
        {children}
      </div>
    </div>
  );
};

export default Capsule;
