import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Aux from "../../hoc/_Aux";
import Field from "../../App/components/Form/Field";

const AddArticulo = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values);
  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);

  const addMarcaModelo = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeMarcaModelo = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Información del artículo</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Field
                      name="nombre"
                      label="Nombre"
                      type="text"
                      register={register}
                      errors={errors.nombre}
                    />
                  </Col>
                  <Col>
                    <Field
                      name="tipo"
                      label="Tipo"
                      type="select"
                      options={["", "Camion", "Carro", "Jeepeta"]}
                      register={register}
                      errors={errors.tipo}
                    />
                  </Col>
                  <Col>
                    <Field
                      label="Código"
                      name="codigo"
                      type="text"
                      register={register}
                      errors={errors.codigo}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      label="Ubicación"
                      name="ubicacion"
                      type="text"
                      register={register}
                      errors={errors.ubicacion}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      label="Precio al por mayor"
                      name="precioAlPorMayor"
                      type="number"
                      register={register}
                      errors={errors.precioAlPorMayor}
                    />
                  </Col>
                  <Col>
                    <Field
                      label="Precio al detalle"
                      name="precioAlDetalle"
                      type="number"
                      register={register}
                      errors={errors.precioAlDetalle}
                    />
                  </Col>
                  <Col>
                    <Field
                      label="Precio alterno"
                      name="precioAlterno"
                      type="number"
                      register={register}
                      errors={errors.precioAlterno}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Check
                        custom
                        name="esNuevo"
                        type="checkbox"
                        id="esNuevo"
                        label="¿El artículo es nuevo?"
                        ref={register}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <h5 className="mt-2">Marcas y modelos compatibles</h5>
                <Row>
                  <Col>
                    <OverlayTrigger
                      key="right"
                      placement="right"
                      overlay={
                        <Tooltip id="add-help">
                          Agregar otras marcas y modelos
                        </Tooltip>
                      }
                    >
                      <Button
                        onClick={addMarcaModelo}
                        variant="outline-primary"
                        size="sm"
                        style={{ borderRadius: "50%", fontSize: "17px" }}
                      >
                        +
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Table responsive bordered hover>
                      <thead>
                        <tr>
                          <th>Marca</th>
                          <th>Modelo</th>
                          <th>Año</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indexes.map((index) => {
                          const fieldName = `marcaModelo[${index}]`;
                          const onMarcaChange = () => {};
                          return (
                            <tr key={index}>
                              <td>
                                <Field
                                  skipLabel
                                  isDynamic={`${fieldName}.marca`}
                                  name={`${fieldName}.marca`}
                                  type="select"
                                  options={["", "Kia", "Hyndai", "Toyota"]}
                                  register={register}
                                  errors={
                                    errors.marcaModelo &&
                                    errors.marcaModelo[index] &&
                                    errors.marcaModelo[index].marca
                                  }
                                />
                              </td>
                              <td>
                                <Field
                                  skipLabel
                                  isDynamic={fieldName}
                                  name={`${fieldName}.modelo`}
                                  type="select"
                                  options={["", "K5", "K7"]}
                                  register={register}
                                  errors={
                                    errors.marcaModelo &&
                                    errors.marcaModelo[index] &&
                                    errors.marcaModelo[index].modelo
                                  }
                                />
                              </td>
                              <td>
                                <Field
                                  skipLabel
                                  isDynamic={`${fieldName}.anio`}
                                  name={`${fieldName}.anio`}
                                  type="select"
                                  options={[
                                    "",
                                    "1996-2000",
                                    "2000-2004",
                                    "2004-2008",
                                  ]}
                                  register={register}
                                  errors={
                                    errors.marcaModelo &&
                                    errors.marcaModelo[index] &&
                                    errors.marcaModelo[index].anio
                                  }
                                />
                              </td>
                              <td>
                                <i
                                  onClick={removeMarcaModelo(index)}
                                  className="feather icon-trash-2"
                                  style={{ fontSize: "17px" }}
                                ></i>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      Guardar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};
export default AddArticulo;
