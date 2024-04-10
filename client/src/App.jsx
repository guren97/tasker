import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
