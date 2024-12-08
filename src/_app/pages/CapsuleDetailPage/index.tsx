import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import { useCapsuleQuery } from "@/queries/Capsule/useCapsuleService";
import { isUndefined } from "@/utils";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import CapsuleStatusSwitcher from "./CapsuleStatusSwitcher";

// 진입점 설정을 위해 임시로 작성되었습니다.
const CapsuleDetailPage = () => {
  const { code } = useParams();
  const capsuleCode = useMemo(() => (isUndefined(code) ? "" : code), [code]);
  const navigate = useNavigate();
  const { isPending, error, data } = useCapsuleQuery({ code: capsuleCode });
  const { setGlobalLoading } = useLoadingOverlay();

  useEffect(() => {
    if (error) navigate("/");
  }, [error]);
  useEffect(() => setGlobalLoading(isPending), [isPending]);
  return (
    <div className="bg-primary-paper w-full h-full">
      {!isPending && !error && <CapsuleStatusSwitcher capsule={data.data} />}
    </div>
  );
};

export default CapsuleDetailPage;
