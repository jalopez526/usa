import React from "react";
import { Table } from "react-bootstrap";
import { parseToMoney } from "../../utils/AppUtils";

const DespachoDetalle = ({ despachoDetalles }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Codigo</th>
          <th>Ubicación</th>
          <th>Precio (AM)</th>
          <th>Precio (AD)</th>
          <th>Precio (A)</th>
          <th>¿Nuevo?</th>
        </tr>
      </thead>
      <tbody>
        {despachoDetalles &&
          despachoDetalles.map((a) => (
            <tr key={a.articulo.id}>
              <td>{a.articulo.nombre}</td>
              <td>{a.articulo.tipo.descripcion}</td>
              <td>{a.articulo.codigo}</td>
              <td>{a.articulo.ubicacion}</td>
              <td>{parseToMoney(a.articulo.precioPorMayor)}</td>
              <td>{parseToMoney(a.articulo.precioDetalle)}</td>
              <td>{parseToMoney(a.articulo.precioAlterno)}</td>
              <td>{a.articulo.esNuevo ? "Si" : "No"}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default DespachoDetalle;
