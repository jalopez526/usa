import React from "react";
// import $ from "jquery";

// window.jQuery = $;
// window.$ = $;
// global.jQuery = $;

const AgregarArticulos = React.lazy(() => import("./views/articulos/Agregar"));
const ListarArticulos = React.lazy(() => import("./views/articulos/Listar"));
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
    path: "/articulos/listar",
    exact: true,
    name: "Listar Articulos",
    component: ListarArticulos,
  },
];

export default routes;
