import axios from "axios";

const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const apiUrl = "https://pokeapi.co/api/v2";
//change data type later
const callApi = async (
  HTTPMethod: HTTP_METHODS,
  url: string,
  data: any
): Promise => {
  return await axios({
    method: HTTPMethod,
    url: `${apiUrl}${url}`,
    data,
  }).then((response) => {
    return response;
  });
};

const read = async (): Promise => {
  const result = await callApi(HTTP_METHODS.GET, "/pokemon?offset=0");

  return result;
};

const readSingle = async (task: ApiTask): Promise => {
  const result = await callApi(HTTP_METHODS.GET, `/tasks/${task.id}`);

  return result;
};

const write = async (task: Omit<ApiTask, "id">): Promise => {
  const result = await callApi(HTTP_METHODS.POST, "/tasks");

  return result;
};

const put = async (task: ApiTask): Promise => {
  const result = await callApi(HTTP_METHODS.PUT, `/tasks/${task.id}`, { task });

  return result;
};

const _delete = async (id: string): Promise => {
  const result = await callApi(HTTP_METHODS.DELETE, `/tasks/${id}`);

  return result;
};

export { read, readSingle, write, put, _delete };
