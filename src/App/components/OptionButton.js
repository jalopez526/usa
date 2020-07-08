import React from "react";
import { Button } from "react-bootstrap";

const OptionButton = ({ onClick, variant, icon }) => {
  return (
    <Button size="sm" variant={`outline-${variant}`} onClick={onClick}>
      <i className={`i-no-margin btn-font-size no-hover feather ${icon}`} />
    </Button>
  );
};

export default OptionButton;
