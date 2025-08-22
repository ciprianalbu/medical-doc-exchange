import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Upload from "./pages/Upload";
import Retrieve from "./pages/Retrieve";

function NavButtons() {
  const location = useLocation();

  const isUpload = location.pathname === "/";
  const isRetrieve = location.pathname === "/retrieve";

  const base =
    "px-4 py-2 rounded font-semibold transition-colors focus:outline-none";
  const active =
    "bg-blue-600 text-white shadow";
  const inactive =
    "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700";

  return (
    <nav className="mb-6 flex space-x-4">
      <Link to="/">
        <button
          className={`${base} ${isUpload ? active : inactive}`}
          type="button"
        >
          Upload
        </button>
      </Link>
      <Link to="/retrieve">
        <button
          className={`${base} ${isRetrieve ? active : inactive}`}
          type="button"
        >
          Retrieve
        </button>
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold my-4">Medical Document Exchange</h1>
        <NavButtons />
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/retrieve" element={<Retrieve />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
