import router from "@/_app/Providers/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { AlertProvider } from "./alert";
import { LoadingOverlayProvider } from "./loadingOverlay";
import { ToastProvider } from "./toast";

const queryClient = new QueryClient();

const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingOverlayProvider>
      <AlertProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ToastProvider>
      </AlertProvider>
    </LoadingOverlayProvider>
  </QueryClientProvider>
);

export default Providers;
