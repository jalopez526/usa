import React from "react";
const { Redirect } = require("react-router-dom");

const RedirectUtils = () => {
  return (
    <Redirect
      to={{
        pathname: "/articulos",
      }}
    />
  );
};

export default RedirectUtils;
