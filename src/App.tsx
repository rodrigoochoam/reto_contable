import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideNav from "./components/UI/SideNav/SideNav";
import PolizasList from "./components/Polizas/PolizasList";
import MovimientosPage from "./components/Movimientos/MovimientosPage";
import CuentasContablesPage from "./components/CuentasContablesPage/CuentasContablesPage";
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";
import { initializeCuentasContables } from "./lib/api/movimientosApi";

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    initializeCuentasContables();
  }, []);

  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-100">
        <div className="md:block">
          <SideNav />
        </div>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate replace to="/polizas" />} />
            <Route
              path="/polizas"
              element={<PolizasList refreshKey={refreshKey} />}
            />
            <Route path="/movimientos" element={<MovimientosPage />} />
            <Route
              path="/cuentas-contables"
              element={<CuentasContablesPage />}
            />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
