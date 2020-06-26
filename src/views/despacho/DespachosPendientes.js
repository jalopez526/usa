import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Table, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ArticuloService from "../../services/ArticuloService";
import Aux from "../../hoc/_Aux";
import Field from "../../App/components/Form/Field";
import DespachoService from "../../services/DespachoService";
import RedirectUtils from "../../utils/RedirectUtils";

// import { parseToMoney } from "../../utils/AppUtils";

const DespachosPendientes = () => {
  const [despachos, setDespachos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { handleSubmit, register, setValue, getValues } = useForm();

  const onSubmit = async (values) => {
    const articulos = values.articulo;
    const despachoArticulos = articulos
      .filter((s) => s.selected)
      .map((s) => {
        return {
          id: s.id,
          cantidad: s.cantidadDespachar,
        };
      });
    if (despachoArticulos.length > 0) {
      const ok = window.confirm(
        "¿Seguro que desea despachar los articulos seleccionados?"
      );
      if (ok) {
        const data = await DespachoService.postDespachos(despachoArticulos);
        if (data.problem) return;
        setRedirect(true);

        alert("Articulos despachados correctamente");
      }
    }
  };

  useEffect(() => {
    const fetchDespachos = async () => {
      const data = await ArticuloService.getArticulosInDespacho();
      if (data.problem) {
        return;
      }

      setDespachos(data.articuloDespachos);
    };

    fetchDespachos();
  }, []);

  if (redirect) {
    return <RedirectUtils />;
  }

  return (
    <Aux>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Articulos listos para despachar</Card.Title>
        </Card.Header>
        <Card.Body>
          {despachos && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Articulo</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {despachos.map((despacho, index) => (
                    <Despacho
                      key={despacho?.articulo?.id}
                      idArticulo={despacho?.articulo?.id}
                      index={index}
                      despacho={despacho}
                      setDespachos={setDespachos}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4"></td>
                    <td>
                      <Button variant="success" type="submit">
                        Despachar
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Form>
          )}
          {!despachos && (
            <Alert variant="warning">No existen articulos para despachar</Alert>
          )}
        </Card.Body>
      </Card>
    </Aux>
  );
};

const Despacho = ({
  idArticulo,
  despacho,
  index,
  setDespachos,
  register,
  setValue,
  getValues,
}) => {
  const articulo = despacho?.articulo;
  const elements = [];
  for (let i = 1; i <= despacho?.cantidad; i++) {
    elements.push({ id: i, descripcion: i });
  }

  const removeFromDespachos = async (id) => {
    const ok = window.confirm("¿Seguro que desea remover el articulo?");
    if (ok) {
      const data = await ArticuloService.removeArticulosInDespacho(id);
      if (data.problem) {
        return;
      }
    }

    setDespachos((prevDespachos) =>
      [...prevDespachos].filter((d) => d.articulo.id !== id)
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setValue(`articulo[${index}].id`, idArticulo);
    });
  });

  const fieldName = `articulo[${index}]`;

  return (
    <tr>
      <td
        onClick={() => {
          const currentValue = getValues(`articulo[${index}].selected`);
          setValue(`articulo[${index}].selected`, !currentValue);
        }}
      >
        <Form.Group>
          <Form.Check
            label=""
            name={`${fieldName}.selected`}
            type="checkbox"
            ref={register}
          />
        </Form.Group>
      </td>
      <td>{articulo?.nombre}</td>
      <td>{articulo?.tipo?.descripcion}</td>
      <td hidden>
        <Form.Control type="number" name={`${fieldName}.id`} ref={register} />
      </td>
      <td>
        <Field
          skipDefault
          noValidate
          name={`${fieldName}.cantidadDespachar`}
          type="select"
          className="select-despachos"
          options={elements}
          register={register}
        />
      </td>
      <td>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => removeFromDespachos(articulo?.id)}
        >
          <i className="i-no-margin no-hover btn-font-size feather icon-trash-2"></i>
        </Button>
      </td>
    </tr>
  );
};

export default DespachosPendientes;
