import CustomTextArea from "@/components/CustomTextArea";
import StepHeader from "@/components/Funnel/StepHeader";

interface Props {
  text: string;
  setText: (newText: string) => void;
}
const TextInputStep = ({ text, setText }: Props) => {
  return (
    <div className="h-full flex-col px-[22px]">
      <div className="h-[10px]" />
      <StepHeader text={`캡슐에 함께 묻을\n$이야기$를 작성해 주세요.`} />
      <div className="h-[42px]" />
      <CustomTextArea
        value={text}
        setValue={setText}
        placeholder="캡슐에 이름을 붙여주세요."
        mountFocus
      />
    </div>
  );
};

export default TextInputStep;
