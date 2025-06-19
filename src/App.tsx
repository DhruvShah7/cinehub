import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, theme } from "antd";
import { Outlet } from "react-router-dom";
import CommonContextProvider from "./HOCs/Context/CommonContextProvider";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <CommonContextProvider>
        <Outlet />
      </CommonContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
