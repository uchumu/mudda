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
      <div className="h-[16px]" />
      <div className="w-full py-[22px] px-[18px] rounded-[16px] bg-[#F8F8F8] text-[14px] text-[#A1A1A1] flex flex-col">
        <p>* 캡슐 파묻기 시에 사용될 비밀번호입니다.</p>
        <p>* 비밀번호 분실 시 재설정이 불가능합니다.</p>
      </div>
    </div>
  );
};

export default PasswordInputStep;
