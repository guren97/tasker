import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_dark from "../../assets/logo/logo_dark.png";
import logo_light from "../../assets/logo/logo_light.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      setTimeout(async () => {
        await logoutApiCall();
        dispatch(logout());
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  return (
    <>
      <nav className="flex items-center align-middle justify-between flex-wrap bg-slate-600 p-2 px-10 min-w-96">
        <div className="flex items-center align-middle flex-shrink-0 text-white mr-6">
          <img
            className="h-8 w-8 mr-2"
            src={isDarkMode ? logo_light : logo_dark}
            alt="Logo"
          />
          <span className="font-semibold text-xl tracking-tight">Tasker</span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center px-3 py-2 border rounded text-slate-200 border-white hover:border-transparent hover:text-slate-800 hover:bg-slate-300"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full h-auto lg:flex lg:items-center lg:w-auto lg:justify-between relative `}
        >
          <div className="text-sm lg:flex-grow mr-3">
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white mr-4 font-medium"
              to="/dashboard"
            >
              Home
            </Link>
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white mr-4 font-medium"
              to="/#"
            >
              Link
            </Link>
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white mr-4 font-medium"
              to="/mytasks"
            >
              Tasks
            </Link>
          </div>
          <div className="text-sm lg:flex-grow mr-3">
            {userInfo && (
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-slate-300 mr-4 font-bold"
                to="/profile"
              >
                {userInfo.username}
              </Link>
            )}
          </div>
          <div>
            <Link
              className="inline-block text-xs px-2 p-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-slate-800 hover:bg-slate-300  lg:mt-0 sm:w-full"
              to="#"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
