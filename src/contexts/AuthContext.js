import { setCookie, destroyCookie } from "nookies";
import { api } from "../sevices/api";
import router from "next/router";

export function refreshPage() {
  window.location.reload();
}

export async function signin({ email, password }) {
  try {
    const { data: response } = await api.post(`/auth/token/login/`, {
      email,
      password,
    });
    setCookie(undefined, "api.accessToken", response.auth_token, {
      maxAge: 60 * 60 * 1,
      path: "/",
    });
    api.defaults.headers.common["Authorization"] = `Token ${response.auth_token}`;
  } catch (error) {
    return error.response;
  }
  refreshPage();
}

export async function signUp(suData) {
  try {
    const { data: response } = await api.post(`/auth/users/`, {
      ...suData,
    });
    await signin(suData);
  } catch (error) {
    return error.response;
  }
}

export async function logOut() {
  try {
    await api.post(`/auth/token/logout`);
    destroyCookie(null, "api.accessToken");
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
  router.push("/");
}
