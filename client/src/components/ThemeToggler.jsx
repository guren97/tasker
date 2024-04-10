import { IoSunny, IoMoon } from "react-icons/io5";
import { motion } from "framer-motion";

const ThemeToggler = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      className="sm:hidden md:inline-block lg:inline-block"
      onClick={toggleTheme} // Call the toggleTheme function passed as prop
    >
      <div className="ml-5 p-1 flex items-center justify-center align-middle hover:bg-neutral-200 dark:hover:bg-neutral-300 rounded-lg transition duration-200">
        {isDarkMode ? (
          <motion.button whileTap={{ scale: 0.8 }}>
            <IoSunny className="text-white hover:text-black text-2xl" />
          </motion.button>
        ) : (
          <motion.button whileTap={{ scale: 0.8 }}>
            <IoMoon className="text-white hover:text-black text-2xl" />
          </motion.button>
        )}
      </div>
    </button>
  );
};

export default ThemeToggler;
