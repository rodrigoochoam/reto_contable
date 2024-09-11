import { render, fireEvent, waitFor } from "@testing-library/react";
import PolizaForm from "../components/Polizas/PolizaForm";
import { addPoliza } from "../lib/api/polizasApi";
import { jest } from "@jest/globals";

jest.mock("../lib/api/polizasApi");

describe("PolizaForm", () => {
  test("submits form with correct data", async () => {
    const mockAddPoliza = addPoliza as jest.MockedFunction<typeof addPoliza>;
    mockAddPoliza.mockResolvedValue({
      id: 1,
      numeropoliza: "POL001",
      fecha: "2023-05-01",
      descripcion: "Test Poliza",
    });

    const onPolizaAdded = jest.fn();
    const { getByLabelText, getByText } = render(
      <PolizaForm onPolizaAdded={onPolizaAdded} />
    );

    fireEvent.change(getByLabelText(/Número de Póliza/i), {
      target: { value: "POL001" },
    });
    fireEvent.change(getByLabelText(/Fecha/i), {
      target: { value: "2023-05-01" },
    });
    fireEvent.change(getByLabelText(/Descripción/i), {
      target: { value: "Test Poliza" },
    });

    fireEvent.click(getByText(/Guardar/i));

    await waitFor(() => {
      expect(mockAddPoliza).toHaveBeenCalledWith({
        numeropoliza: "POL001",
        fecha: "2023-05-01",
        descripcion: "Test Poliza",
      });
      expect(onPolizaAdded).toHaveBeenCalled();
    });
  });
});
