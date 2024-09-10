import axios from "axios";

/* const API_KEY = "2ad4b0cf7c0ddae47687bdb6d0921bed";
const BASE_URL = "http://api.exchangeratesapi.io/v1"; */

interface ExchangeRateResponse {
  rates: { [key: string]: number };
  base: string;
  date: string;
}

export async function getExchangeRates(): Promise<ExchangeRateResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/latest`, {
      params: {
        access_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: { [key: string]: number }
): number {
  if (fromCurrency === toCurrency) return amount;
  const rate = rates[toCurrency] / rates[fromCurrency];
  return amount * rate;
}
