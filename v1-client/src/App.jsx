import { Outlet } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="h-screen overflow-hidden relative">
        <Toaster />
        <Outlet />
      </div>
    </>
  );
}

export default App;
