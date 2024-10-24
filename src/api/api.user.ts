import { URLS } from "@/utils";
import apiClient from "./api.client";

export const followUser = async (id: string): Promise<any> => {
  const response = await apiClient.post(URLS.followUser(id));

  return response.data;
};

export const unfollowUser = async (id: string): Promise<any> => {
  const response = await apiClient.post(URLS.unfollowUser(id));

  return response.data;
};

export const removeFollower = async (id: string): Promise<any> => {
  const response = await apiClient.delete(URLS.removeFollowerbyId(id));
  return response.data;
};

export const getUserStories = async (id: string): Promise<any> => {
  const response = await apiClient.get(URLS.getUserStories(id));
  return response.data;
};

export const getUserbyId = async (id: string): Promise<any> => {
  const response = await apiClient.get(URLS.getUserbyId(id));
  return response.data;
};
