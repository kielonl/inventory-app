import type { Item, ServiceRead, UpdateItem, ItemError } from "@/types";
import { HTTPMETHODS } from "@/constants/HTTPMETHODS";
import { callApi } from "../api/callApi";

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

export { read, readById, write, put, remove };
