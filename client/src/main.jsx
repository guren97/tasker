import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import store from "./redux/store/store.js";
import { Provider } from "react-redux";

// Pages
import Home from "./pages/Home/Home.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Dashboard from "./pages/Private_Dashboard/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

{
  /* 
// import store from "./store/store.js";
// import { Provider } from "react-redux";
// import PrivateRoute from "./components/PrivateRoute.jsx"; // Import PrivateRoute component
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/notfound" element={<NotFoundPage />}></Route>
      {/* Use PrivateRoute for protected routes  
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>{" "}
      */
}
