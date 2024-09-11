import { useForm } from "react-hook-form";
import { Poliza } from "../../types/poliza";
import { updatePoliza } from "../../lib/api/polizasApi";

interface EditPolizaFormProps {
  poliza: Poliza;
  onPolizaEdited: (updatedPoliza: Poliza) => void;
  onClose: () => void;
}

export function EditPolizaForm({
  poliza,
  onPolizaEdited,
  onClose,
}: EditPolizaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Poliza>({
    defaultValues: poliza,
  });

  const onSubmit = async (data: Poliza) => {
    try {
      const updatedPoliza = await updatePoliza(poliza.id, data);
      onPolizaEdited(updatedPoliza);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la póliza:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="fecha"
          className="block text-sm font-medium text-gray-700"
        >
          Fecha
        </label>
        <input
          type="date"
          id="fecha"
          {...register("fecha", { required: "Fecha es requerida" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.fecha && (
          <span className="text-red-500 text-xs">{errors.fecha.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="descripcion"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <input
          type="text"
          id="descripcion"
          {...register("descripcion", { required: "Descripción es requerida" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.descripcion && (
          <span className="text-red-500 text-xs">
            {errors.descripcion.message}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="numeropoliza"
          className="block text-sm font-medium text-gray-700"
        >
          Número de Póliza
        </label>
        <input
          type="text"
          id="numeropoliza"
          {...register("numeropoliza", {
            required: "Número de Póliza es requerido",
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.numeropoliza && (
          <span className="text-red-500 text-xs">
            {errors.numeropoliza.message}
          </span>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
