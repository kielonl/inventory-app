import axios from "axios";
import type { Item, ServiceRead, UpdateItem, ItemError } from "@/types";

enum HTTPMETHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

const apiUrl = import.meta.env.VITE_API_URL;
//change data type later
const callApi = async (
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

const read = async (): Promise<ServiceRead> => {
  const result = await callApi(HTTPMETHODS.GET, "/items");

  return result.data;
};

const readById = async (id: string): Promise<Item> => {
  const result = await callApi(HTTPMETHODS.GET, `/items/${id}`);

  return result.data;
};

const write = async (item: Omit<Item, "id">): Promise<Item> => {
  const result = await callApi(HTTPMETHODS.POST, "/items", item);

  return result.data;
};

const put = async (id: string, item: Omit<Item, "id">): Promise<UpdateItem> => {
  const result = await callApi(HTTPMETHODS.PUT, `/items/${id}`, item);

  return result.data;
};

const remove = async (id: string): Promise<ItemError> => {
  const result = await callApi(HTTPMETHODS.DELETE, `/items/${id}`);

  return result.data;
};

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

export { read, readById, write, put, remove, register, login };
