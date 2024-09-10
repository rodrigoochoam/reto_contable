import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface FilterSectionProps {
  fechaInicio: string;
  fechaFin: string;
  descripcionFilter: string;
  polizaFilter: string;
  onFechaInicioChange: (value: string) => void;
  onFechaFinChange: (value: string) => void;
  onDescripcionFilterChange: (value: string) => void;
  onPolizaFilterChange: (value: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  fechaInicio,
  fechaFin,
  descripcionFilter,
  polizaFilter,
  onFechaInicioChange,
  onFechaFinChange,
  onDescripcionFilterChange,
  onPolizaFilterChange,
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
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <div className="relative">
            <input
              type="text"
              value={descripcionFilter}
              onChange={(e) => onDescripcionFilterChange(e.target.value)}
              className="w-full px-3 py-2 border rounded pl-10"
              placeholder="Buscar por descripción"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Póliza
          </label>
          <div className="relative">
            <input
              type="text"
              value={polizaFilter}
              onChange={(e) => onPolizaFilterChange(e.target.value)}
              className="w-full px-3 py-2 border rounded pl-10"
              placeholder="Buscar por número de póliza"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
