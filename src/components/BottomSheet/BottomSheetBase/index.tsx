import ReactDOM from "react-dom";
import { Dispatch, SetStateAction } from "react";
import useBottomSheet from "./useBottomSheet";
import { PropsWithChildren } from "react";
import clsx from "clsx";
interface Props extends PropsWithChildren {
  setIsShown: Dispatch<SetStateAction<boolean>>;
}

const BottomSheetBase = ({ children, setIsShown }: Props) => {
  const { handleMove, handleStart, isMapBottomSheetOpen, setIsMapBottomSheetOpen } = useBottomSheet(setIsShown);

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root Element가 없습니다.");
    return null;
  }
  const handleTouchStart = (event: React.TouchEvent) => handleStart("touch", event);
  const handleTouchMove = (event: React.TouchEvent) => handleMove("touch", event);
  const handleMouseDown = (event: React.MouseEvent) => handleStart("mouse", event);
  const handleMouseUp = (event: React.MouseEvent) => handleMove("mouse", event);

  const content = (
    <div className={"h-screen overflow-hidden absolute inset-[0]"}>
      <div
        className={clsx(
          "absolute w-full z-[11] h-[90%] bottom-[-90%] transform transition-transform duration-300 rounded-tl-2xl rounded-tr-2xl bg-white flex flex-col",
          isMapBottomSheetOpen && "translate-y-[calc(-100%)]"
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className={"my-4 m-auto h-[3px] w-9 bg-[#ccc] rounded-full"} />
        <div className={"flex-1 p-2 pt-0"}>{children}</div>
      </div>
      <div
        onClick={() => setIsMapBottomSheetOpen(false)}
        className={clsx("absolute z-10 transition-opacity duration-600 bg-black/[0.2] w-full h-full", isMapBottomSheetOpen ? "opacity-100 " : "opacity-0")}
      />
    </div>
  );
  return ReactDOM.createPortal(content, rootElement);
};

export default BottomSheetBase;
