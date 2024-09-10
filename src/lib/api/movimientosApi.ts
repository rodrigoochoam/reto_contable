import { Movimiento, CuentaContable } from "../../types/movimiento";

// Helper functions
const getStoredMovimientos = (): Movimiento[] => {
  const storedMovimientos = localStorage.getItem("movimientos");
  return storedMovimientos ? JSON.parse(storedMovimientos) : [];
};

const setStoredMovimientos = (movimientos: Movimiento[]) => {
  localStorage.setItem("movimientos", JSON.stringify(movimientos));
};

const getStoredCuentasContables = (): CuentaContable[] => {
  const storedCuentas = localStorage.getItem("cuentasContables");
  return storedCuentas ? JSON.parse(storedCuentas) : [];
};

const setStoredCuentasContables = (cuentas: CuentaContable[]) => {
  localStorage.setItem("cuentasContables", JSON.stringify(cuentas));
};

export async function getMovimientos(): Promise<Movimiento[]> {
  return new Promise((resolve) => {
    const movimientos = getStoredMovimientos();
    setTimeout(() => resolve(movimientos), 100);
  });
}

export async function addMovimientos(
  newMovimientos: Omit<Movimiento, "id">[]
): Promise<void> {
  return new Promise((resolve) => {
    const storedMovimientos = getStoredMovimientos();
    const movimientosWithIds = newMovimientos.map((movimiento) => ({
      ...movimiento,
      id: Date.now() + Math.random(),
    }));
    const updatedMovimientos = [...storedMovimientos, ...movimientosWithIds];
    setStoredMovimientos(updatedMovimientos);
    setTimeout(resolve, 100);
  });
}

export async function deleteMovimiento(id: number): Promise<void> {
  return new Promise((resolve) => {
    const movimientos = getStoredMovimientos();
    const updatedMovimientos = movimientos.filter((m) => m.id !== id);
    setStoredMovimientos(updatedMovimientos);
    setTimeout(resolve, 100);
  });
}

export async function updateMovimientosPorPoliza(
  polizaId: number,
  updatedMovimientos: Omit<Movimiento, "id">[]
): Promise<void> {
  return new Promise((resolve) => {
    const storedMovimientos = getStoredMovimientos();
    const updatedAllMovimientos = storedMovimientos.map((m) => {
      if (m.polizaId === polizaId) {
        const updatedMovimiento = updatedMovimientos.find(
          (um) => um.cuentaContable === m.cuentaContable
        );
        return updatedMovimiento ? { ...updatedMovimiento, id: m.id } : m;
      }
      return m;
    });
    setStoredMovimientos(updatedAllMovimientos);
    setTimeout(resolve, 100);
  });
}

export async function getMovimientosPorPoliza(
  polizaId: number
): Promise<Movimiento[]> {
  return new Promise((resolve) => {
    const movimientos = getStoredMovimientos();
    const movimientosPoliza = movimientos.filter(
      (m) => m.polizaId === polizaId
    );
    setTimeout(() => resolve(movimientosPoliza), 100);
  });
}

export async function getCuentasContables(): Promise<CuentaContable[]> {
  return new Promise((resolve) => {
    const cuentasContables = getStoredCuentasContables();
    setTimeout(() => resolve(cuentasContables), 100);
  });
}

export async function updateCuentaContable(
  cuentaId: string,
  cargo: number,
  abono: number,
  descripcion: string,
  fecha: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const cuentas = getStoredCuentasContables();
      const cuenta = cuentas.find((c) => c.id === cuentaId);
      if (cuenta) {
        cuenta.saldoDebe += cargo;
        cuenta.saldoHaber += abono;
        if (!cuenta.movimientos) {
          cuenta.movimientos = [];
        }
        cuenta.movimientos.push({ cargo, abono, descripcion, fecha });
        setStoredCuentasContables(cuentas);
        resolve();
      } else {
        reject(new Error("Cuenta contable no encontrada"));
      }
    } catch (error) {
      reject(error);
    }
  });
}
