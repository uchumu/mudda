import Alert from "@/components/Alert";
import { createContext, useContext, useState, FC, ReactNode } from "react";

type AlertContextType = {
  alert: (message: string) => Promise<void>;
};

const AlertContext = createContext<AlertContextType | null>(null);

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

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
