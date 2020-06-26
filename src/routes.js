import React from "react";
// import $ from "jquery";

// window.jQuery = $;
// window.$ = $;
// global.jQuery = $;

const AgregarArticulos = React.lazy(() => import("./views/articulo/Agregar"));
const ListarArticulos = React.lazy(() => import("./views/articulo/Listar"));
const EditarArticulos = React.lazy(() => import("./views/articulo/Editar"));
const DespachosPendientes = React.lazy(() =>
  import("./views/despacho/DespachosPendientes")
);
const DespachosRealizados = React.lazy(() =>
  import("./views/despacho/DespachosRealizados")
);
const Home = React.lazy(() => import("./views/home/Home"));

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/articulos/agregar",
    exact: true,
    name: "Agregar Articulos",
    component: AgregarArticulos,
  },
  {
    path: "/articulos",
    exact: true,
    name: "Listar Articulos",
    component: ListarArticulos,
  },
  {
    path: "/articulos/editar/:id",
    exact: true,
    name: "Editar Articulos",
    component: EditarArticulos,
  },
  {
    path: "/despachos/despachos-pendientes",
    exact: true,
    name: "Despachos pendientes",
    component: DespachosPendientes,
  },
  {
    path: "/despachos/despachos-realizados",
    exact: true,
    name: "Despachos realizados",
    component: DespachosRealizados,
  },
];

export default routes;
