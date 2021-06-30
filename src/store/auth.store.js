import create from "zustand";
import { persist } from "zustand/middleware";
import { authStoreName, storeVersion } from "./storeLocalStorageNames";

export const authStore = create(
  persist(
    (set, get) => ({
      token: localStorage.getItem("feathers-jwt"),
      isAuthenticated: null,
      user: null,
      loadUser: (data) => {
        return set((state) => {
          // state.isAuthenticated = true;
          // state.token =
          //   localStorage.getItem("feathers-jwt") === "" ||
          //   localStorage.getItem("feathers-jwt") === null ||
          //   localStorage.getItem("feathers-jwt") === undefined
          //     ? data?.accessToken
          //     : localStorage.getItem("feathers-jwt");
          // state.user = data.user;
        });
      },
      loginSucess: (data) => {
        localStorage.setItem("feathers-jwt", data.accessToken);
        return set((state) => {
          state.token = localStorage.getItem("feathers-jwt", data.accessToken);
          state.isAuthenticated = true;
          state.user = data.user;
        });
      },
      resetAuth: (data) => {
        localStorage.removeItem("feathers-jwt");
        return set((state) => {
          state.token = null;
          state.isAuthenticated = false;
          state.user = null;
        });
      },
    }),
    {
      name: authStoreName,
      version: storeVersion,
    }
  )
);
