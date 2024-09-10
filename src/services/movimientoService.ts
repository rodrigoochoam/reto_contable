import { Movimiento, CuentaContable } from "../types/movimiento";

let dummyMovimientos: Movimiento[] = [
  {
    id: 1,
    polizaId: 1,
    fecha: "2024-03-15",
    cuentaContable: "1000",
    descripcion: "Venta de productos",
    cargo: 1000,
    abono: 0,
  },
  {
    id: 2,
    polizaId: 1,
    fecha: "2024-03-15",
    cuentaContable: "4000",
    descripcion: "Salida de inventario",
    cargo: 0,
    abono: 1000,
  },
];

export const cuentasContables: CuentaContable[] = [
  { id: "1000", nombre: "Bancos", tipo: "Activo", saldoDebe: 0, saldoHaber: 0 },
  {
    id: "2000",
    nombre: "Clientes",
    tipo: "Activo",
    saldoDebe: 1000,
    saldoHaber: 1000,
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
  /*   { id: "1000", nombre: "Bancos", tipo: "Activo" },
  { id: "2000", nombre: "Clientes", tipo: "Activo"   },
  { id: "3000", nombre: "Proveedores", tipo: "Pasivo" },
  { id: "4000", nombre: "Inventario", tipo: "Activo" },
  { id: "5000", nombre: "Capital Social", tipo: "Capital" }, */
];

export const getMovimientos = (): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyMovimientos), 500);
  });
};

export const getCuentasContables = (): Promise<CuentaContable[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cuentasContables), 500);
  });
};

export const addMovimientos = (
  movimientos: Omit<Movimiento, "id">[]
): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    const newMovimientos = movimientos.map((movimiento) => ({
      ...movimiento,
      id: Date.now() + Math.random(), // Genera un ID único para cada movimiento
    }));
    dummyMovimientos = [...dummyMovimientos, ...newMovimientos];
    setTimeout(() => resolve(newMovimientos), 500);
  });
};

/* export const addMovimiento = (
  movimiento: Omit<Movimiento, "id">
): Promise<Movimiento> => {
  return new Promise((resolve) => {
    const newMovimiento = { ...movimiento, id: Date.now() };
    dummyMovimientos.push(newMovimiento);
    updateCuentaContable(
      newMovimiento.cuentaContable,
      newMovimiento.cargo,
      newMovimiento.abono
    );
    setTimeout(() => resolve(newMovimiento), 500);
  });
}; */

/* export const updateMovimiento = (
  id: number,
  updatedMovimiento: Omit<Movimiento, "id">
): Promise<Movimiento> => {
  return new Promise((resolve, reject) => {
    const index = dummyMovimientos.findIndex((m) => m.id === id);
    if (index !== -1) {
      const oldMovimiento = dummyMovimientos[index];
      updateCuentaContable(
        oldMovimiento.cuentaContable,
        -oldMovimiento.cargo,
        -oldMovimiento.abono
      );
      updateCuentaContable(
        updatedMovimiento.cuentaContable,
        updatedMovimiento.cargo,
        updatedMovimiento.abono
      );
      dummyMovimientos[index] = { ...updatedMovimiento, id };
      setTimeout(() => resolve(dummyMovimientos[index]), 500);
    } else {
      reject(new Error("Movimiento not found"));
    }
  });
}; */

export const getMovimientosPorPoliza = (
  polizaId: number
): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    const movimientosPoliza = dummyMovimientos.filter(
      (m) => m.polizaId === polizaId
    );
    setTimeout(() => resolve(movimientosPoliza), 500);
  });
};

export const updateMovimientosPorPoliza = (
  polizaId: number,
  movimientos: Omit<Movimiento, "id">[]
): Promise<Movimiento[]> => {
  return new Promise((resolve) => {
    const updatedMovimientos = dummyMovimientos.map((m) => {
      if (m.polizaId === polizaId) {
        const updatedMovimiento = movimientos.find(
          (um) => um.cuentaContable === m.cuentaContable
        );
        return updatedMovimiento ? { ...updatedMovimiento, id: m.id } : m;
      }
      return m;
    });
    dummyMovimientos = updatedMovimientos;
    setTimeout(
      () => resolve(updatedMovimientos.filter((m) => m.polizaId === polizaId)),
      500
    );
  });
};

export const deleteMovimiento = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    dummyMovimientos = dummyMovimientos.filter((m) => m.id !== id);
    setTimeout(resolve, 500);
  });
};

export const updateCuentaContable = (
  cuentaId: string,
  cargo: number,
  abono: number
) => {
  const cuenta = cuentasContables.find((c) => c.id === cuentaId);
  if (cuenta) {
    cuenta.saldoDebe += cargo;
    cuenta.saldoHaber += abono;
  }
};
