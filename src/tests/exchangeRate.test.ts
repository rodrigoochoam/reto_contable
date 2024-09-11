import { convertCurrency } from "../lib/api/exchangeRateService";

describe("exchangeRateService", () => {
  test("convertCurrency correctly converts currencies", () => {
    const mockRates = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.75,
    };

    expect(convertCurrency(100, "USD", "EUR", mockRates)).toBeCloseTo(85, 2);
    expect(convertCurrency(100, "EUR", "USD", mockRates)).toBeCloseTo(
      117.65,
      2
    );
    expect(convertCurrency(100, "USD", "GBP", mockRates)).toBeCloseTo(75, 2);
    expect(convertCurrency(100, "USD", "USD", mockRates)).toBe(100);
  });
});
