import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

const Field = ({ register, errors, name, type, options, label }) => {
  return (
    <Form.Group controlId={name.toLowerCase()}>
      {label && <Form.Label>{label}</Form.Label>}
      {type === "select" ? (
        <Select
          skipLabel
          register={register}
          errors={errors}
          name={name}
          options={options}
        />
      ) : (
        <Input
          register={register}
          errors={errors}
          label={label}
          type={type}
          name={name}
        />
      )}
    </Form.Group>
  );
};

const Input = ({ register, errors, type, name, label, validationMessage }) => {
  if (!isFunction(register)) return null;

  return (
    <Fragment>
      <Form.Control
        type={type}
        name={name}
        placeholder={label}
        ref={register({
          required: validationMessage || "Requerido",
        })}
      />
      {errors && <Error error={errors.message} />}
    </Fragment>
  );
};

const Select = ({ register, errors, name, options, validationMessage }) => {
  if (!isFunction(register)) return null;

  return (
    <Fragment>
      <Form.Control
        name={name}
        as="select"
        ref={register({
          required: validationMessage || "Requerido",
        })}
      >
        {options &&
          options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
      </Form.Control>
      {errors && <Error error={errors.message} />}
    </Fragment>
  );
};

const Error = ({ error }) => {
  return <span className="color-red">{error}</span>;
};

const isFunction = (functionToCheck) => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
};

export default Field;
