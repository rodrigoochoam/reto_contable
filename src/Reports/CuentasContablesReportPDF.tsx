import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CuentaContable } from "../types/movimiento";

interface CuentasContablesReportPDFProps {
  cuentasContables: CuentaContable[];
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  table: {
    display: "flex",
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

const CuentasContablesReportPDF: React.FC<CuentasContablesReportPDFProps> = ({
  cuentasContables,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Cuentas Contables</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ID</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Saldo Debe</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Saldo Haber</Text>
          </View>
        </View>
        {cuentasContables.map((cuenta) => (
          <View style={styles.tableRow} key={cuenta.id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{cuenta.id}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{cuenta.nombre}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${Intl.NumberFormat("en-US").format(cuenta.saldoDebe)}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${Intl.NumberFormat("en-US").format(cuenta.saldoHaber)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CuentasContablesReportPDF;
