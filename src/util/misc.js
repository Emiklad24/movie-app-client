import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createLocalStoragePersistor } from "react-query/createLocalStoragePersistor-experimental";
import { QueryClient } from "react-query";
import { broadcastQueryClient } from "react-query/broadcastQueryClient-experimental";

export const isDev = process.env.NODE_ENV !== "production";
export const apiURL = "https://api.themoviedb.org/3";
// query client settings
export const queryClientSettings = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      cacheTime: 1000 * 60 * 500 * 1000,
      refetchInterval: 1000 * 60 * 500, //50 mins
      refetchIntervalInBackground: true,
      suspense: false,
      staleTime: 1000 * 60 * 500,
    },
    mutations: {
      // mutation options
    },
  },
};

export const screenWidth = window?.screen?.width;
// App routing settings
export const delay = 500;
export const timeout = 20000;

export const queryClient = new QueryClient(queryClientSettings);
const localStoragePersistor = createLocalStoragePersistor({
  localStorageKey: "SIMPLE_MOVIE_APP",
  throttleTime: 1000,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

broadcastQueryClient({
  queryClient,
  broadcastChannel: "simple_movie_app",
});
