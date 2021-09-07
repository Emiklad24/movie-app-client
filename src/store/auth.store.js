import create from "zustand";
import { persist } from "zustand/middleware";
import { authStoreName, storeVersion } from "./storeLocalStorageNames";

export const authStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: null,
      user: null,
      token: null,
      loadUser: (data) => {
        return set((state) => {});
      },
      loginSucess: (data) => {
        return set((state) => {});
      },
      resetAuth: (data) => {
        return set((state) => {});
      },
    }),
    {
      name: authStoreName,
      version: storeVersion,
    }
  )
);
