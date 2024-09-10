import React from "react";
import { Movimiento } from "../../types/movimiento";
import MovimientoItem from "./MovimientoItem";

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
        <thead className="bg-gray-50">{/* Table header */}</thead>
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
