import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserState = {
  followers: string[];
  setFollowers: (id: string) => void;
  following: string[];
  setFollowing: (id: string) => void;
  username: string;
  _id: string;
  setUser: (user: any) => void;
  stories: string[];
  setStories: (id: string) => void;
  followingStories: string[];
  setFollowingStories: (id: string) => void;
};

const initialState = {
  followers: [],
  following: [],
  stories: [],
  followingStories: [],
  username: "",
  _id: null,
};

export const useUserStore = create<UserState>(
  //   persist(
  (set) => ({
    ...initialState,
    setUser: (user) => set(user),
    setFollowing: (following) => set({ following }),
    setFollowers: (followers) => set({ followers }),
    setStories: (stories) => set({ stories }),
    setFollowingStories: (stories) => set({ stories }),
  }),
  // {
  //   name: "user-storage",
  //   storage: createJSONStorage(() => AsyncStorage),
  // },
);
// );
