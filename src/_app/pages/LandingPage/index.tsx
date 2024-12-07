import LandingLogo from "@/assets/images/landingLogo.png";
import CommonButtons from "@/components/CustomButtons";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/capsule/create");

  return (
    <div className="relative w-[100%] h-[100%] bg-primary-paper">
      <div className="w-full h-full flex items-center justify-center">
        <img src={LandingLogo} className="px-[112px]" />
      </div>

      <CommonButtons.BottomButton title="캡슐 생성하기" onClick={handleClick} />
    </div>
  );
};

export default LandingPage;
