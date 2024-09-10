import React, { useState, useEffect } from "react";
import { CuentaContable } from "../../types/movimiento";
import { getCuentasContables } from "../../lib/api/movimientosApi";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined"; // Activo
import PeopleOutlined from "@mui/icons-material/PeopleOutlined"; // Clientes
import GroupOutlined from "@mui/icons-material/GroupOutlined"; // Proveedores
import InventoryOutlined from "@mui/icons-material/InventoryOutlined"; // Inventario
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined"; // Capital
import BuildOutlined from "@mui/icons-material/BuildOutlined"; // Equipo
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined"; // Ingresos
import ShoppingCartCheckoutOutlined from "@mui/icons-material/ShoppingCartCheckoutOutlined"; // Gastos
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";

const CuentasContablesPage: React.FC = () => {
  const [cuentasContables, setCuentasContables] = useState<CuentaContable[]>(
    []
  );

  useEffect(() => {
    const fetchCuentasContables = async () => {
      const data = await getCuentasContables();
      setCuentasContables(data);
    };
    fetchCuentasContables();
  }, []);

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case "Bancos":
        return <AccountBalanceOutlined />;
      case "Pasivo":
        return <GroupOutlined />;
      case "Capital Social":
        return <MonetizationOnOutlined />;
      case "Gastos":
        return <ShoppingCartCheckoutOutlined />;
      case "Ingresos":
        return <AttachMoneyOutlined />;
      case "Inventario":
        return <InventoryOutlined />;
      case "Clientes":
        return <PeopleOutlined />;
      case "Proveedores":
        return <BuildOutlined />;
      case "Equipo":
        return <PrecisionManufacturingOutlinedIcon />;
      default:
        return null;
    }
  };

  const renderTAccount = (cuenta: CuentaContable) => (
    <div
      key={cuenta.id}
      className="border-2 border-gray-300 rounded-lg p-4 mb-4 bg-white flex items-center"
    >
      <div className="mr-4">{getIconByType(cuenta.nombre)}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-center border-b-2 border-gray-300 pb-2 mb-2">
          {cuenta.nombre} ({cuenta.id})
        </h3>
        <div className="flex">
          <div className="w-1/2 border-r border-gray-300 pr-2">
            <h4 className="font-semibold text-center">Debe</h4>$
            {Intl.NumberFormat("en-US").format(cuenta.saldoDebe)}
          </div>
          <div className="w-1/2 pl-2">
            <h4 className="font-semibold text-center">Haber</h4>$
            {Intl.NumberFormat("en-US").format(cuenta.saldoHaber)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Cuentas Contables
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cuentasContables.map(renderTAccount)}
      </div>
    </div>
  );
};

export default CuentasContablesPage;
