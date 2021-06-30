import create from "zustand";
import { persist } from "zustand/middleware";
import {
  nowPlayingMoviesStoreName,
  storeVersion,
} from "./storeLocalStorageNames";

export const NowPlayingMoviesStore = create(
  persist(
    (set, get) => ({
      nowPlayingMovies: [],
      currentPage: 1,
      updateNowPlayingMovies: (data) => {
        return set((state) => {
          state.nowPlayingMovies = [
            ...get().nowPlayingMovies,
            ...data?.results,
          ];
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
    }),
    {
      name: nowPlayingMoviesStoreName,
      version: storeVersion,
    }
  )
);
