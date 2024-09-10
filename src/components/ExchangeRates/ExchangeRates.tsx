import React, { useState, useEffect } from "react";
import { getExchangeRates } from "../../services/exchangeRateService";

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        const data = await getExchangeRates();
        setRates(data.rates);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los tipos de cambio");
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  if (loading) return <div>Cargando tipos de cambio...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Tipos de Cambio</h2>
      <ul>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency} className="mb-2">
            {currency}: {rate.toFixed(4)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRates;
