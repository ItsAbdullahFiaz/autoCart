import { URLS } from "@/utils";
import apiClient from "./api.client";
import { LoginCredentials, LoginResponse, SignUpCredentials, SignupResponse } from "@/models/types.auth";

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post(URLS.login, credentials);
  return response.data;
};

export const signup = async (credentials: SignUpCredentials): Promise<SignupResponse> => {
  const response = await apiClient.post(URLS.signup, credentials);
  return response.data;
};
