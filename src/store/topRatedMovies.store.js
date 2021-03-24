import create from "zustand";
import { persist2 } from "./storeHelper";
import { topRatedMoviesStoreName } from "./storeLocalStorageNames";

export const TopRatedMoviesStore = create(
  persist2(topRatedMoviesStoreName, (set, get) => ({
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
  }))
);
