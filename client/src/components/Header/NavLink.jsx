import { Link } from "react-router-dom";

const NavLink = ({ to, children, className }) => {
  return (
    <Link
      className={`flex items-center text-sm font-semibold leading-6  ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default NavLink;
