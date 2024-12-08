import { ReactNode } from "react";

interface Props {
  capsuleName: string;
  rightButton: ReactNode;
}
const CapsuleNameHeader = ({ capsuleName, rightButton }: Props) => (
  <div className="h-[54px] px-[22px] flex items-center justify-between">
    <span>{capsuleName}</span>
    {rightButton}
  </div>
);

export default CapsuleNameHeader;
