import React from "react";
import { Poliza } from "../../types/poliza";

interface PolizaListItemProps {
  poliza: Poliza;
  onEdit: (poliza: Poliza) => void;
  onDelete: (id: number) => void;
  onClick: () => void;
}

export const PolizaListItem: React.FC<PolizaListItemProps> = ({
  poliza,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <tr
      onClick={onClick}
      className="cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
    >
      <td className="py-4 px-6 whitespace-nowrap">{poliza.fecha}</td>
      <td className="py-4 px-6 whitespace-nowrap">{poliza.descripcion}</td>
      <td className="py-4 px-6 whitespace-nowrap">{poliza.numeropoliza}</td>
      <td className="py-4 px-6 whitespace-nowrap">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(poliza);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-md shadow-sm transition duration-150 ease-in-out mr-2"
        >
          Editar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded-md shadow-sm transition duration-150 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(poliza.id);
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
