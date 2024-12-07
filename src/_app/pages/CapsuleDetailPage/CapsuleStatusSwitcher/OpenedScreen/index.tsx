import { OpenedCapsule } from "@/types/server";

interface Props {
  capsule: OpenedCapsule;
}
const OpenedScreen = ({ capsule }: Props) => {
  return <>{capsule.status}</>;
};

export default OpenedScreen;
