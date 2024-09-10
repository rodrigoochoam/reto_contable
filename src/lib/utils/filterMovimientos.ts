import { Movimiento } from "../../types/movimiento";

export function filterMovimientos(
  movimientos: Movimiento[],
  fechaInicio: string,
  fechaFin: string,
  polizaFilter: string,
  cuentaContableFilter: string
): Movimiento[] {
  return movimientos.filter((m) => {
    if (fechaInicio && m.fecha < fechaInicio) return false;
    if (fechaFin && m.fecha > fechaFin) return false;
    if (polizaFilter && m.polizaId.toString() !== polizaFilter) return false;
    if (cuentaContableFilter && m.cuentaContable !== cuentaContableFilter)
      return false;
    return true;
  });
}
