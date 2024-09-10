import React from "react";
import { Movimiento, CuentaContable } from "../../types/movimiento";

interface PolizaMovimientosProps {
  movimientos: Movimiento[];
  cuentasContables: CuentaContable[];
}

export const PolizaMovimientos: React.FC<PolizaMovimientosProps> = ({
  movimientos,
  cuentasContables,
}) => {
  if (movimientos.length === 0) {
    return (
      <p className="text-gray-600">
        No hay movimientos asociados a esta póliza.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID Cuenta Contable
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cuenta Contable
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cargo
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Abono
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {movimientos.map((movimiento) => (
            <tr
              key={movimiento.id}
              className="hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <td className="py-4 px-6 whitespace-nowrap">
                {movimiento.cuentaContable}
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                {cuentasContables.find(
                  (cuenta) => cuenta.id === movimiento.cuentaContable
                )?.nombre || "N/A"}
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                {movimiento.descripcion}
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                {movimiento.cargo}
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                {movimiento.abono}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
