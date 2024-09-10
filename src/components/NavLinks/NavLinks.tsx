import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const links = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Pólizas", href: "/polizas", icon: DocumentDuplicateIcon },
  { name: "Movimientos", href: "/movimientos", icon: CurrencyDollarIcon },
  {
    name: "Cuentas Contables",
    href: "/cuentas-contables",
    icon: CurrencyDollarIcon,
  },
  { name: "Exchange Rates", href: "/exchange-rates", icon: CurrencyDollarIcon },
];

const NavLinks: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": location.pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
