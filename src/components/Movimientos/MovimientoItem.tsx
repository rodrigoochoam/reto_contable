import React from "react";
import { Movimiento } from "../../types/movimiento";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface MovimientoItemProps {
  movimiento: Movimiento;
  poliza?: { id: number; numeropoliza: string };
  cuentaContable?: { id: string; nombre: string };
  onEdit: () => void;
  onDelete: () => void;
}

const MovimientoItem: React.FC<MovimientoItemProps> = ({
  movimiento,
  poliza,
  cuentaContable,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
      <td className="py-4 px-6 whitespace-nowrap">{movimiento.fecha}</td>
      <td className="py-4 px-6 whitespace-nowrap">{poliza?.numeropoliza}</td>
      <td className="py-4 px-6 whitespace-nowrap">{cuentaContable?.nombre}</td>
      <td className="py-4 px-6 whitespace-nowrap">{movimiento.descripcion}</td>
      <td className="py-4 px-6 whitespace-nowrap">
        ${Intl.NumberFormat("en-US").format(movimiento.cargo)}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        ${Intl.NumberFormat("en-US").format(movimiento.abono)}
      </td>
      <td className="py-4 px-6 whitespace-nowrap flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md transition duration-300 ease-in-out flex items-center"
        >
          <PencilIcon className="w-5 h-5 mr-1" />
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md transition duration-300 ease-in-out flex items-center"
        >
          <TrashIcon className="w-5 h-5 mr-1" />
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default MovimientoItem;
