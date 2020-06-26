import { create } from "apisauce";
import ResponseCode from "./ResponseCode";

/**
 * This is a service that connects to a API.
 */
const BaseApi = create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: parseInt(process.env.REACT_APP_TIME_OUT, 10),
});

/**
 * Transformando el response para poner los errores generales
 *
 * @param response
 */
function transformResponse(response) {
  if (process.env.REACT_APP_DEBUG_MODE) console.log(response);

  if (response.ok) {
    return;
  }
  if (ResponseCode[response.problem]) {
    response.data = {
      problem: ResponseCode[response.problem],
    };
    return;
  }
  response.data = {
    problem: ResponseCode.CONNECTION_ERROR,
  };
}

// Para probar, impirmir todos los request y response que se llamen
if (process.env.REACT_APP_DEBUG_MODE)
  BaseApi.addRequestTransform((request) => console.log(request));

// Transformando el response para poner los errores generales
BaseApi.addResponseTransform((response) => transformResponse(response));

export { BaseApi };
