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
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "../UI/Movimientos/Button";
import Layout from "../Layout/Layout";

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
          icon={<PlusCircleIcon className="w-5 h-5" />}
        >
          Agregar Movimientos
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <MovimientoForm
          movimientos={editingMovimientos}
          onMovimientosAdded={handleMovimientosAdded}
          onMovimientosUpdated={handleUpdate}
          onCancel={closeModal}
        />
      </Modal>

      <MovimientoFilters
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        polizaFilter={polizaFilter}
        cuentaContableFilter={cuentaContableFilter}
        polizas={polizas}
        cuentasContables={cuentasContables}
        onFechaInicioChange={setFechaInicio}
        onFechaFinChange={setFechaFin}
        onPolizaFilterChange={setPolizaFilter}
        onCuentaContableFilterChange={setCuentaContableFilter}
      />

      <MovimientosList
        movimientos={movimientos}
        polizas={polizas}
        cuentasContables={cuentasContables}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

export default MovimientosPage;
