import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Movimiento } from "../types/movimiento";
import { Poliza } from "../types/poliza";

interface MovimientosReportPDFProps {
  polizas: Poliza[];
  movimientos: Movimiento[];
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  polizaTitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

const MovimientosReportPDF: React.FC<MovimientosReportPDFProps> = ({
  polizas,
  movimientos,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Movimientos por Póliza</Text>
      {polizas.map((poliza) => (
        <View key={poliza.id}>
          <Text style={styles.polizaTitle}>Póliza: {poliza.numeropoliza}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Fecha</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Cuenta Contable</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Cargo</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Abono</Text>
              </View>
            </View>
            {movimientos
              .filter((m) => m.polizaId === poliza.id)
              .map((movimiento) => (
                <View style={styles.tableRow} key={movimiento.id}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{movimiento.fecha}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {movimiento.cuentaContable}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{movimiento.cargo}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{movimiento.abono}</Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default MovimientosReportPDF;
