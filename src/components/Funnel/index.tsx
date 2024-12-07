import BackButtonHeader from "@/components/BackButtonHeader";
import CustomButtons from "@/components/CustomButtons";
import StepProgress from "@/components/Progress/StepProgress";
import { isUndefined } from "@/utils";
import { useMemo, useState } from "react";

export interface Step {
  children: JSX.Element;
  BottomButton: {
    title?: string;
    onClick: () => boolean;
    disabled?: boolean;
  };
  errorMessage: string;
}

interface Props {
  steps: Array<Step>;
  firstBackCallback: () => void;
  lastNextCallback: () => void;
}
const Funnel = ({ steps, firstBackCallback, lastNextCallback }: Props) => {
  const [focusedStepIndex, setFocusedStepIndex] = useState<number>(0);

  const focusedStep = useMemo(
    () =>
      focusedStepIndex <= steps.length - 1
        ? steps[focusedStepIndex]
        : undefined,
    [steps, focusedStepIndex]
  );

  const goBack = () => {
    if (isUndefined(focusedStep)) return;

    if (focusedStepIndex <= 0) {
      firstBackCallback();

      return;
    }

    const isValid = focusedStep.BottomButton.onClick();

    if (isValid) setFocusedStepIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (isUndefined(focusedStep)) return;

    const isValid = focusedStep.BottomButton.onClick();

    if (!isValid) return;

    if (focusedStepIndex >= steps.length - 1) {
      lastNextCallback();

      return;
    }

    setFocusedStepIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full">
      <BackButtonHeader onClick={goBack} />
      <StepProgress max={steps.length} current={focusedStepIndex} />
      {!isUndefined(focusedStep) && focusedStep.children}
      <CustomButtons.BottomButton
        title={focusedStep?.BottomButton.title ?? "다음"}
        onClick={goNext}
        disabled={focusedStep?.BottomButton.disabled}
        errorMessage={focusedStep?.errorMessage}
      />
    </div>
  );
};

export default Funnel;
