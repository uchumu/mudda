import CustomInput from "@/components/CustomInput";
import StepHeader from "@/components/Funnel/StepHeader";

interface Props {
  password: string;
  setPassword: (newPassword: string) => void;
}
const PasswordInputStep = ({ password, setPassword }: Props) => {
  return (
    <div className="flex-col px-[22px]">
      <div className="h-[54px]" />
      <StepHeader text={`캡슐 잠금을 위한\n$비밀번호$를 설정해 주세요.`} />
      <div className="h-[54px]" />
      <CustomInput
        label="비밀번호"
        value={password}
        setValue={setPassword}
        placeholder="캡슐비밀번호를 입력해 주세요."
        mountFocus
      />
    </div>
  );
};

export default PasswordInputStep;
