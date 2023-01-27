import type { HTTP_METHOD } from "@/constants";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const callApi = async (
  HTTPMethod: HTTP_METHOD,
  url: string,
  data?: any
): Promise<any> => {
  try {
    console.log(`${apiUrl}${url}`);
    return await axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "content-type": "application/json",
      },
      method: HTTPMethod,
      // url: `${apiUrl}${url}`,
      url,
      data,
    });
  } catch (error) {
    return error;
  }
};
