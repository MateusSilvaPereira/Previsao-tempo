import axios from "axios";
import { IResponseError } from ".";
import { EnumConfig } from "./Enums";

// Constantes for headers
const CONTENT_TYPE = "Content-type";
const JSON_CONTENT = "aplication/json";

const instance = axios.create({
  headers: {
    [CONTENT_TYPE]: JSON_CONTENT,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  responseType: "json",
  timeout: EnumConfig.REQUEST_TIMEOUT_INTERVAL,
});

instance.defaults.headers.common[CONTENT_TYPE] = JSON_CONTENT;

// Response interceptor to handle response and errors
instance.interceptors.response.use(
  (response) => response.data,
  (error) => formatError(error)
);

// Format errors
const formatError = (error: any): IResponseError => {
  const defaultMessage = "Ocorreu um erro";
  const defaultErrorStr = error.message;

  let errorData: IResponseError = {
    errors: [],
    message: defaultMessage,
    status: 0,
    timestamp: new Date(),
  };

  let message = error.message;
  let errorStr = defaultErrorStr;

  if (message.includes("Network Error")) {
    message = "Erro ao acessar o servidor";
    errorStr = "Não foi possível acessar o servidor da aplicação.";
  }
  errorData.message = message;
  errorData.errors?.push(errorStr);

  return errorData;
};

export default instance;
