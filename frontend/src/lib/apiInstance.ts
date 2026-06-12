import axios from "axios";

export const SERVER_BASE_URL = "http://localhost:8080";
export const API_BASE_URL = `${SERVER_BASE_URL}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setApiAccessToken = (accessToken: string | null) => {
  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
};
