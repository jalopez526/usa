import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const SpinnerLoader = () => {
  useEffect(() => {
    document.body.classList.add("opacity");

    return () => {
      document.body.classList.remove("opacity");
    };
  }, []);
  return <Spinner animation="grow" />;
};

export default SpinnerLoader;
