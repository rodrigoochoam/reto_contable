import React, { useState } from "react";
import { Movimiento } from "../../types/movimiento";
import {
  addMovimientos,
  deleteMovimiento,
  updateMovimientosPorPoliza,
  getMovimientosPorPoliza,
} from "../../lib/api/movimientosApi";
import MovimientoForm from "./MovimientoForm";
import Modal from "../UI/Movimientos/Modal";
import MovimientosList from "./MovimientosList";
import MovimientoFilters from "./MovimientoFilters";
import { useMovimientos } from "../../hooks/useMovimientos";
import { PlusCircleIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Button from "../UI/Movimientos/Button";
import Layout from "../Layout/Layout";
import { Pagination } from "../../lib/utils/Pagination";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MovimientosReportPDF from "../../Reports/MovimientosReportPDF";

const MovimientosPage: React.FC = () => {
  const {
    movimientos,
    polizas,
    cuentasContables,
    fechaInicio,
    fechaFin,
    polizaFilter,
    cuentaContableFilter,
    setFechaInicio,
    setFechaFin,
    setPolizaFilter,
    setCuentaContableFilter,
    fetchMovimientos,
  } = useMovimientos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovimientos, setEditingMovimientos] = useState<
    Movimiento[] | null
  >(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  return (
    <Layout title="Gestión de Movimientos">
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 inline" />
          Añadir Movimiento
        </Button>
      </div>
      <div className="flex justify-end mb-6">
        <PDFDownloadLink
          document={
            <MovimientosReportPDF
              polizas={polizas.map((p) => ({
                ...p,
                fecha: new Date().toISOString(),
                descripcion: "",
              }))}
              movimientos={movimientos}
            />
          }
          fileName="movimientos_por_poliza.pdf"
        >
          {({ loading }) =>
            loading ? (
              "Generando PDF..."
            ) : (
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2 inline" />
                Descargar Reporte PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>

      <MovimientoFilters
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        polizaFilter={polizaFilter}
        cuentaContableFilter={cuentaContableFilter}
        onFechaInicioChange={setFechaInicio}
        onFechaFinChange={setFechaFin}
        onPolizaFilterChange={setPolizaFilter}
        onCuentaContableFilterChange={setCuentaContableFilter}
        polizas={polizas}
        cuentasContables={cuentasContables}
      />

      <MovimientosList
        movimientos={movimientos.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
        polizas={polizas}
        cuentasContables={cuentasContables}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(movimientos.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <MovimientoForm
            movimientos={editingMovimientos || undefined}
            onMovimientosAdded={handleMovimientosAdded}
            onMovimientosUpdated={handleUpdate}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default MovimientosPage;
