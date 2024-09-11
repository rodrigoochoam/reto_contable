import {
  addMovimientos,
  deleteMovimiento,
  getMovimientosPorPoliza,
  getCuentasContables,
  updateCuentaContable,
} from "../lib/api/movimientosApi";

import { jest } from "@jest/globals";

// Mock localStorage
type LocalStorageMock = {
  getItem: jest.Mock;
  setItem: jest.Mock;
  clear: jest.Mock;
};

const localStorageMock: LocalStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as unknown as Storage;

describe("movimientosApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("addMovimientos should add new movimientos", async () => {
    const newMovimientos = [
      {
        polizaId: 1,
        cuentaContable: "1000",
        descripcion: "Test",
        cargo: 100,
        abono: 0,
        fecha: new Date().toISOString().split("T")[0], // Add this line
      },
    ];
    await addMovimientos(newMovimientos);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  test("deleteMovimiento should remove a movimiento", async () => {
    await deleteMovimiento(1);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  test("getMovimientosPorPoliza should return movimientos for a poliza", async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify([
        {
          id: 1,
          polizaId: 1,
          cuentaContable: "1000",
          descripcion: "Test",
          cargo: 100,
          abono: 0,
        },
      ])
    );
    const movimientos = await getMovimientosPorPoliza(1);
    expect(movimientos.length).toBe(1);
    expect(movimientos[0].polizaId).toBe(1);
  });

  test("getCuentasContables should return cuentas contables", async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify([
        { id: "1000", nombre: "Test Account", saldoDebe: 100, saldoHaber: 0 },
      ])
    );
    const cuentas = await getCuentasContables();
    expect(cuentas.length).toBe(1);
    expect(cuentas[0].id).toBe("1000");
  });

  test("updateCuentaContable should update cuenta contable", async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify([
        {
          id: "1000",
          nombre: "Test Account",
          saldoDebe: 100,
          saldoHaber: 0,
          movimientos: [],
        },
      ])
    );
    await updateCuentaContable("1000", 50, 0, "New movement", "2023-05-01");
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});
