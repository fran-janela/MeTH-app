import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient() {
  const { "api.accessToken": accessToken } = parseCookies();

  const api = axios.create({
    baseURL: "http://ec2-3-137-191-178.us-east-2.compute.amazonaws.com",
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (accessToken)
    api.defaults.headers.common["Authorization"] = `Token ${accessToken}`;

  return api;
}
