import { createContext } from "react";

type ToastContextType = {
  showToast: (message: string, type?: "normal" | "error") => Promise<void>;
};

const ToastContext = createContext<ToastContextType | null>(null);

export default ToastContext;
