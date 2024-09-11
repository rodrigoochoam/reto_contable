import { getPolizas, addPoliza } from "../lib/api/polizasApi";

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

describe("polizasApi", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("addPoliza adds a poliza and getPolizas retrieves it", async () => {
    const newPoliza = {
      numeropoliza: "POL001",
      fecha: "2023-05-01",
      descripcion: "Test Poliza",
    };

    const addedPoliza = await addPoliza(newPoliza);
    expect(addedPoliza.id).toBeDefined();
    expect(addedPoliza.numeropoliza).toBe(newPoliza.numeropoliza);

    const polizas = await getPolizas();
    expect(polizas.length).toBe(1);
    expect(polizas[0]).toEqual(addedPoliza);
  });
});
