import { HTTP_METHOD } from "@/constants";
import axios from "axios";
import { callApi } from "../api/callApi";

const register = async (name: string, password: string): Promise<any> => {
  const result = await callApi(HTTP_METHOD.POST, "/users/create", {
    name,
    password,
    is_admin: false,
  });

  return result.data;
};

const login = async (name: string, password: string): Promise<any> => {
  const result = await callApi(HTTP_METHOD.POST, "/login", {
    name,
    username: name,
    password,
    is_admin: false,
  });
  console.log(result);

  return result;
};

export { register, login };
