import { HTTPMETHODS } from "@/constants";
import { callApi } from "../api/callApi";

const register = async (name: string, password: string): Promise<any> => {
  const result = await callApi(HTTPMETHODS.POST, "/users/create", {
    name,
    password,
    is_admin: false,
  });

  return result.data;
};

const login = async (
  name: string,
  password: string
): Promise<{ detail: string; login: string | undefined }> => {
  const result = await callApi(HTTPMETHODS.POST, "/login", {
    name,
    username: name,
    password,
    is_admin: false,
  });

  return result.response !== undefined ? result.response.data : result.data;
};

export { register, login };
