import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  token: string | null;
  isLoading: boolean;
  setToken: (token: string) => void;
  setDeviceHeight: (deviceHeight: number) => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  deviceHeight: number;
};

const initialState = {
  token: null,
  isLoading: false,
  deviceHeight: 550,
  userId: null,
};

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      ...initialState,
      setUserId: (userId) => set({ userId }),
      setToken: (token) => set({ token }),
      setDeviceHeight: (deviceHeight) => set({ deviceHeight }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
