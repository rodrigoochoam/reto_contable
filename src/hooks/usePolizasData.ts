import { useState, useEffect, useCallback } from "react";
import { Poliza } from "../types/poliza";
import { Movimiento, CuentaContable } from "../types/movimiento";
import { getPolizas, deletePoliza } from "../lib/api/polizasApi";
import { getMovimientos, getCuentasContables } from "../lib/api/movimientosApi";
import { filterPolizas } from "../lib/utils/filterPolizas";

export function usePolizasData() {
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [filteredPolizas, setFilteredPolizas] = useState<Poliza[]>([]);
  const [selectedPolizaId, setSelectedPolizaId] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>(
    []
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [descripcionFilter, setDescripcionFilter] = useState("");
  const [polizaFilter, setPolizaFilter] = useState("");

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
    setFilteredPolizas(
      filterPolizas(
        polizas,
        fechaInicio,
        fechaFin,
        descripcionFilter,
        polizaFilter
      )
    );
  }, [polizas, fechaInicio, fechaFin, descripcionFilter, polizaFilter]);

  return {
    polizas,
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
  };
}
