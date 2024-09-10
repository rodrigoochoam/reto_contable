import { Poliza } from "../../types/poliza";

export function filterPolizas(
  polizas: Poliza[],
  fechaInicio: string,
  fechaFin: string,
  descripcionFilter: string,
  polizaFilter: string
): Poliza[] {
  return polizas.filter((poliza) => {
    if (fechaInicio && poliza.fecha < fechaInicio) return false;
    if (fechaFin && poliza.fecha > fechaFin) return false;
    if (
      descripcionFilter &&
      !poliza.descripcion
        .toLowerCase()
        .includes(descripcionFilter.toLowerCase())
    )
      return false;
    if (
      polizaFilter &&
      !poliza.numeropoliza.toLowerCase().includes(polizaFilter.toLowerCase())
    )
      return false;
    return true;
  });
}
