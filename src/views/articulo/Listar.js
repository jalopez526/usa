import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Collapse,
  Accordion,
  useAccordionToggle,
  Alert,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ArticuloService from "../../services/ArticuloService";
import Aux from "../../hoc/_Aux";
import { useForm } from "react-hook-form";
import { parseToMoney } from "../../utils/AppUtils";
import Field from "../../App/components/Form/Field";
import MarcaService from "../../services/MarcaService";
import TipoService from "../../services/TipoService";
import OptionButton from "../../App/components/OptionButton";
import { hasPermissions } from "../../utils/RolePermisssions";
import deviceStorage from "../../utils/Storage";

const ArticuloMarcaModelo = React.lazy(() =>
  import("../lazy/ArticuloMarcaModelo")
);
const ListarArticulo = () => {
  const [articulos, setArticulos] = useState([]);
  const [articuloId, setArticuloId] = useState(null);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    async function fetchArticulos() {
      const data = await ArticuloService.getAll();
      const roles = await deviceStorage.getItem("roles");
      if (data.problem) {
        console.log("There was an error fetching articulos");
        return;
      } else if (data.respuesta.codigo !== "0") {
        setArticulos([]);
      } else {
        const articulos = data.articulos.map((articulo) => {
          return {
            ...articulo,
            hidden: true,
          };
        });
        setArticulos(articulos);
        setRoles(roles);
      }
    }

    fetchArticulos();
  }, []);

  const setArticuloForDespacho = async (id) => {
    const data = await ArticuloService.updateArticoForDespacho(id);
    if (data.problem) {
      return;
    }

    setArticulos((prevArticulos) =>
      [...prevArticulos].filter((a) => a.id !== id)
    );
    alert("El articulo fue agregado para despachar");
  };

  if (articuloId) {
    return <Redirect to={`/articulos/editar/${articuloId}`} />;
  }

  const deleteArticulo = async (id) => {
    const ok = window.confirm(`¿Desea eliminar el articulo #${id} `);
    if (ok) {
      const data = await ArticuloService.remove(id);
      if (data.codigo === "0") {
        setArticulos((prevArticulos) =>
          [...prevArticulos].filter((articulo) => articulo.id !== id)
        );
        alert("El articulo fue eliminado correctamente");
      }
    }
  };

  const Articulo = ({ articulo, eventKey, setArticulos }) => {
    const toggleAccordion = useAccordionToggle(eventKey, () => {
      setArticulos((prevArticulos) => {
        let articulos = prevArticulos;
        articulos = articulos.map((a, index) => {
          if (index === eventKey) return a;

          return {
            ...a,
            hidden: true,
          };
        });

        articulos[eventKey].hidden = !articulos[eventKey].hidden;
        return articulos;
      });
    });

    return (
      <Fragment>
        {roles && (
          <Fragment>
            <tr>
              <td onClick={toggleAccordion}>{articulo.id}</td>
              <td onClick={toggleAccordion}>{articulo.nombre}</td>
              <td onClick={toggleAccordion}>{articulo.tipo.descripcion}</td>
              <td onClick={toggleAccordion}>{articulo.codigo}</td>
              <td onClick={toggleAccordion}>{articulo.ubicacion}</td>
              <td onClick={toggleAccordion}>
                {parseToMoney(articulo.precioPorMayor)}
              </td>
              <td onClick={toggleAccordion}>
                {parseToMoney(articulo.precioDetalle)}
              </td>
              <td onClick={toggleAccordion}>
                {parseToMoney(articulo.precioAlterno)}
              </td>
              <td onClick={toggleAccordion}>
                {articulo.esNuevo ? "Si" : "No"}
              </td>
              <td>
                {hasPermissions(roles, "UPDATE_ARTICULO") && (
                  <OptionButton
                    variant="dark"
                    onClick={() => setArticuloId(articulo?.id)}
                    icon="icon-edit"
                  />
                )}

                {hasPermissions(roles, "DELETE_ARTICULO") && (
                  <OptionButton
                    variant="danger"
                    onClick={() => deleteArticulo(articulo.id)}
                    icon="icon-delete"
                  />
                )}
                <OptionButton
                  variant="success"
                  onClick={() => setArticuloForDespacho(articulo.id)}
                  icon="icon-shopping-cart"
                />
              </td>
            </tr>
            <tr hidden={articulo.hidden}>
              <td colSpan="10">
                <Accordion.Collapse eventKey={eventKey}>
                  <ArticuloMarcaModelo id={articulo.id} />
                </Accordion.Collapse>
              </td>
            </tr>
          </Fragment>
        )}
      </Fragment>
    );
  };

  return (
    <Aux>
      <Filtros setArticulos={setArticulos} />
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Articulos</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  {articulos.length > 0 ? (
                    <Accordion>
                      <Table responsive bordered hover>
                        <thead className="thead-dark">
                          <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Codigo</th>
                            <th>Ubicación</th>
                            <th>Precio (AM)</th>
                            <th>Precio (AD)</th>
                            <th>Precio (A)</th>
                            <th>¿Nuevo?</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {articulos.map((articulo, index) => (
                            <Articulo
                              key={articulo.id}
                              setArticulos={setArticulos}
                              articulo={articulo}
                              eventKey={index}
                            />
                          ))}
                        </tbody>
                      </Table>
                    </Accordion>
                  ) : (
                    <Alert variant="warning">
                      No se encontraron articulos registrados
                    </Alert>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

const Filtros = ({ setArticulos }) => {
  const [marcas, setMarcas] = useState([]);
  const [title, setTitle] = useState("Mostrar criterios de búsqueda");
  const [modelos, setModelos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [open, setOpen] = useState(false);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    let params = Object.assign({}, values);
    Object.keys(params).forEach(
      (key) =>
        (params[key] === null || params[key] === "") && delete params[key]
    );

    const config = {
      params,
    };

    const data = await ArticuloService.getAllByParams(config);
    if (data.problem) {
      setArticulos([]);
      throw new Error("Ha ocurrido un error inesperado");
    }

    if (data.respuesta.codigo !== "0") {
      alert(data.respuesta.descripcion);
      return;
    }

    const articulos = data.articulos.map((a) => {
      return {
        ...a,
        hidden: true,
      };
    });
    setArticulos(articulos);
  };

  useEffect(() => {
    if (open) {
      setTitle("Ocultar criterios de búsqueda");
    } else {
      setTitle("Mostrar criterios de búsqueda");
    }
  }, [open]);

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

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Card.Title as="h5">
              <Button onClick={() => setOpen(!open)} variant="outline-primary">
                {title}
              </Button>
            </Card.Title>
          </Card.Header>
          <Collapse in={open}>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Field
                      noValidate
                      name="nombre"
                      label="Nombre"
                      type="text"
                      register={register}
                    />
                  </Col>
                  <Col>
                    <Field
                      noValidate
                      name="tipo"
                      label="Tipos"
                      type="select"
                      options={tipos}
                      register={register}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      noValidate
                      name="marca"
                      label="Marcas"
                      type="select"
                      onChange={getModelosOnChange}
                      options={marcas}
                      register={register}
                    />
                  </Col>
                  <Col>
                    <Field
                      noValidate
                      name="modelo"
                      label="Modelos"
                      type="select"
                      options={modelos}
                      register={register}
                    />
                  </Col>
                  <Col>
                    <Field
                      noValidate
                      name="anio"
                      label="Año"
                      type="text"
                      register={register}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
};

export default ListarArticulo;
