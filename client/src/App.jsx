import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import "react-toastify/ReactToastify.css";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
