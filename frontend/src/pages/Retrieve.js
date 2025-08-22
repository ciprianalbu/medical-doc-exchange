import React, { useState } from "react";

export default function Retrieve() {
  const [code, setCode] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");

  const handleRetrieve = async (e) => {
    e.preventDefault();
    setError("");
    setFileUrl("");
    setFilename("");
    if (!code) return;
    // Get file info
    const res = await fetch(`/api/info/${code}`);
    if (!res.ok) {
      setError("Code not found or expired.");
      return;
    }
    const data = await res.json();
    setFilename(data.filename);
    setFileUrl(`/api/retrieve/${code}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md">
      <form onSubmit={handleRetrieve} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter code (e.g. NA123VS)"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          className="border p-2 rounded font-mono"
          maxLength={7}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retrieve
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {fileUrl && (
        <div className="mt-4 text-center">
          <div className="font-semibold mb-2">{filename}</div>
          {filename.match(/\.(jpg|jpeg|png|gif)$/i) ? (
            <img src={fileUrl} alt="Preview" className="max-w-full max-h-64 mx-auto" />
          ) : filename.match(/\.pdf$/i) ? (
            <iframe src={fileUrl} width="100%" height="500px" title="PDF Preview"></iframe>
          ) : (
            <a
              href={fileUrl + "?download=1"}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
              download={filename}
            >
              Download file
            </a>
          )}
        </div>
      )}
    </div>
  );
}
