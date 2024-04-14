import { IoSunny, IoMoon } from "react-icons/io5";
import { motion } from "framer-motion";

const ThemeToggler = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="sm:hidden md:inline-block lg:inline-block">
      <div
        className="ml-5 p-1 flex items-center justify-center align-middle hover:bg-teal-200 dark:hover:bg-neutral-300 rounded-lg transition duration-200"
        onClick={toggleTheme} // Move the onClick event to the outer div
      >
        <motion.div whileTap={{ scale: 0.8 }}>
          {/* Use <div> instead of <button> */}
          {isDarkMode ? (
            <IoSunny className="text-white hover:text-black text-2xl" />
          ) : (
            <IoMoon className="text-black hover:text-black text-2xl" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeToggler;
