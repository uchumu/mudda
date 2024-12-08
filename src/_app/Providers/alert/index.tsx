import Alert from "@/components/Alert";
import { FC, ReactNode, useState } from "react";
import AlertContext from "./AlertContext";

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [resolveCallback, setResolveCallback] = useState<(() => void) | null>(
    null
  );

  const alert = (message: string) => {
    return new Promise<void>((resolve) => {
      setAlertMessage(message);
      setResolveCallback(() => resolve);
    });
  };

  const handleConfirm = () => {
    if (resolveCallback) resolveCallback();
    setAlertMessage(null);
    setResolveCallback(null);
  };

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      {alertMessage && (
        <Alert message={alertMessage} onConfirm={handleConfirm} />
      )}
    </AlertContext.Provider>
  );
};
