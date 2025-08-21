import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Upload from "./pages/Upload";
import Retrieve from "./pages/Retrieve";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold my-4">Medical Document Exchange</h1>
        <nav className="mb-6 flex space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Upload</Link>
          <Link to="/retrieve" className="text-blue-600 hover:underline">Retrieve</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/retrieve" element={<Retrieve />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
