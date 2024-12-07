import { useLoadingOverlay } from "@/_app/Providers/loadingOverlay";
import IconPlus from "@/assets/icons/plus-icon.svg?react";
import StepHeader from "@/components/Funnel/StepHeader";
import { Photo } from "@/types/client";
import { isNill, isUndefined } from "@/utils";
import clsx from "clsx";
import { ChangeEvent, useRef } from "react";
import { useWindowSize } from "react-use";

interface Props {
  photo: Photo | undefined;
  setPhoto: (newPhoto: Photo) => void;
}
const PhotoInputStep = ({ photo, setPhoto }: Props) => {
  const { setGlobalLoading } = useLoadingOverlay();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickUpload = () => {
    if (isNill(inputRef.current)) {
      return;
    }

    inputRef.current.click();
  };
  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (isNill(event.target) || isNill(event.target.files)) {
      return;
    }

    const file = event.target.files[0];
    setGlobalLoading(true);

    const maxSize = 5 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setGlobalLoading(false);

      return;
    }

    const fileUrl = URL.createObjectURL(file);

    const img = new window.Image();
    img.src = fileUrl;
    img.onload = () =>
      setPhoto({
        file,
        url: fileUrl,
      });
    setGlobalLoading(false);
  };

  const { height } = useWindowSize();

  return (
    <>
      <div className="h-full flex-col px-[22px]">
        <div className="h-[10px]" />
        <StepHeader text={`캡슐에 함께 묻을\n$사진$을 선택해 주세요.`} />
        <div className="h-[42px]" />
        <div
          style={{
            height:
              height - 54 - 18 - 32 - 10 - 64 - 42 - 18 - 20 - 18 - 56 - 30,
          }}
          className={clsx(
            "relative p-[14px] flex flex-col gap-[10px] bg-white rounded-[15px] border-[1px] border-solid border-border-grey justify-center items-center"
          )}
        >
          {isUndefined(photo) ? (
            <div className="w-full h-full p-[14px] rounded-[15px] border-[1px] border-dashed border-[#A1A1A1] flex justify-center items-center">
              <div className="flex flex-col gap-[6px] text-center">
                <IconPlus onClick={onClickUpload} className="cursor-pointer" />
                <p>
                  <span className="text-primary-main">0</span>
                  {` / 1`}
                </p>
              </div>
            </div>
          ) : (
            <img
              src={photo.url}
              className={clsx("w-full h-full rounded-[15px] object-contain")}
            />
          )}
        </div>
        <div className="h-[18px]" />
        <p className="text-[#A1A1A1] text-[14px] text-center">
          사진은 최대 1장, 5mb까지 업로드 가능해요.
        </p>
      </div>
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
};

export default PhotoInputStep;
