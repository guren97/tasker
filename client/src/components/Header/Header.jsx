import { IoCaretDownOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice.js";
import { logout } from "../../redux/slices/authSlice.js";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavLink from "./NavLink.jsx";
import logo_dark from "../../assets/logo/logo_dark.svg";

const Header = () => {
  // Toggle menu for mobile view - small screen
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleMenu = () => {
    setIsOpen(!isOpen); // Toggle isOpen state
  };

  useEffect(() => {
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
          {userInfo ? (
            <div className="relative flex gap-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </div>
          ) : (
            <div className="relative flex gap-4">
              <NavLink to="/">Home</NavLink>
            </div>
          )}
        </div>

        {userInfo ? (
          <>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-1">
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center ">
                      <DropdownMenuLabel>{userInfo.username}</DropdownMenuLabel>
                      <IoCaretDownOutline />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <NavLink to="/profile">Profile</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
              <NavLink
                to="/login"
                className={`border px-3 py-1 rounded-md hover:bg-gray-100`}
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className={`bg-slate-800 text-white px-3 py-1 rounded-md hover:bg-slate-700`}
              >
                Sign up
              </NavLink>
            </div>
          </>
        )}
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden transition-all duration-150"
          role="dialog"
          aria-modal="true"
        >
          {/* Background backdrop */}
          <div
            className="fixed inset-0 z-10 bg-gray-900/30 bg-blend-color-burn"
            onClick={() => setIsOpen(!isOpen)}
          ></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="" className="-m-1.5 p-1.5">
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
                {userInfo ? (
                  <div className="space-y-2 py-4">
                    <Link
                      to="/"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </Link>
                    <Link
                      to="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 py-6">
                    <Link
                      to="/"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </Link>
                  </div>
                )}

                {userInfo ? (
                  // If user is logged in, show logout button
                  <div className="py-6">
                    <Link
                      onClick={logoutHandler}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  // If user is not logged in, show login and signup buttons
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
