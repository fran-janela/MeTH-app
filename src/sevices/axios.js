import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient() {
  const { "api.accessToken": accessToken } = parseCookies();

  const api = axios.create({
    baseURL: "http://0.0.0.0:8000",
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (accessToken)
    api.defaults.headers.common["Authorization"] = `Token ${accessToken}`;

  return api;
}
