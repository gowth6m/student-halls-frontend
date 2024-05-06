import { create } from "zustand";
import { AppConfig } from "@/configs/app-config";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
    token: string | null;
    setToken: (value: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (value) => set({ token: value }),
        }),
        {
            name: AppConfig.localStorageKeys.auth,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
