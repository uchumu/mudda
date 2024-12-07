import CustomInput from "@/components/CustomInput";
import StepHeader from "@/components/Funnel/StepHeader";
import Margin from "@/components/Margin";

interface Props {
  name: string;
  setName: (newName: string) => void;
}
const NameInputStep = ({ name, setName }: Props) => {
  return (
    <div className="flex-col px-[22px]">
      <Margin H="54px" />
      <StepHeader text={`함께할 캡슐에\n$이름$을 붙여보세요.`} />
      <Margin H="54px" />
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
