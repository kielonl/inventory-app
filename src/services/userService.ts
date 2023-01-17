import { HTTPMETHODS } from "@/constants/HTTPMETHODS";
import { callApi } from "../api/callApi";

const register = async (name: string, password: string): Promise<any> => {
  const result = await callApi(HTTPMETHODS.POST, "/users/create", {
    name,
    password,
    is_admin: false,
  });

  return result.data;
};

const login = async (username: string, password: string) => {
  const result = await callApi(HTTPMETHODS.POST, "/token", {
    username,
    password,
  });

  return result.data;
};

export { register, login };
