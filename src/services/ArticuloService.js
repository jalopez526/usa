import { BaseApi } from "./BaseApi";

const saveUrl = "api/usa/articulos";
const articuloUrl = (id) => `api/usa/articulos/${id}`;
const despacharUrl = (id) => `api/usa/articulos/${id}/despachar`;
const getAllUrl = "api/usa/articulos";
const getArticuloMarcaModeloByArticuloUrl = (id) =>
  `api/usa/articulos/${id}/marcaModelos`;
const getArticulosInDespachoUrl = "api/usa/articulos/despachando";
const removeArticulosInDespachoUrl = (id) =>
  `api/usa/articulos/despachando/${id}`;

const save = (request) =>
  BaseApi.post(saveUrl, request).then((response) => response.data);

const updateArticoForDespacho = (request) =>
  BaseApi.post(despacharUrl(request)).then((response) => response.data);

const update = (id, request) =>
  BaseApi.put(articuloUrl(id), request).then((response) => response.data);

const remove = (id, request) =>
  BaseApi.delete(articuloUrl(id), request).then((response) => response.data);

const getById = (request) =>
  BaseApi.get(articuloUrl(request)).then((response) => response.data);

const getArticuloMarcaModeloByArticulo = (request) =>
  BaseApi.get(getArticuloMarcaModeloByArticuloUrl(request)).then(
    (response) => response.data
  );

const getArticulosInDespacho = () =>
  BaseApi.get(getArticulosInDespachoUrl, {}).then((response) => response.data);

const removeArticulosInDespacho = (id, request) =>
  BaseApi.put(removeArticulosInDespachoUrl(id), request).then(
    (response) => response.data
  );

const getAll = () =>
  BaseApi.get(getAllUrl, {}).then((response) => response.data);

const getAllByParams = (config) =>
  BaseApi.get(getAllUrl, {}, config).then((response) => response.data);

export default {
  save,
  updateArticoForDespacho,
  update,
  remove,
  removeArticulosInDespacho,
  getById,
  getArticuloMarcaModeloByArticulo,
  getAll,
  getAllByParams,
  getArticulosInDespacho,
};
