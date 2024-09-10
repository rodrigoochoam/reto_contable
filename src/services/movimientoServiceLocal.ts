import { Movimiento, CuentaContable } from "../types/movimiento";

const MOVIMIENTOS_STORAGE_KEY = "movimientos";
const CUENTAS_CONTABLES_STORAGE_KEY = "cuentasContables";

function getStoredMovimientos(): Movimiento[] {
  const storedMovimientos = localStorage.getItem(MOVIMIENTOS_STORAGE_KEY);
  return storedMovimientos ? JSON.parse(storedMovimientos) : [];
}

function setStoredMovimientos(movimientos: Movimiento[]): void {
  localStorage.setItem(MOVIMIENTOS_STORAGE_KEY, JSON.stringify(movimientos));
}

function getStoredCuentasContables(): CuentaContable[] {
  const storedCuentas = localStorage.getItem(CUENTAS_CONTABLES_STORAGE_KEY);
  return storedCuentas ? JSON.parse(storedCuentas) : [];
}

function setStoredCuentasContables(cuentas: CuentaContable[]): void {
  localStorage.setItem(CUENTAS_CONTABLES_STORAGE_KEY, JSON.stringify(cuentas));
}

export const getMovimientos = (): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    const movimientos = getStoredMovimientos();
    setTimeout(() => resolve(movimientos), 100);
  });
};

export const getCuentasContables = (): Promise<CuentaContable[]> => {
  return new Promise((resolve) => {
    const cuentas = getStoredCuentasContables();
    setTimeout(() => resolve(cuentas), 100);
  });
};

export const addMovimientos = (
  movimientos: Omit<Movimiento, "id">[]
): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    const storedMovimientos = getStoredMovimientos();
    const newMovimientos = movimientos.map((movimiento) => ({
      ...movimiento,
      id: Date.now() + Math.random(),
    }));
    const updatedMovimientos = [...storedMovimientos, ...newMovimientos];
    setStoredMovimientos(updatedMovimientos);
    setTimeout(() => resolve(newMovimientos), 100);
  });
};

export const getMovimientosPorPoliza = (
  polizaId: number
): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    const movimientos = getStoredMovimientos();
    const movimientosPoliza = movimientos.filter(
      (m) => m.polizaId === polizaId
    );
    setTimeout(() => resolve(movimientosPoliza), 100);
  });
};

export const updateMovimientosPorPoliza = (
  polizaId: number,
  movimientos: Omit<Movimiento, "id">[]
): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    const storedMovimientos = getStoredMovimientos();
    const updatedMovimientos = storedMovimientos.map((m) => {
      if (m.polizaId === polizaId) {
        const updatedMovimiento = movimientos.find(
          (um) => um.cuentaContable === m.cuentaContable
        );
        return updatedMovimiento ? { ...updatedMovimiento, id: m.id } : m;
      }
      return m;
    });
    setStoredMovimientos(updatedMovimientos);
    setTimeout(
      () => resolve(updatedMovimientos.filter((m) => m.polizaId === polizaId)),
      100
    );
  });
};

export const deleteMovimiento = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    const movimientos = getStoredMovimientos();
    const updatedMovimientos = movimientos.filter((m) => m.id !== id);
    setStoredMovimientos(updatedMovimientos);
    setTimeout(resolve, 100);
  });
};

export const updateCuentaContable = (
  cuentaId: string,
  cargo: number,
  abono: number,
  descripcion: string,
  fecha: string
) => {
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
  }
};

// Initialize cuentas contables if not present in localStorage
if (getStoredCuentasContables().length === 0) {
  const initialCuentasContables: CuentaContable[] = [
    {
      id: "1000",
      nombre: "Bancos",
      tipo: "Activo",
      saldoDebe: 0,
      saldoHaber: 0,
    },
    {
      id: "2000",
      nombre: "Clientes",
      tipo: "Activo",
      saldoDebe: 0,
      saldoHaber: 0,
    },
    {
      id: "3000",
      nombre: "Proveedores",
      tipo: "Pasivo",
      saldoDebe: 0,
      saldoHaber: 0,
    },
    {
      id: "4000",
      nombre: "Inventario",
      tipo: "Activo",
      saldoDebe: 0,
      saldoHaber: 0,
    },
    {
      id: "5000",
      nombre: "Capital Social",
      tipo: "Capital",
      saldoDebe: 0,
      saldoHaber: 0,
    },
    {
      id: "6000",
      nombre: "Equipo",
      tipo: "Activo",
      saldoDebe: 0,
      saldoHaber: 0,
    },
    {
      id: "7000",
      nombre: "Ingresos",
      tipo: "Activo",
      saldoDebe: 0,
      saldoHaber: 0,
    },
    {
      id: "8000",
      nombre: "Gastos",
      tipo: "Activo",
      saldoDebe: 0,
      saldoHaber: 0,
    },
  ];
  setStoredCuentasContables(initialCuentasContables);
}
