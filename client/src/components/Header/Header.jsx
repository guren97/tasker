import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo_dark from "../../assets/logo/logo_dark.svg";

import NavLink from "./NavLink.jsx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleMenu = () => {
    setIsOpen(!isOpen); // Toggle isOpen state
  };

  useEffect(() => {
    // Close the mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-gray-50 z-40 fixed w-full top-0 border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src={logo_dark} alt="logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={handleMenu} // Add onClick handler to toggle menu
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Navigation links */}
          <div className="relative">
            <NavLink to="/">Home</NavLink>
          </div>
          <NavLink to="/">Articles</NavLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <NavLink
            to="/login"
            className={`border px-3 py-1 rounded-md hover:bg-gray-200`}
          >
            Log in
          </NavLink>
          <NavLink
            to="/signup"
            className={`bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-400`}
          >
            Sign up
          </NavLink>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden transition-all duration-150"
          role="dialog"
          aria-modal="true"
        >
          {/* Background backdrop */}
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={logo_dark} alt="logo" />
              </Link>
              <button
                onClick={handleMenu}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {/* Product sub-menu */}
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Articles
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 "
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
