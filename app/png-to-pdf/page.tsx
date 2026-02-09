"use client";

import { useState } from "react";
import { imageToPdf } from "@/lib/pdfUtils";

export default function PNGtoPDF() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function convert(file: File) {
    try {
      setLoading(true);
      setError("");
      setDownloadUrl(null);

      if (file.size > 5 * 1024 * 1024) {
        setError("File too large (max 5MB)");
        return;
      }

      if (!file.type.includes("png")) {
        setError("Only PNG images allowed");
        return;
      }

      const blob = await imageToPdf(file);
      setDownloadUrl(URL.createObjectURL(blob));
    } catch {
      setError("Conversion failed");
    } finally {
      setLoading(false);
    }
  }

  function handleFile(e: any) {
    if (loading) return;
    const file = e.target.files?.[0];
    if (file) convert(file);
  }

  function handleDrop(e: any) {
    e.preventDefault();
    if (loading) return;
    const file = e.dataTransfer.files[0];
    if (file) convert(file);
  }

  return (
    <main style={container}>
      <h1 style={title}>PNG → PDF Converter</h1>

      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} style={dropZone}>
        <label style={button(loading)}>
          {loading ? <Spinner /> : "Choose PNG Image"}
          <input hidden type="file" accept="image/png" onChange={handleFile} />
        </label>

        <p style={{ marginTop: "12px", color: "#7b7a7a" }}>
          or drag & drop image here
        </p>
      </div>

      {error && <p style={errorStyle}>{error}</p>}

      {downloadUrl && (
        <a href={downloadUrl} download="converted.pdf" style={downloadBtn}>
          Download PDF
        </a>
      )}
    </main>
  );
}

const container = { padding: "60px 20px", textAlign: "center" as const, backgroundColor: "#f5f5f5", minHeight: "80vh" };
const title = { fontSize: "32px", marginBottom: "30px", color: "#111", fontWeight: "bold" };
const dropZone = { border: "2px dashed #aaa", borderRadius: "10px", padding: "40px", backgroundColor: "white", maxWidth: "400px", margin: "auto" };
const button = (loading: boolean) => ({ display: "inline-block", backgroundColor: loading ? "#999" : "#0070f3", color: "white", padding: "14px 24px", borderRadius: "6px", cursor: loading ? "not-allowed" : "pointer", fontSize: "18px", fontWeight: "bold" });
const errorStyle = { color: "red", marginTop: "20px" };
const downloadBtn = { display: "inline-block", marginTop: "20px", backgroundColor: "#28a745", color: "white", padding: "12px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" };

function Spinner() {
  return (
    <div style={spinner}></div>
  );
}

const spinner = {
  width: "30px",
  height: "30px",
  border: "4px solid #ddd",
  borderTop: "4px solid #0070f3",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};
