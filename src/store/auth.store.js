import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { authStoreName, storeVersion } from "./storeLocalStorageNames";

let authStore = (set, get) => ({
  jwt: null,
  isAuthenticated: false,
  userDetails: null,

  populateUserInfoAndJwt: (payload) => {
    set((state) => ({
      userDetails: payload?.user,
      jwt: payload?.jwt,
      isAuthenticated: true,
    }));
  },

  refreshUserInfo: (payload) => {
    set((state) => ({
      userDetails: payload,
    }));
  },

  reset: () => {
    localStorage.clear();
    set((state) => ({ userDetails: null, jwt: null, isAuthenticated: false }));
  },
});

authStore = devtools(authStore);

authStore = persist(authStore, {
  name: authStoreName,
  version: storeVersion,
});

const useUserCredentialsStore = create(authStore);

export default useUserCredentialsStore;
