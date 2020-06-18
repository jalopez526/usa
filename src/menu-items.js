import config from "./config";

export default {
  items: [
    {
      id: "home",
      title: "Inicio",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "home",
          title: "Inicio",
          type: "item",
          url: "/",
          icon: "feather icon-home",
        },
      ],
    },
    {
      id: "mantenimientos",
      title: "Mantenimientos",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "articulos",
          title: "Articulos",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "listado-articulos",
              title: "Listado de Articulos",
              type: "item",
              url: "/articulos/listar",
            },
            {
              id: "agregar-articulo",
              title: "Agregar Articulo",
              type: "item",
              url: "/articulos/agregar",
            },
          ],
        },
      ],
    },
  ],
};
