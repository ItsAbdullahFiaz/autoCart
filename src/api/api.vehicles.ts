import { URLS } from "@/utils";
import apiClient from "./api.client";

export const likeVehicle = async (id: string): Promise<any> => {
  const response = await apiClient.post(URLS.likeVehicle(id));

  return response.data;
};

export const unlikeVehicle = async (id: string): Promise<any> => {
  const response = await apiClient.post(URLS.unlikeVehicle(id));

  return response.data;
};
