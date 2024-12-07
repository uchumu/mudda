import { createRoot } from "react-dom/client";
import "./index.css";
import Providers from "./Providers";

const updateViewportHeight = () => {
  // 현재 화면의 실제 높이를 1vh 단위로 계산
  const vh = window.innerHeight * 0.01;
  // CSS 변수에 --vh로 저장
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// 초기 실행
updateViewportHeight();

// 화면 크기 변화 시 다시 계산
window.addEventListener("resize", updateViewportHeight);

createRoot(document.getElementById("root")!).render(<Providers />);
