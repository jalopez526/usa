import React from "react";
import { Document, Text, Page, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "25",
  },
  header: {
    padding: 8,
    backgroundColor: "#559EF9",
  },
  section: {
    margin: 8,
  },
  name: {
    fontSize: 16,
  },
  direction: {
    paddingTop: 10,
    fontSize: 10,
  },
  text: {
    paddingTop: 4,
    fontSize: 10,
  },
  phone: {
    paddingTop: 15,
    fontSize: 10,
  },
  headerWithBorder: {
    borderTop: 1,
    borderTopColor: "#559EF9",
    borderBottom: 1,
    borderBottomColor: "#559EF9",
    padding: 10,
  },
  table: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#559EF9",
  },
  tableHeader: {
    width: "50%",
    color: "white",
    fontSize: 12,
    padding: 6,
  },
  content: {
    marginTop: 10,
    flexDirection: "row",
  },
  contentText: {
    width: "50%",
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: "#559EF9",
  },
  textHeader: {
    fontSize: 10,
  },
  tableFooter: {
    paddingTop: 10,
    textAlign: "center",
    borderBottom: 4,
    borderBottomColor: "#559EF9",
  },
  footerText: {
    flexGrow: 1,
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: "#559EF9",
  },
  firmSection: {
    marginTop: 20,
    flexDirection: "row",
  },
  firmText: {
    fontSize: 10,
    flexGrow: 1,
  },
});

const Documento = ({ despachoDetalles }) => {
  const groupBy = (arr, prop, sub) => {
    const map = new Map(Array.from(arr, (obj) => [obj[prop][sub], []]));
    arr.forEach((obj) => map.get(obj[prop][sub]).push(obj));
    return Array.from(map.values());
  };

  const groupByNombre = groupBy(despachoDetalles, "articulo", "nombre");
  const articulos = groupByNombre.map((a) => {
    const ar = a[0];
    return {
      nombre: ar.articulo.nombre,
      cantidad: a.length,
    };
  });

  let date;
  try {
    date = new Date().toLocaleDateString().split("T")[0];
    console.log(date);
  } catch (e) {
    date = new Date();
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} />
        <View style={styles.section}>
          <Text style={styles.name}>JIMENEZ BAEZ AUTO AIRE</Text>
          <Text style={styles.direction}>
            CALLE 9 NO. 1, ESQ. WISTON CHURCHILL Ensache Paraiso
          </Text>
          <Text style={styles.text}>Rnc: 131220835</Text>
          <Text style={styles.phone}>Tel: 809-567-7025</Text>
          <Text style={styles.text}>Fecha Factura: {date}</Text>
        </View>
        {/* <View style={styles.headerWithBorder}>
        <Text style={styles.textHeader}>
          NOMBRE O RAZÓN SOCIAL: GENERICO : COD. CLTE.: CLIENTE
        </Text>
      </View> */}
        <View>
          <View style={styles.table}>
            <Text style={styles.tableHeader}>Descripcion</Text>
            <Text style={styles.tableHeader}>Cantidad</Text>
          </View>
          {articulos &&
            articulos.map((a) => {
              return (
                <View key={a.nombre} style={styles.content}>
                  <Text style={styles.contentText}>{a.nombre}</Text>
                  <Text style={styles.contentText}>{a.cantidad}</Text>
                </View>
              );
            })}

          <View style={styles.tableFooter}>
            <Text style={styles.footerText}>
              **** Última línea de productos(s) o servicio(s) facturado(s) ****
            </Text>
          </View>
          <View style={styles.firmSection}>
            <Text style={styles.firmText}>
              Firma ______________________________
            </Text>
            <Text style={styles.firmText}>
              Despachado ______________________________
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default Documento;
