import create from "zustand";
import client from "../FeathersClient";
import { persist2 } from "./storeHelper";
import { authStoreName } from "./storeLocalStorageNames";

export const authStore = create(
  persist2(authStoreName, (set, get) => ({
    token: localStorage.getItem("auth"),
    isAuthenticated: null,
    user: null,
    loadUser: (data) => {
      return set((state) => {
        state.isAuthenticated = true;

        state.token =
          localStorage.getItem("auth") === "" ||
          localStorage.getItem("auth") === null ||
          localStorage.getItem("auth") === undefined
            ? data?.accessToken
            : localStorage.getItem("auth");

        state.user = data.user;
      });
    },

    loginSucess: (data) => {
      localStorage.setItem("auth", data.accessToken);
      return set((state) => {
        state.token = localStorage.getItem("auth", data.accessToken);

        state.isAuthenticated = true;

        state.user = data.user;
      });
    },
    resetAuth: (data) => {
      localStorage.removeItem("auth");
      return set((state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      });
    },
  }))
);
