import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import MovimientoForm from "../components/Movimientos/MovimientoForm";
import { getPolizas } from "../lib/api/polizasApi";
import { getCuentasContables } from "../lib/api/movimientosApi";
import { jest } from "@jest/globals";

jest.mock("../lib/api/polizasApi");
jest.mock("../lib/api/movimientosApi");

const mockGetPolizas = jest.mocked(getPolizas);
const mockGetCuentasContables = jest.mocked(getCuentasContables);

describe("MovimientoForm", () => {
  beforeEach(() => {
    mockGetPolizas.mockResolvedValue([
      {
        id: 1,
        numeropoliza: "POL001",
        fecha: "2023-05-01",
        descripcion: "Test Poliza",
      },
    ]);
    mockGetCuentasContables.mockResolvedValue([
      {
        id: "1000",
        nombre: "Test Account",
        saldoDebe: 100,
        saldoHaber: 0,
        tipo: "ACTIVO",
      },
    ]);
  });

  it("submits form with correct data", async () => {
    const onMovimientosAdded = jest.fn();

    render(
      <MovimientoForm
        onMovimientosAdded={onMovimientosAdded}
        onMovimientosUpdated={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    // Wait for the options to be loaded
    await waitFor(() => {
      expect(screen.getByLabelText(/Póliza/i)).toHaveValue("");
      expect(screen.getByLabelText(/Cuenta Contable/i)).toHaveValue("");
    });

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Póliza/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Cuenta Contable/i), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Test Movement" },
    });
    fireEvent.change(screen.getByLabelText(/Cargo/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/Abono/i), {
      target: { value: "0" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Guardar/i));

    // Wait for and assert the form submission
    await waitFor(() => {
      expect(onMovimientosAdded).toHaveBeenCalledWith([
        {
          polizaId: 1,
          cuentaContable: "1000",
          descripcion: "Test Movement",
          cargo: 100,
          abono: 0,
        },
      ]);
    });
  });
});
