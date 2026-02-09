"use client";

import { useState } from "react";
import { imageToPdf } from "@/lib/pdfUtils";

export default function JPGtoPDF() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function convert(file: File) {
    try {
      setLoading(true);
      setError("");
      setDownloadUrl(null);

      // 🔒 SECURITY — size limit
      if (file.size > 5 * 1024 * 1024) {
        setError("File too large (max 5MB)");
        setLoading(false);
        return;
      }

      // 🔒 SECURITY — image only
      if (!file.type.startsWith("image/")) {
        setError("Only image files allowed");
        setLoading(false);
        return;
      }

      const blob = await imageToPdf(file);
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setError("Conversion failed");
    } finally {
      setLoading(false);
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (loading) return;

    const file = e.target.files?.[0];
    if (file) convert(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    if (loading) return;

    const file = e.dataTransfer.files[0];
    if (file) convert(file);
  }

  return (
    <main style={container}>
      <h1 style={title}>JPG → PDF Converter</h1>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={dropZone}
      >
        <label style={button(loading)}>
          {loading ? "Converting..." : "Choose JPG Image"}
          <input
            type="file"
            accept="image/jpeg"
            hidden
            disabled={loading}
            onChange={handleFile}
          />
        </label>

        <p style={{ marginTop: "12px", color: "#050505" }}>
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

const container = {
  padding: "60px 20px",
  textAlign: "center" as const,
  backgroundColor: "#f5f5f5",
  minHeight: "80vh",
};

const title = {
  fontSize: "32px",
  marginBottom: "30px",
};

const dropZone = {
  border: "2px dashed #aaa",
  borderRadius: "10px",
  padding: "40px",
  backgroundColor: "white",
  maxWidth: "400px",
  margin: "auto",
};

const button = (loading: boolean) => ({
  display: "inline-block",
  backgroundColor: loading ? "#999" : "#0070f3",
  color: "white",
  padding: "14px 24px",
  borderRadius: "6px",
  cursor: loading ? "not-allowed" : "pointer",
  fontSize: "18px",
  fontWeight: "bold",
});

const errorStyle = {
  color: "red",
  marginTop: "20px",
};

const downloadBtn = {
  display: "inline-block",
  marginTop: "20px",
  backgroundColor: "#28a745",
  color: "white",
  padding: "12px 20px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};
