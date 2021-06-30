import create from "zustand";
import { storeVersion, userSettingsStoreName } from "./storeLocalStorageNames";

import { persist } from "zustand/middleware";

export const UserSettingsStore = create(
  persist(
    (set, get) => ({
      currentView: "Popular",

      switchCurrentView: (view) => {
        return set((state) => {
          state.currentView = view;
        });
      },
    }),
    {
      name: userSettingsStoreName,
      version: storeVersion,
    }
  )
);
