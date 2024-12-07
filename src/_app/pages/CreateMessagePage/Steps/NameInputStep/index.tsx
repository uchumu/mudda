import CustomInput from "@/components/CustomInput";
import StepHeader from "@/components/Funnel/StepHeader";

interface Props {
  name: string;
  setName: (newName: string) => void;
}
const NameInputStep = ({ name, setName }: Props) => {
  return (
    <div className="flex-col px-[22px]">
      <div className="h-[10px]" />
      <StepHeader text={`캡슐에 입력될\n$이름$을 작성해 주세요.`} />
      <div className="h-[42px]" />
      <CustomInput
        label="캡슐 이름"
        value={name}
        setValue={setName}
        placeholder="캡슐에 이름을 붙여주세요."
        mountFocus
      />
    </div>
  );
};

export default NameInputStep;
