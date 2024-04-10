import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggler from "../ThemeToggler.jsx";
import logo_dark from "../../assets/logo/logo_dark.png";
import logo_light from "../../assets/logo/logo_light.png";
import { useDispatch, useSelector } from "react-redux";

import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      // Perform logout API call here
      // For example:
      await logoutApiCall(); // Make sure logoutApiCall is properly defined

      // Dispatch the logout action
      dispatch(logout());

      // Navigate to the home page
      navigate("/");
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

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav
      className={`flex items-center justify-center align-middle p-3 ${
        isDarkMode ? "bg-gray-800" : "bg-neutral-100"
      } transition-all duration-75`}
    >
      <div className="container mx-auto flex justify-between items-center align-middle">
        <div className="flex items-center">
          <img
            className="h-12"
            src={isDarkMode ? logo_light : logo_dark}
            alt="Logo"
          />
        </div>
        <div className="flex justify-between items-center align-middle">
          {userInfo ? (
            <ul
              className={`flex space-x-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <li>
                <h1 className="font-bold">{userInfo.username}</h1>
              </li>
              <li>
                <Link to="#" onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul
              className={`flex space-x-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}

          <ThemeToggler toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
