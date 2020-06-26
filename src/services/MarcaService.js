import { BaseApi } from "./BaseApi";

const getMarcasUrl = "api/usa/marcas";
const getModelosByMarcaUrl = (id) => `api/usa/marcas/${id}/modelos`;

const getMarcas = (request) =>
  BaseApi.get(getMarcasUrl, request).then((response) => response.data);

const getModelosByMarca = (request) =>
  BaseApi.get(getModelosByMarcaUrl(request)).then((response) => response.data);
export default {
  getMarcas,
  getModelosByMarca,
};
