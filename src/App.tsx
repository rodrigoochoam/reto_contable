import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./components/UI/SideNav/SideNav";
import PolizasList from "./components/Polizas/PolizasList";
import MovimientosPage from "./components/Movimientos/MovimientosPage";
import CuentasContablesPage from "./components/CuentasContablesPage/CuentasContablesPage";
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";
const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Router>
      <div className="flex h-screen w-screen bg-gray-100">
        <SideNav />
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-2xl font-bold">
                  Bienvenido al Sistema de Contabilidad
                </h1>
              }
            />
            <Route
              path="/polizas"
              element={
                <>
                  <PolizasList refreshKey={refreshKey} />
                </>
              }
            />
            <Route
              path="/movimientos"
              element={
                <>
                  <MovimientosPage />
                </>
              }
            />
            <Route
              path="/cuentas-contables"
              element={
                <>
                  <CuentasContablesPage />
                </>
              }
            />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
