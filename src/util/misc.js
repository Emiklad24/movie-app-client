import { QueryClient } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { broadcastQueryClient } from "react-query/broadcastQueryClient-experimental";

export const screenWidth = window?.screen?.width;
export const delay = 500;
export const timeout = 20000;
export const isDev = process.env.NODE_ENV !== "production";
export const apiURL = "https://api.themoviedb.org/3";

const queryClientSettings = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      cacheTime: 6.048e8,
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      suspense: false,
      staleTime: 6.048e8,
    },
    mutations: {
      retry: 2,
    },
  },
};

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

export let queryClient = new QueryClient(queryClientSettings);

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});
broadcastQueryClient({
  queryClient,
  broadcastChannel: "Movie-appwfdfefdregftggtlo",
});
