import { useAuthStore } from "@/store";

export const getToken = () => {
    const { token } = useAuthStore.getState();
    return token;
  };