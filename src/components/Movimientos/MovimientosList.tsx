import React from "react";
import { Movimiento } from "../../types/movimiento";
import MovimientoItem from "./MovimientoItem";
import {
  CalendarIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

interface MovimientosListProps {
  movimientos: Movimiento[];
  polizas: { id: number; numeropoliza: string }[];
  cuentasContables: { id: string; nombre: string }[];
  onEdit: (movimiento: Movimiento) => void;
  onDelete: (id: number) => void;
}

const MovimientosList: React.FC<MovimientosListProps> = ({
  movimientos,
  polizas,
  cuentasContables,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto border-2 rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-1" />
                Fecha
              </div>
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <BookOpenIcon className="w-5 h-5 mr-1" />
                Póliza
              </div>
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <ClipboardDocumentCheckIcon className="w-5 h-5 mr-1" />
                Cuenta
              </div>
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <PencilIcon className="w-5 h-5 mr-1" />
                Descripción
              </div>
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <ArrowUpIcon className="w-5 h-5 mr-1" />
                Cargo
              </div>
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <ArrowDownIcon className="w-5 h-5 mr-1" />
                Abono
              </div>
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <PencilIcon className="w-5 h-5 mr-1" />
                Acciones
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {movimientos.map((movimiento) => (
            <MovimientoItem
              key={movimiento.id}
              movimiento={movimiento}
              poliza={polizas.find((p) => p.id === movimiento.polizaId)}
              cuentaContable={cuentasContables.find(
                (c) => c.id === movimiento.cuentaContable
              )}
              onEdit={() => onEdit(movimiento)}
              onDelete={() => onDelete(movimiento.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovimientosList;
