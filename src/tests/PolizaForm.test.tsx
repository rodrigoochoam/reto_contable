import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import PolizaForm from "../components/Polizas/PolizaForm";
import { addPoliza } from "../lib/api/polizasApi";

jest.mock("../lib/api/polizasApi");

describe("PolizaForm", () => {
  test("renders form fields", () => {
    render(<PolizaForm onPolizaAdded={() => {}} />);

    expect(screen.getByLabelText(/Fecha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de Póliza/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Agregar Póliza/i })
    ).toBeInTheDocument();
  });

  test("updates input values on change", () => {
    render(<PolizaForm onPolizaAdded={() => {}} />);

    const fechaInput = screen.getByLabelText(/Fecha/i);
    const descripcionInput = screen.getByLabelText(/Descripción/i);
    const numeropolizaInput = screen.getByLabelText(/Número de Póliza/i);

    fireEvent.change(fechaInput, { target: { value: "2023-05-01" } });
    fireEvent.change(descripcionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.change(numeropolizaInput, { target: { value: "POL001" } });

    expect(fechaInput).toHaveValue("2023-05-01");
    expect(descripcionInput).toHaveValue("Test Description");
    expect(numeropolizaInput).toHaveValue("POL001");
  });

  test("calls onPolizaAdded when form is submitted", async () => {
    const mockAddPoliza = addPoliza as jest.MockedFunction<typeof addPoliza>;
    mockAddPoliza.mockResolvedValue({
      id: 1,
      fecha: "2023-05-01",
      descripcion: "Test Description",
      numeropoliza: "POL001",
    });

    const mockOnPolizaAdded = jest.fn();
    render(<PolizaForm onPolizaAdded={mockOnPolizaAdded} />);

    const fechaInput = screen.getByLabelText(/Fecha/i);
    const descripcionInput = screen.getByLabelText(/Descripción/i);
    const numeropolizaInput = screen.getByLabelText(/Número de Póliza/i);
    const submitButton = screen.getByRole("button", {
      name: /Agregar Póliza/i,
    });

    fireEvent.change(fechaInput, { target: { value: "2023-05-01" } });
    fireEvent.change(descripcionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.change(numeropolizaInput, { target: { value: "POL001" } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockAddPoliza).toHaveBeenCalledWith({
        fecha: "2023-05-01",
        descripcion: "Test Description",
        numeropoliza: "POL001",
      });
      expect(mockOnPolizaAdded).toHaveBeenCalledTimes(1);
    });
  });
});

/* import { render, fireEvent, waitFor } from "@testing-library/react";
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
 */
