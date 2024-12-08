import { Capsule } from "@/types/server";
import DiggedScreen from "./DiggedScreen";
import OpenedScreen from "./OpenedScreen";
import UnDiggedScreen from "./UnDiggedScreen";

interface Props {
  capsule: Capsule;
}
const CapsuleStatusSwitcher = ({ capsule }: Props) => {
  switch (capsule.status) {
    case "undigged":
      return <UnDiggedScreen capsule={capsule} />;
    case "digged":
      return <DiggedScreen capsule={capsule} />;
    case "opened":
      return <OpenedScreen capsule={capsule} />;
  }
};

export default CapsuleStatusSwitcher;
