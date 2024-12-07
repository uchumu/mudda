import { useMemo } from "react";

interface Props {
  text: string;
}

const StepHeader = ({ text }: Props) => {
  const formattedText = useMemo(
    () =>
      text.split(/(\$.*?\$)/g).map((part, index) =>
        part.startsWith("$") && part.endsWith("$") ? (
          <span key={index} className="text-primary-main whitespace-pre-line">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      ),
    [text]
  );

  return (
    <h1 className="text-[22px] font-[700] leading-[32px] whitespace-pre-line">
      {formattedText}
    </h1>
  );
};

export default StepHeader;
