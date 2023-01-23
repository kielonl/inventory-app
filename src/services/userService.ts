import { METHODS } from "@/constants";
import { callApi } from "../api/callApi";

const register = async (name: string, password: string): Promise<any> => {
  const result = await callApi(METHODS.POST, "/users/create", {
    name,
    password,
    is_admin: false,
  });

  return result.data;
};

const login = async (name: string, password: string): Promise<any> => {
  const result = await callApi(METHODS.POST, "/login", {
    name,
    username: name,
    password,
    is_admin: false,
  });

  return result;
};

export { register, login };
