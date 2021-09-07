import { QueryClient } from "react-query";

export const isDev = process.env.NODE_ENV !== "production";
export const apiURL = "https://api.themoviedb.org/3";

const queryClientSettings = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      cacheTime: 3.6e6,
      refetchInterval: 3.6e6, //1 hour
      refetchIntervalInBackground: false,
      suspense: false,
      staleTime: 3.6e6,
    },
    mutations: {
      retry: 2,
    },
  },
};

export const screenWidth = window?.screen?.width;
// App routing settings
export const delay = 500;
export const timeout = 20000;

export const queryClient = new QueryClient(queryClientSettings);
