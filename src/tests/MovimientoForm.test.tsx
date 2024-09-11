import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovimientoForm from "../components/Movimientos/MovimientoForm";

describe("MovimientoForm", () => {
  test("renders form fields", () => {
    render(
      <MovimientoForm
        onMovimientosAdded={() => {}}
        onMovimientosUpdated={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByLabelText(/Póliza/i)).toBeInTheDocument();
    expect(screen.getByText(/Cuenta Contable/i)).toBeInTheDocument();
    expect(screen.getByText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByText(/Cargo/i)).toBeInTheDocument();
    expect(screen.getByText(/Abono/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Agregar Movimientos/i })
    ).toBeInTheDocument();
  });
});
