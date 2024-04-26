import { Dialog } from "@mui/material";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import logo from "/src/assets/images/logo.png"

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "الخدمات", href: "/#services" },
  { name: "استمارة ذوي الشهداء", href: "IdentityForm" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (href: string) => {
    if (href === "/#services") {
      const element = document.getElementById("services");

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };
  return (
    <header className="relative z-50">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="flex gap-4 items-center -m-1.5 p-1.5">
            <img
              className="h-12 w-auto p-1 bg-yellow-500 rounded-full"
              src={logo}
              alt="logo"
            />
            <h3 className="text-xl font-bold text-zinc-800">حِمى</h3>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="text-lg font-semibold leading-6 text-slate-800 transition-colors pb-1 border-b-2 border-transparent hover:text-teal-600 hover:border-teal-600 "
              style={({ isActive }) =>
                isActive && item?.href !== navigation[1].href
                  ? { color: "#0d9488", borderColor: "#0d9488" }
                  : {}
              }
              onClick={() => handleClick(item.href)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="IdentityForm"
            className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            استمارة ذوي الشهداء
          </Link>
        </div>
      </nav>
      <Dialog
        // as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="#" className="flex gap-4 items-center -m-1.5 p-1.5">
              <img
                className="h-12 w-auto"
                src="/src/assets/images/logo.png"
                alt=""
              />
              <h3 className="text-lg font-semibold">الحشد الشعبي</h3>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-col gap-4 space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="block text-lg font-semibold leading-6 text-slate-800 transition-colors pb-1 border-b-2 border-transparent hover:text-teal-600 hover:border-teal-600 "
                    onClick={() => handleClick(item.href)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to={"IdentityForm"}
                  className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  استمارة ذوي الشهداء
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
