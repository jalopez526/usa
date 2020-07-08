import React, { useState, useEffect, Fragment } from "react";
import {
  Card,
  Alert,
  Table,
  Accordion,
  useAccordionToggle,
} from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import DespachoService from "../../services/DespachoService";
import OptionButton from "../../App/components/OptionButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Documento from "../impresion/documento/";

const DespachoDetalle = React.lazy(() => import("../lazy/DespachoDetalle"));

const DespachosRealizados = () => {
  const [despachos, setDespachos] = useState([]);

  useEffect(() => {
    const fetchDespachos = async () => {
      const data = await DespachoService.getDespachos();
      if (data.problem) {
        console.log("There was an error fetching despachos");
        return;
      } else if (data.respuesta.codigo !== "0") {
        setDespachos([]);
        return;
      }

      const despachos = data.despachos.map((despacho) => {
        return {
          ...despacho,
          hidden: true,
        };
      });

      setDespachos(despachos);
    };

    fetchDespachos();
  }, []);

  return (
    <Aux>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Articulos despachados</Card.Title>
        </Card.Header>
        <Card.Body>
          {despachos && despachos.length > 0 && (
            <Accordion>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Usuario que despachó</th>
                    <th>Fecha del despacho</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {despachos.map((despacho, index) => (
                    <Despacho
                      key={despacho.id}
                      despacho={despacho}
                      setDespachos={setDespachos}
                      eventKey={index}
                    />
                  ))}
                </tbody>
              </Table>
            </Accordion>
          )}
          {(!despachos || despachos.length === 0) && (
            <Alert variant="warning">
              No existen despachos que se hayan realizado
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Aux>
  );
};

const Despacho = ({ despacho, eventKey, setDespachos }) => {
  const toggleAccordion = useAccordionToggle(eventKey, () =>
    setDespachos((prevDespachos) => {
      let despachos = prevDespachos;
      despachos = despachos.map((a, index) => {
        if (index === eventKey) return a;

        return {
          ...a,
          hidden: true,
        };
      });

      despachos[eventKey].hidden = !despachos[eventKey].hidden;
      return despachos;
    })
  );

  let date;
  try {
    date = despacho.fechaCreacion.split("T")[0];
  } catch (e) {
    date = despacho.fechaCreacion;
  }

  return (
    <Fragment>
      <tr>
        <td onClick={toggleAccordion}>{despacho.id}</td>
        <td onClick={toggleAccordion}>{despacho.usuario.usuario}</td>
        <td onClick={toggleAccordion}>{date}</td>
        <td>
          <PDFDownloadLink
            document={
              <Documento despachoDetalles={despacho.despachoDetalles} />
            }
            fileName="factura.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Cargando documento"
              ) : (
                <OptionButton variant="info" icon="icon-download" />
              )
            }
          </PDFDownloadLink>
        </td>
      </tr>
      <tr hidden={despacho.hidden}>
        <td colSpan="3">
          <Accordion.Collapse eventKey={eventKey}>
            <DespachoDetalle
              key={despacho.id}
              eventKey={eventKey}
              setDespachos={setDespachos}
              despachoDetalles={despacho.despachoDetalles}
            />
          </Accordion.Collapse>
        </td>
      </tr>
    </Fragment>
  );
};

export default DespachosRealizados;
