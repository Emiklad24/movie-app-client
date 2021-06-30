import create from "zustand";
import { persist } from "zustand/middleware";
import { discoverStoreName, storeVersion } from "./storeLocalStorageNames";

export const DiscoverStore = create(
  persist(
    (set, get) => ({
      currentView: "movies",
      discoveredMovies: [],
      discoveredTv: [],
      currentPageMovies: 1,
      currentPageTv: 1,

      toggleCurrent: (view) => {
        return set((state) => {
          state.currentView = view;
        });
      },

      updateNowPlayingMovies: (data) => {
        return set((state) => {
          state.nowPlayingMovies = [
            ...get().nowPlayingMovies,
            ...data?.results,
          ];
        });
      },
      updateCurrentPageMovies: (result, pageNum) => {
        if (result !== null && get()?.currentPageMovies < result?.total_pages) {
          return set((state) => {
            state.currentPageMovies = pageNum;
          });
        }
        return set((state) => {
          state.currentPageMovies = pageNum;
        });
      },
    }),
    {
      name: discoverStoreName,
      version: storeVersion,
    }
  )
);
