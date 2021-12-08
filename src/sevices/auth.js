import { api } from "./api";

export async function recoverUserInformation(token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;

  const response = await api.get("/auth/users/me");

  return {
    user: response.data,
  };
}
