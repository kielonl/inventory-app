import type HTTPMethod from "../types";
import axios from "axios";

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const apiUrl = "https://pokeapi.co/api/v2";

const callApi = async (
  HTTPMethod: HTTPMethod,
  url: string
): { [key: string]: any } => {
  let result = [];
  await axios({
    method: HTTPMethod,
    url: `${apiUrl}${url}`,
  }).then((response) => {
    result = response;
  });
  return { result };
};

export { callApi };
