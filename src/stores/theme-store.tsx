import { create } from "zustand";
import { AppConfig } from "@/configs/app-config";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeStore = {
    themeMode: "light" | "dark";
    toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            themeMode: "light",
            toggleTheme: () =>
                set((state) => ({
                    themeMode: state.themeMode === "light" ? "dark" : "light",
                })),
        }),
        {
            name: AppConfig.localStorageKeys.theme,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
