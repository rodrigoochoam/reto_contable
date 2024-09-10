import React, { useState } from "react";
import { addPoliza } from "../../services/polizaServiceLocal";

interface PolizaFormProps {
  onPolizaAdded: () => void;
}

const PolizaForm: React.FC<PolizaFormProps> = ({ onPolizaAdded }) => {
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [numeropoliza, setNumeropoliza] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPoliza({ fecha, descripcion, numeropoliza });
    setFecha("");
    setDescripcion("");
    setNumeropoliza("");
    onPolizaAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Agregar Nueva Póliza</h2>
      <div className="mb-4">
        <label htmlFor="fecha" className="block mb-2">
          Fecha:
        </label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numeropoliza" className="block mb-2">
          Número de Póliza:
        </label>
        <input
          type="text"
          id="numeropoliza"
          value={numeropoliza}
          onChange={(e) => setNumeropoliza(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Agregar Póliza
      </button>
    </form>
  );
};

export default PolizaForm;
