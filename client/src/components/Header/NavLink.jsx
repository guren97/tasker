import { Link } from "react-router-dom";

const NavLink = ({ to, children, className, onClick }) => {
  return (
    <Link
      className={`flex items-center text-sm font-semibold leading-6  ${className}`}
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
