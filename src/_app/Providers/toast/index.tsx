import Toast from "@/components/Toast";
import { FC, ReactNode, useState } from "react";
import ToastContext from "./ToastContext";

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resolveCallback, setResolveCallback] = useState<(() => void) | null>(
    null
  );
  const [toastType, setToastType] = useState<"normal" | "error">("normal");

  const showToast = (message: string, type: "normal" | "error" = "normal") => {
    return new Promise<void>((resolve) => {
      setToastMessage(message);
      setToastType(type);
      setResolveCallback(() => resolve);
    });
  };

  const hideToast = () => {
    if (resolveCallback) resolveCallback();
    setToastMessage(null);
    setResolveCallback(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <Toast message={toastMessage} hideToast={hideToast} type={toastType} />
      )}
    </ToastContext.Provider>
  );
};
