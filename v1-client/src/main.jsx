import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute.jsx"; // Import PrivateRoute component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/notfound" element={<NotFoundPage />}></Route>
      {/* Use PrivateRoute for protected routes */}

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
