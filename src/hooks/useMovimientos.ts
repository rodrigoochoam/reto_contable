import { useState, useEffect, useCallback } from "react";
import { Movimiento, CuentaContable } from "../types/movimiento";
import { getMovimientos, getCuentasContables } from "../lib/api/movimientosApi";
import { getPolizas } from "../lib/api/polizasApi";
import { filterMovimientos } from "../lib/utils/filterMovimientos";

export function useMovimientos() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [filteredMovimientos, setFilteredMovimientos] = useState<Movimiento[]>(
    []
  );
  const [polizas, setPolizas] = useState<
    { id: number; numeropoliza: string }[]
  >([]);
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>(
    []
  );
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [polizaFilter, setPolizaFilter] = useState("");
  const [cuentaContableFilter, setCuentaContableFilter] = useState("");

  const fetchMovimientos = useCallback(async () => {
    const data = await getMovimientos();
    setMovimientos(data);
  }, []);

  const fetchPolizas = useCallback(async () => {
    const polizasData = await getPolizas();
    setPolizas(polizasData);
  }, []);

  const fetchCuentasContables = useCallback(async () => {
    const cuentasData = await getCuentasContables();
    setCuentasContables(cuentasData);
  }, []);

  useEffect(() => {
    fetchMovimientos();
    fetchPolizas();
    fetchCuentasContables();
  }, [fetchMovimientos, fetchPolizas, fetchCuentasContables]);

  useEffect(() => {
    setFilteredMovimientos(
      filterMovimientos(
        movimientos,
        fechaInicio,
        fechaFin,
        polizaFilter,
        cuentaContableFilter
      )
    );
  }, [movimientos, fechaInicio, fechaFin, polizaFilter, cuentaContableFilter]);

  return {
    movimientos: filteredMovimientos,
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
  };
}
