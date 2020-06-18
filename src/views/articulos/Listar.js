import React, { useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

import Aux from "../../hoc/_Aux";

const ListarArticulo = () => {
  const [articulos, setArticulos] = useState([
    {
      nombre: "Filtro",
      tipo: "Camion",
      codigo: "RD15799",
      ubicacion: "Tramo 1",
      precioAlPorMayor: 5170,
      precioAlDetalle: 5100,
      precioAlterno: 1000,
      cantidad: 5,
    },
    {
      nombre: "Filtro",
      tipo: "Camion",
      codigo: "RD15799",
      ubicacion: "Tramo 1",
      precioAlPorMayor: 5170,
      precioAlDetalle: 5100,
      precioAlterno: 1000,
      cantidad: 5,
    },
    {
      nombre: "Filtro",
      tipo: "Camion",
      codigo: "RD15799",
      ubicacion: "Tramo 1",
      precioAlPorMayor: 5170,
      precioAlDetalle: 5100,
      precioAlterno: 1000,
      cantidad: 5,
    },
    {
      nombre: "Filtro",
      tipo: "Camion",
      codigo: "RD15799",
      ubicacion: "Tramo 1",
      precioAlPorMayor: 5170,
      precioAlDetalle: 5100,
      precioAlterno: 1000,
      cantidad: 5,
    },
  ]);

  const Articulo = ({ articulo }) => {
    return (
      <tr>
        <td>{articulo.nombre}</td>
        <td>{articulo.tipo}</td>
        <td>{articulo.codigo}</td>
        <td>{articulo.ubicacion}</td>
        <td>{articulo.precioAlPorMayor}</td>
        <td>{articulo.precioAlDetalle}</td>
        <td>{articulo.precioAlterno}</td>
        <td>{articulo.cantidad}</td>
      </tr>
    );
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Articulos</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Table responsive bordered hover>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Codigo</th>
                        <th>Ubicación</th>
                        <th>Precio (APM)</th>
                        <th>Precio (AD)</th>
                        <th>Precio (A)</th>
                        <th>Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articulos.map((articulo, index) => (
                        <Articulo key={index} articulo={articulo} />
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default ListarArticulo;
