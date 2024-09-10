import React, { useState, useEffect } from "react";
import { Movimiento, CuentaContable } from "../../types/movimiento";
import {
  getMovimientos,
  addMovimientos,
  deleteMovimiento,
  updateMovimientosPorPoliza,
  getMovimientosPorPoliza,
  getCuentasContables,
} from "../../services/movimientoServiceLocal";
import { getPolizas } from "../../services/polizaServiceLocal";
import MovimientoForm from "../MovimientoForm/MovimientoForm";
import Modal from "../Modal/Modal";
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"; // Importing icons

const MovimientosPage: React.FC = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [filteredMovimientos, setFilteredMovimientos] = useState<Movimiento[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovimientos, setEditingMovimientos] = useState<
    Movimiento[] | null
  >(null);
  const [polizas, setPolizas] = useState<
    { id: number; numeropoliza: string }[]
  >([]);
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>(
    []
  );

  // Estados para los filtros
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [polizaFilter, setPolizaFilter] = useState("");
  const [cuentaContableFilter, setCuentaContableFilter] = useState("");

  useEffect(() => {
    fetchMovimientos();
    fetchPolizas();
    fetchCuentasContables();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [movimientos, fechaInicio, fechaFin, polizaFilter, cuentaContableFilter]);

  const fetchMovimientos = async () => {
    const data = await getMovimientos();
    setMovimientos(data);
  };

  const fetchPolizas = async () => {
    const polizasData = await getPolizas();
    setPolizas(polizasData);
  };

  const fetchCuentasContables = async () => {
    const cuentasData = await getCuentasContables();
    setCuentasContables(cuentasData);
  };

  const handleDelete = async (id: number) => {
    await deleteMovimiento(id);
    fetchMovimientos();
  };

  const handleMovimientosAdded = async (
    newMovimientos: Omit<Movimiento, "id">[]
  ) => {
    await addMovimientos(newMovimientos);
    setIsModalOpen(false);
    fetchMovimientos();
  };

  const handleEdit = async (movimiento: Movimiento) => {
    const movimientosPoliza = await getMovimientosPorPoliza(
      movimiento.polizaId
    );
    setEditingMovimientos(movimientosPoliza);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedMovimientos: Omit<Movimiento, "id">[]) => {
    if (editingMovimientos && editingMovimientos.length > 0) {
      await updateMovimientosPorPoliza(
        editingMovimientos[0].polizaId,
        updatedMovimientos
      );
      setIsModalOpen(false);
      setEditingMovimientos(null);
      fetchMovimientos();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMovimientos(null);
  };

  const applyFilters = () => {
    let filtered = [...movimientos];

    if (fechaInicio) {
      filtered = filtered.filter((m) => m.fecha >= fechaInicio);
    }
    if (fechaFin) {
      filtered = filtered.filter((m) => m.fecha <= fechaFin);
    }
    if (polizaFilter) {
      filtered = filtered.filter((m) => m.polizaId.toString() === polizaFilter);
    }
    if (cuentaContableFilter) {
      filtered = filtered.filter(
        (m) => m.cuentaContable === cuentaContableFilter
      );
    }

    setFilteredMovimientos(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Gestión de Movimientos
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <PlusCircleIcon className="w-5 h-5 mr-1" />
            Agregar Movimientos
          </div>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <MovimientoForm
          movimientos={editingMovimientos}
          onMovimientosAdded={handleMovimientosAdded}
          onMovimientosUpdated={handleUpdate}
          onCancel={closeModal}
        />
      </Modal>

      {/* Filtros */}
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
              onChange={(e) => setFechaInicio(e.target.value)}
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
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Póliza
            </label>
            <select
              value={polizaFilter}
              onChange={(e) => setPolizaFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Todas</option>
              {polizas.map((poliza) => (
                <option key={poliza.id} value={poliza.id}>
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
              onChange={(e) => setCuentaContableFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded"
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
            {filteredMovimientos.map((movimiento) => (
              <tr
                key={movimiento.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="py-4 px-6 whitespace-nowrap">
                  {movimiento.fecha}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {
                    polizas.find((p) => p.id === movimiento.polizaId)
                      ?.numeropoliza
                  }
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {
                    cuentasContables.find(
                      (c) => c.id === movimiento.cuentaContable
                    )?.nombre
                  }
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {movimiento.descripcion}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  ${Intl.NumberFormat("en-US").format(movimiento.cargo)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  ${Intl.NumberFormat("en-US").format(movimiento.abono)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={() => handleEdit(movimiento)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md transition duration-300 ease-in-out flex items-center"
                  >
                    <PencilIcon className="w-5 h-5 mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(movimiento.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md transition duration-300 ease-in-out flex items-center"
                  >
                    <TrashIcon className="w-5 h-5 mr-1" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovimientosPage;
