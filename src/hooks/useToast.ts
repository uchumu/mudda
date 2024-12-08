import ToastContext from "@/_app/Providers/toast/ToastContext";
import { useContext } from "react";

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }
  return context;
};

export default useToast;
