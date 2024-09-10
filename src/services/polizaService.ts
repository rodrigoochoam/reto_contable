import { Poliza } from "../types/poliza";

let dummyPolizas: Poliza[] = [
  {
    id: 1,
    fecha: "2024-03-15",
    descripcion: "Venta de productos",
    numeropoliza: "POL-001",
  },
  {
    id: 2,
    fecha: "2024-03-16",
    descripcion: "Compra de insumos",
    numeropoliza: "POL-002",
  },
];

export const getPolizas = (): Promise<Poliza[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyPolizas), 100);
  });
};

export const addPoliza = (poliza: Omit<Poliza, "id">): Promise<Poliza> => {
  return new Promise((resolve) => {
    const newPoliza = { ...poliza, id: Date.now() };
    dummyPolizas.push(newPoliza);
    setTimeout(() => resolve(newPoliza), 500);
  });
};

export const updatePoliza = (
  id: number,
  poliza: Omit<Poliza, "id">
): Promise<Poliza> => {
  return new Promise((resolve, reject) => {
    const index = dummyPolizas.findIndex((p) => p.id === id);
    if (index !== -1) {
      dummyPolizas[index] = { ...poliza, id };
      setTimeout(() => resolve(dummyPolizas[index]), 500);
    } else {
      reject(new Error("Póliza no encontrada"));
    }
  });
};

export const deletePoliza = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    dummyPolizas = dummyPolizas.filter((p) => p.id !== id);
    setTimeout(resolve, 500);
  });
};
