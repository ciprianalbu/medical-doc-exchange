import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setLoading(false);
    setCode(data.code || "");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md">
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={e => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading || !file}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {code && (
        <div className="mt-4 p-2 border bg-gray-50 rounded text-center">
          <span className="font-semibold">Share this code:</span>
          <div className="text-xl font-mono mt-2">{code}</div>
          <div className="text-xs mt-1 text-gray-500">Expires in 24 hours</div>
        </div>
      )}
    </div>
  );
}
