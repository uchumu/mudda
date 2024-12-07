import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import CustomButtons from "@/components/CustomButtons";
import { useNavigate } from "react-router";

// 진입점 설정을 위해 임시로 작성되었습니다.
const CapsuleDetailPage = () => {
  const navigate = useNavigate();

  const { setGlobalLoading } = useLoadingOverlay();

  return (
    <>
      <CustomButtons.CommonButton
        title="글로벌 로딩 테스트"
        onClick={() => setGlobalLoading(true)}
      ></CustomButtons.CommonButton>
      <CustomButtons.BottomButton
        title="캡슐 채우기"
        onClick={() => navigate("/capsule")}
      />
    </>
  );
};

export default CapsuleDetailPage;
