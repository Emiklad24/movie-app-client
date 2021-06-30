import create from "zustand";
import {
  upcomingMoviesStoreName,
  storeVersion,
} from "./storeLocalStorageNames";
import { persist } from "zustand/middleware";

export const upcomingMoviesStore = create(
  persist(
    (set, get) => ({
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
    }),
    {
      name: upcomingMoviesStoreName,
      version: storeVersion,
    }
  )
);
