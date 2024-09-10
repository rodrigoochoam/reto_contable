import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { PowerIcon } from "@heroicons/react/24/outline";
import logoContpaq from "../../../assets/logo_contpaqi.png"; // Import the logo

const SideNav: React.FC = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-md bg-white p-4 md:h-40"
        to="/"
      >
        <div className="w-32 md:w-40">
          <img src={logoContpaq} alt="ContSys Logo" className="w-full h-auto" />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Cerrar Sesión</div>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
