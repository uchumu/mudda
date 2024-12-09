import { createContext } from "react";

type AlertContextType = {
  alert: (message: string) => Promise<void>;
};

const AlertContext = createContext<AlertContextType | null>(null);

export default AlertContext;
