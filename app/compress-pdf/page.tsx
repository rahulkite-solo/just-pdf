"use client";

import { useState } from "react";
import { compressPdf } from "@/lib/pdfUtils";

export default function CompressPDF() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  async function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const blob = await compressPdf(file);
    setUrl(URL.createObjectURL(blob));
    setLoading(false);
  }

  return (
    <main style={container}>
      <h1 style={title}>Compress PDF</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
      />

      {url && (
        <a href={url} download="compressed.pdf" style={downloadBtn}>
          Download Compressed PDF
        </a>
      )}
    </main>
  );
}

const container = { padding: "60px", textAlign: "center" as const, backgroundColor: "#f5f5f5", minHeight: "80vh" };
const title = { fontSize: "32px", marginBottom: "30px", color: "#111", fontWeight: "bold" };
const downloadBtn = { display: "inline-block", marginTop: "20px", backgroundColor: "#28a745", color: "white", padding: "12px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" };
