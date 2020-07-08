import React from "react";

const Login = React.lazy(() => import("../views/login"));

const route = [
  { path: "/login", exact: true, name: "Login", component: Login },
];

export default route;
