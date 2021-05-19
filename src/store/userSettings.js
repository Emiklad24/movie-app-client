import create from "zustand";
import { persist2 } from "./storeHelper";
import { userSettingsStoreName } from "./storeLocalStorageNames";

export const UserSettingsStore = create(
  persist2(userSettingsStoreName, (set, get) => ({
    currentView: "Popular",

    switchCurrentView: (view) => {
      return set((state) => {
        state.currentView = view;
      });
    },
  }))
);
