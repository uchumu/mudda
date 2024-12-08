import IconCopy from "@/assets/icons/copy-icon.svg?react";
import BackButtonHeader from "@/components/BackButtonHeader";
import { domain } from "@/constants/environments";
import { isUndefined } from "@/utils";
import { QRCodeSVG } from "qrcode.react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";

const CapsuleSharePage = () => {
  const { code } = useParams();
  const capsuleCode = useMemo(() => (isUndefined(code) ? "" : code), [code]);
  const shareUrl = useMemo(
    () => `${domain}/capsule/${encodeURIComponent(capsuleCode)}`,
    [capsuleCode]
  );

  const navigate = useNavigate();
  const goBack = () => navigate(`/capsule/${encodeURIComponent(capsuleCode)}`);
  const onClickCopy = () => navigator.clipboard.writeText(shareUrl);

  return (
    <div className="w-full h-full bg-primary-paper">
      <div className="w-full">
        <BackButtonHeader onClick={goBack} />
      </div>
      <div className="w-full h-[calc(100%-54px)] flex flex-col items-center justify-center gap-[60px]">
        <div className="flex flex-col gap-[10px] text-center">
          <span className="text-[20px] font-bold">캡슐을 공유해 보세요!</span>
          <span className="text-[14px] text-[#A1A1A1]">
            QR 코드를 공유하여 캡슐을 채워보세요.
          </span>
        </div>
        <div className="w-max h-max p-2 border-[5px] border-solid border-black flex justify-center- items-center">
          <QRCodeSVG value={shareUrl} width={160} height={160} />
        </div>
        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-[300px] h-[54px]">
            <input
              value={shareUrl}
              onChange={() => {}}
              className="w-full h-full px-[18px] pr-[52px] text-[16px] border-[1px] rounded-[15px] focus:border-primary-main focus:outline-none"
            />
            <div
              className="absolute top-[18px] right-[20px] cursor-pointer"
              onClick={onClickCopy}
            >
              <IconCopy />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleSharePage;
