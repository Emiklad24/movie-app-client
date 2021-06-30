import create from "zustand";
import { popularMoviesStoreName, storeVersion } from "./storeLocalStorageNames";
import { persist } from "zustand/middleware";

export const PopularMoviesStore = create(
  persist(
    (set, get) => ({
      popularMovies: [],
      currentPage: 1,
      updatePopularMovies: (data) => {
        return set((state) => {
          state.popularMovies = [...get().popularMovies, ...data?.results];
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
      name: popularMoviesStoreName,
      version: storeVersion,
    }
  )
);
