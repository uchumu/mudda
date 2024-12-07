import LandingLogo from "@/assets/images/landingLogo.png";
import { useAlert } from "@/_app/Providers/alert";
import CommonButtons from "@/components/CustomButtons";

const LandingPage = () => {
  const { alert } = useAlert();

  const handleClick = async () => {
    await alert("준비중이에요.");
  };

  return (
    <div className="relative w-[100%] h-[100%] bg-primary-paper">
      <div className="w-full h-full flex items-center justify-center">
        <img src={LandingLogo} className="px-[112px]" />
      </div>

      <CommonButtons.BottomButton
        title="캡슐 생성하기"
        onClick={handleClick}
      ></CommonButtons.BottomButton>
    </div>
  );
};

export default LandingPage;
