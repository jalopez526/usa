import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

const Field = ({
  onChange,
  selected,
  register,
  errors,
  name,
  type,
  options,
  label,
  validations,
  noValidate,
  className,
  skipDefault,
}) => {
  let currentValidations;
  if (typeof validations === "object" && !isEmpty(validations)) {
    currentValidations = validations;
  } else {
    if (noValidate) {
      currentValidations = {};
    } else {
      currentValidations = {
        required: "Requerido",
      };
    }
  }

  return (
    <Form.Group controlId={name.toLowerCase()}>
      {label && <Form.Label>{label}</Form.Label>}
      {type === "select" ? (
        <Select
          skipLabel
          className={className}
          validations={currentValidations}
          selected={selected}
          onChange={onChange}
          register={register}
          errors={errors}
          name={name}
          options={options}
          skipDefault={skipDefault}
        />
      ) : (
        <Input
          validations={currentValidations}
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

const Input = ({ register, errors, type, name, label, validations }) => {
  if (!isFunction(register)) return null;

  return (
    <Fragment>
      <Form.Control
        type={type}
        name={name}
        placeholder={label}
        ref={!isEmpty(validations) ? register(validations) : register}
      />
      {errors && <Error error={errors.message} />}
    </Fragment>
  );
};

const Select = ({
  className,
  onChange,
  register,
  errors,
  name,
  options,
  validations,
  skipDefault,
}) => {
  if (!isFunction(register)) return null;

  return (
    <Fragment>
      <Form.Control
        name={name}
        className={className}
        onChange={onChange}
        as="select"
        ref={!isEmpty(validations) ? register(validations) : register}
      >
        {!skipDefault && <option value="">Seleccione</option>}
        {options &&
          options.map((option) => {
            return (
              <option value={option.id} key={option.id}>
                {option.descripcion}
              </option>
            );
          })}
      </Form.Control>
      {errors && <Error error={errors.message} />}
    </Fragment>
  );
};

const Error = ({ error }) => {
  return <span className="color-red">{error}</span>;
};

const isEmpty = (objectToCheck) => {
  return Object.entries(objectToCheck).length === 0;
};

const isFunction = (functionToCheck) => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
};

export default Field;
