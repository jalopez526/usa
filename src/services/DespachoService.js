import { BaseApi } from "./BaseApi";

const getDespachosUrl = "api/usa/despachos";

const postDespachos = (request) =>
  BaseApi.post(getDespachosUrl, request).then((response) => response.data);
const getDespachos = (request) =>
  BaseApi.get(getDespachosUrl, request).then((response) => response.data);

export default {
  postDespachos,
  getDespachos,
};
