import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <div
      className="app-container w-full bg-gray-100 overflow-y-auto"
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
