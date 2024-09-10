import { useState, useEffect, useCallback } from "react";
import { Poliza } from "../../types/poliza";
import { Movimiento, CuentaContable } from "../../types/movimiento";
import { getPolizas, deletePoliza } from "../../services/polizaServiceLocal";
import {
  getMovimientos,
  getCuentasContables,
} from "../../services/movimientoServiceLocal";
import PolizaForm from "../PolizaForm/PolizaForm";
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export function PolizasList() {
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [filteredPolizas, setFilteredPolizas] = useState<Poliza[]>([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [descripcionFilter, setDescripcionFilter] = useState("");
  const [polizaFilter, setPolizaFilter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedPolizaId, setSelectedPolizaId] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>(
    []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const fetchPolizas = useCallback(async () => {
    const data = await getPolizas();
    setPolizas(data);
  }, []);

  useEffect(() => {
    fetchPolizas();
  }, [fetchPolizas, refreshKey]);

  useEffect(() => {
    if (selectedPolizaId) {
      fetchMovimientos(selectedPolizaId);
    }
  }, [selectedPolizaId]);

  useEffect(() => {
    const fetchCuentasContables = async () => {
      const data = await getCuentasContables();
      setCuentasContables(data);
    };
    fetchCuentasContables();
  }, []);

  const fetchMovimientos = async (polizaId: number) => {
    const allMovimientos = await getMovimientos();
    const filteredMovimientos = allMovimientos.filter(
      (movimiento) => movimiento.polizaId === polizaId
    );
    setMovimientos(filteredMovimientos);
  };

  const handleDelete = async (id: number) => {
    await deletePoliza(id);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handlePolizaClick = (polizaId: number) => {
    setSelectedPolizaId(polizaId === selectedPolizaId ? null : polizaId);
  };

  useEffect(() => {
    applyFilters();
  }, [polizas, fechaInicio, fechaFin, descripcionFilter, polizaFilter]);

  const applyFilters = () => {
    let filtered = polizas;

    if (fechaInicio) {
      filtered = filtered.filter((poliza) => poliza.fecha >= fechaInicio);
    }
    if (fechaFin) {
      filtered = filtered.filter((poliza) => poliza.fecha <= fechaFin);
    }
    if (descripcionFilter) {
      filtered = filtered.filter((poliza) =>
        poliza.descripcion
          .toLowerCase()
          .includes(descripcionFilter.toLowerCase())
      );
    }
    if (polizaFilter) {
      filtered = filtered.filter((poliza) =>
        poliza.numeropoliza.toLowerCase().includes(polizaFilter.toLowerCase())
      );
    }

    setFilteredPolizas(filtered);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Lista de Pólizas</h2>
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
              Descripción
            </label>
            <div className="relative">
              <input
                type="text"
                value={descripcionFilter}
                onChange={(e) => setDescripcionFilter(e.target.value)}
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
                onChange={(e) => setPolizaFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded pl-10"
                placeholder="Buscar por número de póliza"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
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
            {filteredPolizas.map((poliza) => (
              <>
                <tr
                  key={poliza.id}
                  onClick={() => handlePolizaClick(poliza.id)}
                  className="cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    {poliza.fecha}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {poliza.descripcion}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {poliza.numeropoliza}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-md shadow-sm transition duration-150 ease-in-out mr-2">
                      Editar
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded-md shadow-sm transition duration-150 ease-in-out"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(poliza.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
                {selectedPolizaId === poliza.id && (
                  <tr>
                    <td colSpan={4}>
                      <div className="p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                          Movimientos asociados
                        </h3>
                        {movimientos.length > 0 ? (
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
                                      {
                                        cuentasContables.find(
                                          (cuenta) =>
                                            cuenta.id ===
                                            movimiento.cuentaContable
                                        )?.nombre
                                      }
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
                        ) : (
                          <p className="text-gray-600">
                            No hay movimientos asociados a esta póliza.
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
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
    </div>
  );
}

export default PolizasList;
