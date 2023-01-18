import type { HTTP_METHODS } from "@/constants";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export enum ENDPOINTS {
  items = "items",
  users = "users",
}

export const callApi = async (
  HTTPMethod: HTTP_METHODS,
  url: string,
  data?: any
): Promise<any> => {
  try {
    return await axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "content-type": "application/json",
      },
      method: HTTPMethod,
      url: `${apiUrl}${url}`,
      data,
    });
  } catch (error) {
    return error;
  }
};
