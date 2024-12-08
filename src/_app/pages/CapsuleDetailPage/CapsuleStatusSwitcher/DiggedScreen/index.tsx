import { DiggedCapsule } from "@/types/server";

interface Props {
  capsule: DiggedCapsule;
}
const DiggedScreen = ({ capsule }: Props) => {
  return <>{capsule.status}</>;
};

export default DiggedScreen;
