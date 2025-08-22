import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Upload from "./pages/Upload";
import Retrieve from "./pages/Retrieve";

function NavButtons() {
  const location = useLocation();
  const isUpload = location.pathname === "/";
  const isRetrieve = location.pathname === "/retrieve";
  const base =
    "px-5 py-2 rounded-full font-semibold transition-colors focus:outline-none shadow";
  const active =
    "bg-gradient-to-r from-blue-600 to-indigo-500 text-white";
  const inactive =
    "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200";

  return (
    <nav className="flex space-x-4 justify-center">
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
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100">
        <div className="w-full max-w-xl mx-auto my-8 p-8 rounded-3xl shadow-xl bg-white/90 border border-gray-200 backdrop-blur">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow">
            <span className="text-blue-600">Medical</span> Document Exchange
          </h1>
          <NavButtons />
          <div className="mt-8">
            <Routes>
              <Route path="/" element={<Upload />} />
              <Route path="/retrieve" element={<Retrieve />} />
            </Routes>
          </div>
        </div>
        <footer className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Medical Doc Exchange • Secure & Minimal
        </footer>
      </div>
    </BrowserRouter>
  );
}
