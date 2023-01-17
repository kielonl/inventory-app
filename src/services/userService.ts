import { HTTP_METHODS } from "@/constants";
import { callApi } from "../api/callApi";

const register = async (name: string, password: string): Promise<any> => {
  const result = await callApi(HTTP_METHODS.POST, "/users/create", {
    name,
    password,
    is_admin: false,
  });

  return result.data;
};

const login = async (username: string, password: string) => {
  const result = await callApi(HTTP_METHODS.POST, "/token", {
    username,
    password,
  });

  return result.data;
};

export { register, login };
