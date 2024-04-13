import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggler from "../ThemeToggler.jsx";
import logo_dark from "../../assets/logo/logo_dark.png";
import logo_light from "../../assets/logo/logo_light.png";
import { useDispatch, useSelector } from "react-redux";

import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";

const Header = () => {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Redux selector to get user info
  const { userInfo } = useSelector((state) => state.auth);

  // Navigation hook
  const navigate = useNavigate();

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Logout mutation hook
  const [logoutApiCall] = useLogoutMutation();

  // Function to handle logout
  const logoutHandler = async () => {
    try {
      setTimeout(async () => {
        // Call logout API mutation
        await logoutApiCall();

        // Dispatch logout action to clear user info from Redux store
        dispatch(logout());

        // Navigate to home page after logout
        navigate("/", { replace: true });
      }, 1000); // 1 second timeout
    } catch (error) {
      console.log(error);
    }
  };

  // Function to toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Effect hook to set initial dark mode based on system preference
  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

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
            <>
              <ul
                className={`flex space-x-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <li className="relative">
                  <Link to="#" className="cursor-pointer">
                    {userInfo.username}
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
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
            </>
          )}

          <ThemeToggler toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
