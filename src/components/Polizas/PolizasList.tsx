import React, { useState } from "react";
import Layout from "../Layout/Layout";
import PolizaForm from "./PolizaForm";
import { PolizaListItem } from "./PolizaListItem";
import { FilterSection } from "./FilterSection";
import { usePolizasData } from "../../hooks/usePolizasData";
import { PolizaMovimientos } from "./PolizaMovimientos";
import { EditPolizaForm } from "./EditPolizaForm";
import {
  PlusCircleIcon,
  ArrowPathIcon,
  CalendarIcon,
  PencilIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "../../lib/utils/Pagination";
import { Poliza } from "../../types/poliza"; // Adjust the import path as needed

export function PolizasList() {
  const {
    filteredPolizas,
    selectedPolizaId,
    movimientos,
    cuentasContables,
    fechaInicio,
    fechaFin,
    descripcionFilter,
    polizaFilter,
    setFechaInicio,
    setFechaFin,
    setDescripcionFilter,
    setPolizaFilter,
    handleDelete,
    handleRefresh,
    handlePolizaClick,
  } = usePolizasData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingPoliza, setEditingPoliza] = useState<Poliza | null>(null);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleOpenEditForm = (poliza: Poliza) => {
    setEditingPoliza(poliza);
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setEditingPoliza(null);
  };

  const handlePolizaEdited = () => {
    handleCloseEditForm();
    handleRefresh();
  };

  return (
    <Layout title="Lista de Pólizas">
      <div className="flex justify-end items-center mb-6">
        <div>
          <button
            onClick={handleOpenForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out mr-3"
          >
            <div className="flex items-center">
              <PlusCircleIcon className="w-5 h-5 mr-1" />
              Añadir Póliza
            </div>
          </button>
          <button
            onClick={handleRefresh}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <ArrowPathIcon className="w-5 h-5 mr-1" />
              Actualizar Lista
            </div>
          </button>
        </div>
      </div>

      <FilterSection
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        descripcionFilter={descripcionFilter}
        polizaFilter={polizaFilter}
        onFechaInicioChange={setFechaInicio}
        onFechaFinChange={setFechaFin}
        onDescripcionFilterChange={setDescripcionFilter}
        onPolizaFilterChange={setPolizaFilter}
      />

      <div className="overflow-x-auto border-2 rounded-lg">
        <table className="w-full bg-white">
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
                  <PencilIcon className="w-5 h-5 mr-1" />
                  Descripción
                </div>
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <BookOpenIcon className="w-5 h-5 mr-1" />
                  Número de Póliza
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
            {filteredPolizas
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((poliza) => (
                <React.Fragment key={poliza.id}>
                  <PolizaListItem
                    poliza={poliza}
                    onEdit={() => handleOpenEditForm(poliza)}
                    onDelete={handleDelete}
                    onClick={() => handlePolizaClick(poliza.id)}
                  />
                  {selectedPolizaId === poliza.id && (
                    <tr>
                      <td colSpan={4}>
                        <div className="p-6 bg-gray-50">
                          <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Movimientos asociados
                          </h3>
                          <PolizaMovimientos
                            movimientos={movimientos}
                            cuentasContables={cuentasContables}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPolizas.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Añadir Nueva Póliza
              </h3>
              <div className="mt-2 px-7 py-3">
                <PolizaForm
                  onPolizaAdded={() => {
                    handleCloseForm();
                    handleRefresh();
                  }}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleCloseForm}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditFormOpen && editingPoliza && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Editar Póliza
              </h3>
              <div className="mt-2 px-7 py-3">
                <EditPolizaForm
                  poliza={editingPoliza}
                  onPolizaEdited={handlePolizaEdited}
                  onClose={handleCloseEditForm}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default PolizasList;
