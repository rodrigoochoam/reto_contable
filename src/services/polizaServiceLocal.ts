import { Poliza } from "../types/poliza";

const POLIZAS_STORAGE_KEY = "polizas";

function getStoredPolizas(): Poliza[] {
  const storedPolizas = localStorage.getItem(POLIZAS_STORAGE_KEY);
  return storedPolizas ? JSON.parse(storedPolizas) : [];
}

function setStoredPolizas(polizas: Poliza[]): void {
  localStorage.setItem(POLIZAS_STORAGE_KEY, JSON.stringify(polizas));
}

export const getPolizas = (): Promise<Poliza[]> => {
  return new Promise((resolve) => {
    const polizas = getStoredPolizas();
    setTimeout(() => resolve(polizas), 100);
  });
};

export const addPoliza = (poliza: Omit<Poliza, "id">): Promise<Poliza> => {
  return new Promise((resolve) => {
    const polizas = getStoredPolizas();
    const newPoliza = { ...poliza, id: Date.now() };
    polizas.push(newPoliza);
    setStoredPolizas(polizas);
    setTimeout(() => resolve(newPoliza), 100);
  });
};

export const updatePoliza = (
  id: number,
  poliza: Omit<Poliza, "id">
): Promise<Poliza> => {
  return new Promise((resolve, reject) => {
    const polizas = getStoredPolizas();
    const index = polizas.findIndex((p) => p.id === id);
    if (index !== -1) {
      polizas[index] = { ...poliza, id };
      setStoredPolizas(polizas);
      setTimeout(() => resolve(polizas[index]), 100);
    } else {
      reject(new Error("Póliza no encontrada"));
    }
  });
};

export const deletePoliza = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    const polizas = getStoredPolizas();
    const updatedPolizas = polizas.filter((p) => p.id !== id);
    setStoredPolizas(updatedPolizas);
    setTimeout(resolve, 100);
  });
};
