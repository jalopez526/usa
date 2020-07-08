import React, { useState, useEffect } from "react";
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
import MarcaService from "../../services/MarcaService";
import ArticuloService from "../../services/ArticuloService";
import TipoService from "../../services/TipoService";
import { Redirect } from "react-router-dom";

const AddArticulo = () => {
  const { handleSubmit, register, errors } = useForm();
  const [marcaModelos, setMarcaModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (values) => {
    const cantidad = values.cantidad;
    delete values.cantidad;
    const articulo = {
      articulo: {
        ...values,
      },
      cantidad: cantidad,
    };

    const data = await ArticuloService.save(articulo);
    if (data.problem) {
      console.log("There was a error saving articulo");
      return;
    }

    alert("Se ha almacenado el articulo satisfactoriamente");
    setRedirect(true);
  };

  const addMarcaModelo = () => {
    setMarcaModelos((prevMarcaModelo) => [...prevMarcaModelo, {}]);
  };

  const removeMarcaModelo = (index) => () => {
    setMarcaModelos((prevMarcaModelo) => [
      ...prevMarcaModelo.filter((item, currentIndex) => currentIndex !== index),
    ]);
  };

  useEffect(() => {
    async function fetchMarcas() {
      const data = await MarcaService.getMarcas();
      if (data.problem) {
        console.log("There was a error fetching marcas");
        return;
      }
      setMarcas(data.marcas);
    }

    async function fetchTipos() {
      const data = await TipoService.getAll();
      if (data.problem) {
        console.log("There was a error fetching marcas");
        return;
      }
      setTipos(data.tipos);
    }

    fetchTipos();
    fetchMarcas();
  }, []);

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/articulos",
        }}
      />
    );
  }

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
                      options={tipos}
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
                      label="Precio al por mayor"
                      name="precioPorMayor"
                      type="number"
                      register={register}
                      errors={errors.precioPorMayor}
                    />
                  </Col>
                  <Col>
                    <Field
                      label="Precio al detalle"
                      name="precioDetalle"
                      type="number"
                      register={register}
                      errors={errors.precioDetalle}
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
                  <Col xs={12} md={6}>
                    <Field
                      label="Ubicación"
                      name="ubicacion"
                      type="text"
                      register={register}
                      errors={errors.ubicacion}
                    />
                  </Col>
                  <Col>
                    <Field
                      label="Cantidad"
                      name="cantidad"
                      type="number"
                      register={register}
                      errors={errors.cantidad}
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
                        className="btn-plus-or-minus"
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
                        {marcas.length > 0 &&
                          marcaModelos.map((marcaModelo, index) => {
                            return (
                              <MarcaModeloAnioComponent
                                key={index}
                                index={index}
                                marcas={marcas}
                                marcaModelo={marcaModelo}
                                removeMarcaModelo={removeMarcaModelo}
                                register={register}
                                errors={errors}
                              />
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

const MarcaModeloAnioComponent = ({
  marcaModelo,
  index,
  marcas,
  removeMarcaModelo,
  register,
  errors,
}) => {
  const [modelos, setModelos] = useState();

  const getModelosOnChange = (e) => {
    const currentMarcas = marcas.find((f) => {
      return f.id === Number(e.target.value);
    });

    if (currentMarcas) {
      setModelos(currentMarcas.modelos);
      return;
    } else {
      setModelos([]);
    }
  };

  useEffect(() => {
    setModelos(marcaModelo?.marca?.modelos);
  }, [marcaModelo]);

  const fieldName = `marcaModelo[${index}]`;
  return (
    <tr>
      <td>
        <Field
          skipLabel
          onChange={getModelosOnChange}
          isDynamic={`${fieldName}.marca`}
          name={`${fieldName}.marca`}
          type="select"
          options={marcas}
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
          options={modelos}
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
          type="text"
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
          className="remove-icon feather icon-trash-2"
        ></i>
      </td>
    </tr>
  );
};

export default AddArticulo;
