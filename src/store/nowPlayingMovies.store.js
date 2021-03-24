import create from "zustand";
import { persist2 } from "./storeHelper";
import { nowPlayingMoviesStoreName } from "./storeLocalStorageNames";

export const NowPlayingMoviesStore = create(
  persist2(nowPlayingMoviesStoreName, (set, get) => ({
    nowPlayingMovies: [],
    currentPage: 1,
    updateNowPlayingMovies: (data) => {
      return set((state) => {
        state.nowPlayingMovies = [...get().nowPlayingMovies, ...data?.results];
      });
    },
    updateCurrentPage: (result, pageNum) => {
      if (result !== null && get()?.currentPage < result?.total_pages) {
        return set((state) => {
          state.currentPage = pageNum;
        });
      }
      return set((state) => {
        state.currentPage = pageNum;
      });
    },
  }))
);
