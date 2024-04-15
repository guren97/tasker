import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <div
      className="w-full bg-gray-50 overflow-y-auto"
      style={{ OverflowStyle: "none", scrollbarWidth: "none" }}
    >
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-6 lg:px-6">
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
