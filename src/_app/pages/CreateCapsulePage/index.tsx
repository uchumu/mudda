import Funnel, { Step } from "@/components/Funnel";

const CreateCapsulePage = () => {
  const steps: Array<Step> = [
    {
      children: <div>step 1</div>,
      BottomButton: {
        title: "다음",
        onClick: () => true,
      },
      errorMessage: "잘못된 입력입니다.",
    },
    {
      children: <div>step 1</div>,
      BottomButton: {
        title: "다음",
        onClick: () => true,
      },
      errorMessage: "잘못된 입력입니다.",
    },
    {
      children: <div>step 1</div>,
      BottomButton: {
        title: "다음",
        onClick: () => true,
      },
      errorMessage: "잘못된 입력입니다.",
    },
  ];

  return (
    <>
      <Funnel
        steps={steps}
        firstBackCallback={() => console.log("go back")}
        lastNextCallback={() => console.log("go next")}
      />
    </>
  );
};

export default CreateCapsulePage;
