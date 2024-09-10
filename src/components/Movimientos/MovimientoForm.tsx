import React, { useState, useEffect } from "react";
import { Movimiento, CuentaContable } from "../../types/movimiento";
import { Poliza } from "../../types/poliza";
import { getPolizas } from "../../lib/api/polizasApi";
import {
  getCuentasContables,
  updateCuentaContable,
} from "../../lib/api/movimientosApi";
import {
  getExchangeRates,
  convertCurrency,
} from "../../services/exchangeRateService";

interface MovimientoFormProps {
  movimientos?: Movimiento[];
  onMovimientosAdded: (movimientos: Omit<Movimiento, "id">[]) => void;
  onMovimientosUpdated: (movimientos: Omit<Movimiento, "id">[]) => void;
  onCancel: () => void;
}

const MovimientoForm: React.FC<MovimientoFormProps> = ({
  movimientos,
  onMovimientosAdded,
  onMovimientosUpdated,
  onCancel,
}) => {
  const [polizaId, setPolizaId] = useState(
    movimientos?.[0]?.polizaId.toString() || ""
  );
  const [movimiento1, setMovimiento1] = useState({
    cuentaContable: movimientos?.[0]?.cuentaContable || "",
    descripcion: movimientos?.[0]?.descripcion || "",
    cargo: movimientos?.[0]?.cargo.toString() || "0",
    abono: movimientos?.[0]?.abono.toString() || "0",
  });
  const [movimiento2, setMovimiento2] = useState({
    cuentaContable: movimientos?.[1]?.cuentaContable || "",
    descripcion: movimientos?.[1]?.descripcion || "",
    cargo: movimientos?.[1]?.cargo.toString() || "0",
    abono: movimientos?.[1]?.abono.toString() || "0",
  });
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {}
  );
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [polizaFecha, setPolizaFecha] = useState("");
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPolizas = await getPolizas();
      setPolizas(fetchedPolizas);
      if (polizaId) {
        const selectedPoliza = fetchedPolizas.find(
          (p) => p.id.toString() === polizaId
        );
        if (selectedPoliza) {
          setPolizaFecha(selectedPoliza.fecha);
        }
      }

      const fetchedCuentasContables = await getCuentasContables();
      setCuentasContables(fetchedCuentasContables);

      try {
        const data = await getExchangeRates();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
    };
    fetchData();
  }, [polizaId]);

  const handleMovimientoChange = (
    movimientoNumber: 1 | 2,
    field: string,
    value: string
  ) => {
    const setMovimiento =
      movimientoNumber === 1 ? setMovimiento1 : setMovimiento2;
    setMovimiento((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotal = (movimiento: typeof movimiento1) => {
    return parseFloat(movimiento.cargo) + parseFloat(movimiento.abono);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total1 = calculateTotal(movimiento1);
    const total2 = calculateTotal(movimiento2);

    if (total1 !== total2) {
      alert(
        "La suma total del movimiento 1 debe ser igual a la suma total del movimiento 2"
      );
      return;
    }

    const updatedMovimientos = [
      {
        ...movimiento1,
        polizaId: parseInt(polizaId),
        fecha: polizaFecha,
        cargo: parseFloat(movimiento1.cargo),
        abono: parseFloat(movimiento1.abono),
      },
      {
        ...movimiento2,
        polizaId: parseInt(polizaId),
        fecha: polizaFecha,
        cargo: parseFloat(movimiento2.cargo),
        abono: parseFloat(movimiento2.abono),
      },
    ];

    // Update cuentas contables
    updatedMovimientos.forEach((movimiento) => {
      updateCuentaContable(
        movimiento.cuentaContable,
        movimiento.cargo,
        movimiento.abono,
        movimiento.descripcion,
        movimiento.fecha
      );
    });

    if (movimientos) {
      onMovimientosUpdated(updatedMovimientos);
    } else {
      onMovimientosAdded(updatedMovimientos);
    }
  };

  const renderMovimientoRow = (movimientoNumber: 1 | 2) => {
    const movimiento = movimientoNumber === 1 ? movimiento1 : movimiento2;
    return (
      <tr>
        <td className="border px-2 py-1">
          <select
            value={movimiento.cuentaContable}
            onChange={(e) =>
              handleMovimientoChange(
                movimientoNumber,
                "cuentaContable",
                e.target.value
              )
            }
            className="w-full p-1 text-sm border rounded"
            required
          >
            <option value="">Seleccione</option>
            {cuentasContables.map((cuenta) => (
              <option key={cuenta.id} value={cuenta.id}>
                {cuenta.nombre}
              </option>
            ))}
          </select>
        </td>
        <td className="border px-2 py-1">
          <input
            type="text"
            value={movimiento.descripcion}
            onChange={(e) =>
              handleMovimientoChange(
                movimientoNumber,
                "descripcion",
                e.target.value
              )
            }
            className="w-full p-1 text-sm border rounded"
            required
          />
        </td>
        <td className="border px-2 py-1">
          <input
            type="number"
            value={movimiento.cargo}
            onChange={(e) =>
              handleMovimientoChange(movimientoNumber, "cargo", e.target.value)
            }
            className="w-full p-1 text-sm border rounded"
          />
        </td>
        <td className="border px-2 py-1">
          <input
            type="number"
            value={movimiento.abono}
            onChange={(e) =>
              handleMovimientoChange(movimientoNumber, "abono", e.target.value)
            }
            className="w-full p-1 text-sm border rounded"
          />
        </td>
      </tr>
    );
  };

  const total1 = calculateTotal(movimiento1);
  const total2 = calculateTotal(movimiento2);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="polizaId"
          className="block text-sm font-medium text-gray-700"
        >
          Póliza
        </label>
        <select
          id="polizaId"
          value={polizaId}
          onChange={(e) => {
            setPolizaId(e.target.value);
            const selectedPoliza = polizas.find(
              (p) => p.id.toString() === e.target.value
            );
            if (selectedPoliza) {
              setPolizaFecha(selectedPoliza.fecha);
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">Seleccione una póliza</option>
          {polizas.map((poliza) => (
            <option key={poliza.id} value={poliza.id}>
              {poliza.numeropoliza} - {poliza.descripcion} ({poliza.fecha})
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Cuenta Contable</th>
            <th className="border px-2 py-1">Descripción</th>
            <th className="border px-2 py-1">Cargo</th>
            <th className="border px-2 py-1">Abono</th>
          </tr>
        </thead>
        <tbody>
          {renderMovimientoRow(1)}
          {renderMovimientoRow(2)}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td colSpan={2} className="border px-2 py-1 text-right">
              Sumas Iguales:
            </td>
            <td className="border px-2 py-1 text-right">{total1.toFixed(2)}</td>
            <td className="border px-2 py-1 text-right">{total2.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="flex items-center space-x-2 text-sm">
        <label className="whitespace-nowrap">Moneda:</label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="border rounded p-1"
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span className="ml-2">
          Total en {selectedCurrency}:{" "}
          {convertCurrency(
            total1,
            "MXN",
            selectedCurrency,
            exchangeRates
          ).toFixed(2)}
        </span>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar Movimientos
        </button>
      </div>
    </form>
  );
};

export default MovimientoForm;
