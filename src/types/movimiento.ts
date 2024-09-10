export interface Movimiento {
  id: number;
  polizaId: number;
  fecha: string;
  cuentaContable: string;
  descripcion: string;
  cargo: number;
  abono: number;
}

export interface CuentaContable {
  id: string;
  nombre: string;
  tipo: string;
  saldoDebe: number;
  saldoHaber: number;
  movimientos?: {
    cargo: number;
    abono: number;
    descripcion: string;
    fecha: string;
  }[];
}
