export default {
  items: [
    {
      id: "despachos",
      title: "Despachos",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "despachos",
          title: "Despachos",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "despachos-pendientes",
              title: "Despachos pendientes",
              type: "item",
              url: "/despachos/despachos-pendientes",
            },
            {
              id: "despachos-realizados",
              title: "Despachos realizados",
              type: "item",
              url: "/despachos/despachos-realizados",
            },
          ],
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
              url: "/articulos",
            },
            {
              id: "agregar-articulo",
              role: "read_articulos",
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
