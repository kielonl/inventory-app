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
  return await axios({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    },
    method: HTTPMethod,
    url: `${apiUrl}${url}`,
    data,
  });
};

const read = async (): Promise<any[]> => {
  const result = await callApi(HTTP_METHODS.GET, "/tasks");
  return result.data;
};

const readById = async (id: string): Promise<ApiTask> => {
  const result = await callApi(HTTP_METHODS.GET, `/tasks/${id}`);

  return result.data;
};

const write = async (task: Omit<ApiTask, "id">): Promise<ApiTask> => {
  const result = await callApi(HTTP_METHODS.POST, "/tasks", task);

  return result.data;
};

const put = async (
  taskId: string,
  task: Omit<ApiTask, "id">
): Promise<{ type?: string; name?: string; message?: string }> => {
  const result = await callApi(HTTP_METHODS.PUT, `/tasks/${taskId}`, task);
  return result.data;
};

const remove = async (id: string): Promise<{ message: string }> => {
  const result = await callApi(HTTP_METHODS.DELETE, `/tasks/${id}`);

  return result.data;
};

export { read, readById, write, put, remove };
