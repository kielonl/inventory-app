import type { Item, ServiceRead, UpdateItem, ItemError } from "@/types";
import { HTTP_METHOD } from "@/constants";
import { callApi } from "../api/callApi";

const read = async (
  column: string,
  order: number,
  query?: string
): Promise<ServiceRead> => {
  const result = await callApi(
    HTTP_METHOD.GET,
    `/items/find?name=${query || ""}&skip=0&limit=100&sort=${column}&order=${
      order < 0 ? "desc" : "asc"
    }&page=1&size=50`
  );

  return result.data;
};

const readById = async (id: string): Promise<Item> => {
  const result = await callApi(HTTP_METHOD.GET, `/items/${id}`);

  return result.data;
};

const write = async (item: Omit<Item, "id">): Promise<Item> => {
  const result = await callApi(HTTP_METHOD.POST, "/items", item);

  return result.data;
};

const put = async (id: string, item: Omit<Item, "id">): Promise<UpdateItem> => {
  const result = await callApi(HTTP_METHOD.PUT, `/items/${id}`, item);

  return result.data;
};

const remove = async (id: string): Promise<ItemError> => {
  const result = await callApi(HTTP_METHOD.DELETE, `/items/${id}`);

  return result.data;
};

export { read, readById, write, put, remove };
