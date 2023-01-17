import type { HTTPMETHODS } from "@/constants/HTTPMETHODS";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const callApi = async (
  HTTPMethod: HTTPMETHODS,
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
        "content-type": "application/x-www-form-urlencoded",
      },
      method: HTTPMethod,
      url: `${apiUrl}${url}`,
      data,
    });
  } catch (error) {
    return error;
  }
};
