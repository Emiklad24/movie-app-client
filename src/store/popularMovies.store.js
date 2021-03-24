import create from "zustand";
import { persist2 } from "./storeHelper";
import { popularMoviesStoreName } from "./storeLocalStorageNames";

export const PopularMoviesStore = create(
  persist2(popularMoviesStoreName, (set, get) => ({
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
  }))
);
