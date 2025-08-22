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
    "bg-white/80 text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200";

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
      {/* Background image with overlay */}
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/60 to-gray-100/70 backdrop-blur-sm"></div>
        {/* Main content */}
        <div className="relative w-full max-w-xl mx-auto my-8 p-8 rounded-3xl shadow-xl bg-white/90 border border-gray-200 backdrop-blur z-10">
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
        <footer className="relative mt-8 text-center text-sm text-gray-400 z-10">
          &copy; {new Date().getFullYear()} Medical Doc Exchange • Secure & Minimal
        </footer>
      </div>
    </BrowserRouter>
  );
}
