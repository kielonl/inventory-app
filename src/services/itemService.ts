import axios from "axios";

const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
const apiUrl = import.meta.env.VITE_API_URL;
//change data type later
const callApi = async (
  HTTPMethod: HTTP_METHODS,
  url: string,
  data: any
): Promise => {
  try {
    return await axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
      method: HTTPMethod,
      url: `${apiUrl}${url}`,
      data,
    });
  } catch (error) {
    return error;
  }
};

const read = async (): Promise<any[]> => {
  const result = await callApi(HTTP_METHODS.GET, "/tasks");
  return result.data;
};

const readById = async (id: string): Promise<Item> => {
  const result = await callApi(HTTP_METHODS.GET, `/tasks/${id}`);

  return result.data;
};

const write = async (item: Omit<Item, "id">): Promise<Item> => {
  const result = await callApi(HTTP_METHODS.POST, "/tasks", item);

  return result.data;
};

const put = async (
  itemId: string,
  item: Omit<Item, "id">
): Promise<UpdateItem> => {
  const result = await callApi(HTTP_METHODS.PUT, `/tasks/${itemId}`, item);
  return result.data;
};

const remove = async (ItemId: string): Promise<ItemError> => {
  const result = await callApi(HTTP_METHODS.DELETE, `/tasks/${ItemId}`);

  return result.data;
};

export { read, readById, write, put, remove };
