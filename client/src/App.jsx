import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <div
      className="w-full bg-gray-50 overflow-y-auto"
      style={{ "-ms-overflow-style": "none", "scrollbar-width": "none" }}
    >
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-6 lg:px-6">
        <Outlet />
      </main>
      <style>
        {`
           
          ::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge, and Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        `}
      </style>
    </div>
  );
}

export default App;
