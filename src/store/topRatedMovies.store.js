import create from "zustand";
import {
  topRatedMoviesStoreName,
  storeVersion,
} from "./storeLocalStorageNames";
import { persist } from "zustand/middleware";

export const TopRatedMoviesStore = create(
  persist(
    (set, get) => ({
      topRatedMovies: [],
      currentPage: 1,
      updateTopRatedMovies: (data) => {
        return set((state) => {
          state.topRatedMovies = [...get().topRatedMovies, ...data?.results];
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
      name: topRatedMoviesStoreName,
      version: storeVersion,
    }
  )
);
