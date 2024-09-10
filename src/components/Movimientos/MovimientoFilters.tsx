import React from "react";
import { CuentaContable } from "../../types/movimiento";

interface MovimientoFiltersProps {
  fechaInicio: string;
  fechaFin: string;
  polizaFilter: string;
  cuentaContableFilter: string;
  polizas: { id: number; numeropoliza: string }[];
  cuentasContables: CuentaContable[];
  onFechaInicioChange: (value: string) => void;
  onFechaFinChange: (value: string) => void;
  onPolizaFilterChange: (value: string) => void;
  onCuentaContableFilterChange: (value: string) => void;
}

const MovimientoFilters: React.FC<MovimientoFiltersProps> = ({
  fechaInicio,
  fechaFin,
  polizaFilter,
  cuentaContableFilter,
  polizas,
  cuentasContables,
  onFechaInicioChange,
  onFechaFinChange,
  onPolizaFilterChange,
  onCuentaContableFilterChange,
}) => {
  return (
    <div className="mb-6 bg-white p-6 rounded-lg border-2">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Inicio
          </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => onFechaInicioChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Fin
          </label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => onFechaFinChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Póliza
          </label>
          <select
            value={polizaFilter}
            onChange={(e) => onPolizaFilterChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Todas</option>
            {polizas.map((poliza) => (
              <option key={poliza.id} value={poliza.id.toString()}>
                {poliza.numeropoliza}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cuenta Contable
          </label>
          <select
            value={cuentaContableFilter}
            onChange={(e) => onCuentaContableFilterChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Todas</option>
            {cuentasContables.map((cuenta) => (
              <option key={cuenta.id} value={cuenta.id}>
                {cuenta.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MovimientoFilters;
