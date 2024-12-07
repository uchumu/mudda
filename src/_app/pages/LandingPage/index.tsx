import LandingLogo from "@/assets/images/landingLogo.png";
import { useAlert } from "@/_app/Providers/alert";

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

      <div className="absolute bottom-[30px] px-[22px] w-full">
        <div
          onClick={handleClick}
          className=" bg-primary-main text-primary-text h-[60px] w-full flex items-center justify-center rounded-[15px] font-bold"
        >
          캡슐 생성하기
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
