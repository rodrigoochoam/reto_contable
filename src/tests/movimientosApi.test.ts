import { getMovimientos, addMovimientos } from "../lib/api/movimientosApi";
import { Movimiento } from "../types/movimiento";

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("movimientosApi", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("getMovimientos returns an empty array when no movimientos are stored", async () => {
    const movimientos = await getMovimientos();
    expect(movimientos).toEqual([]);
  });

  test("addMovimientos adds movimientos and getMovimientos retrieves them", async () => {
    const newMovimientos: Omit<Movimiento, "id">[] = [
      {
        polizaId: 1,
        cuentaContable: "1000",
        descripcion: "Test",
        cargo: 100,
        abono: 0,
        fecha: "2023-05-01",
      },
    ];

    await addMovimientos(newMovimientos);
    const retrievedMovimientos = await getMovimientos();

    expect(retrievedMovimientos.length).toBe(1);
    expect(retrievedMovimientos[0]).toMatchObject(newMovimientos[0]);
    expect(retrievedMovimientos[0].id).toBeDefined();
  });
});
