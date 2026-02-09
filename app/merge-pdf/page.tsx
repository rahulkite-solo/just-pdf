"use client";

import { useState } from "react";
import { mergePdfs } from "@/lib/pdfUtils";

export default function MergePDF() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function convert(files: File[]) {
    try {
      setLoading(true);
      setError("");
      setDownloadUrl(null);

      if (files.length < 2) {
        setError("Select at least 2 PDF files");
        return;
      }

      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          setError("Each file must be under 5MB");
          return;
        }

        if (file.type !== "application/pdf") {
          setError("Only PDF files allowed");
          return;
        }
      }

      const blob = await mergePdfs(files);
      setDownloadUrl(URL.createObjectURL(blob));
    } catch {
      setError("Merge failed");
    } finally {
      setLoading(false);
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (loading) return;

    const files = Array.from(e.target.files || []);
    if (files.length) convert(files);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (loading) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length) convert(files);
  }

  return (
    <main style={container}>
      <h1 style={title}>Merge PDF</h1>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={dropZone}
      >
        <label style={button(loading)}>
          {loading ? <Spinner /> : "Choose PDF"}
          <input
            type="file"
            accept="application/pdf"
            multiple
            hidden
            disabled={loading}
            onChange={handleFile}
          />
        </label>

        <p style={{ marginTop: "12px", color: "#7b7a7a" }}>
          or drag & drop PDFs here
        </p>
      </div>

      {error && <p style={errorStyle}>{error}</p>}

      {downloadUrl && (
        <a href={downloadUrl} download="merged.pdf" style={downloadBtn}>
          Download Merged PDF
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
  color: "#111",
  fontWeight: "bold",
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

