import create from "zustand";
import { persist2 } from "./storeHelper";
import { upcomingMoviesStoreName } from "./storeLocalStorageNames";

export const upcomingMoviesStore = create(
  persist2(upcomingMoviesStoreName, (set, get) => ({
    upcomingMovies: [],
    currentPage: 1,
    updateUpcomingMovies: (data) => {
      return set((state) => {
        state.upcomingMovies = [...get().upcomingMovies, ...data?.results];
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
