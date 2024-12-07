import LoadingOverlay from "@/components/LoadingOverlay";
import { createContext, FC, ReactNode, useContext, useState } from "react";

type LoadingContext = {
  setGlobalLoading: (value: boolean) => void;
};

const loadingOverlayContext = createContext<LoadingContext | null>(null);

export const LoadingOverlayProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setGlobalLoading = (value: boolean) => setIsLoading(value);

  return (
    <loadingOverlayContext.Provider value={{ setGlobalLoading }}>
      {children}
      {isLoading && <LoadingOverlay />}
    </loadingOverlayContext.Provider>
  );
};

export const useLoadingOverlay = () => {
  const context = useContext(loadingOverlayContext);
  if (!context) {
    throw new Error(
      "useLoadingOverlay must be used within an loadingOverlayProvider"
    );
  }
  return context;
};
