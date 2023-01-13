import axios from "axios";

const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);
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
  const result = await callApi(HTTP_METHODS.GET, "/items");

  return result.data;
};

const readById = async (id: string): Promise<Item> => {
  const result = await callApi(HTTP_METHODS.GET, `/items/${id}`);

  return result.data;
};

const write = async (item: Omit<Item, "id">): Promise<Item> => {
  const result = await callApi(HTTP_METHODS.POST, "/items", item);

  return result.data;
};

const put = async (id: string, item: Omit<Item, "id">): Promise<UpdateItem> => {
  const result = await callApi(HTTP_METHODS.PUT, `/items/${id}`, item);

  return result.data;
};

const remove = async (id: string): Promise<ItemError> => {
  const result = await callApi(HTTP_METHODS.DELETE, `/items/${id}`);

  return result.data;
};

export { read, readById, write, put, remove };
