import React, { useEffect, useState } from "react";
import ArticuloService from "../../services/ArticuloService";
import { Table } from "react-bootstrap";

const ArticuloMarcaModelo = ({ id }) => {
  const [articuloMarcaModelos, setArticuloMarcaModelos] = useState([]);

  useEffect(() => {
    const fetchArticuloMarcaModelo = async (id) => {
      const data = await ArticuloService.getArticuloMarcaModeloByArticulo(id);
      if (data.problem) {
        return;
      }

      setArticuloMarcaModelos(data.articuloMarcaModelos);
    };
    fetchArticuloMarcaModelo(id);
  }, [id]);
  return (
    <Table>
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Año</th>
        </tr>
      </thead>
      <tbody>
        {articuloMarcaModelos &&
          articuloMarcaModelos.map((a) => (
            <tr key={a.id}>
              <td>{a.marca.descripcion}</td>
              <td>{a.modelo.descripcion}</td>
              <td>{a.anio}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ArticuloMarcaModelo;
