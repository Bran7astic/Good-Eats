import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Details from "./screens/details/Details.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
