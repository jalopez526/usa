import { BaseApi } from "./BaseApi";

const getAllUrl = "api/usa/tipos";

const getAll = (request) =>
  BaseApi.get(getAllUrl, request).then((response) => response.data);

export default {
  getAll,
};
