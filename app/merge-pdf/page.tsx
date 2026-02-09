"use client";

import { useState } from "react";
import { mergePdfs } from "@/lib/pdfUtils";

export default function MergePDF() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  async function handleFiles(e: any) {
    const files = Array.from(e.target.files || []);
    if (files.length < 2) return alert("Select at least 2 PDFs");

    setLoading(true);
    const blob = await mergePdfs(files as File[]);
    setUrl(URL.createObjectURL(blob));
    setLoading(false);
  }

  return (
    <main style={container}>
      <h1 style={title}>Merge PDF</h1>

      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFiles}
      />

      {url && (
        <a href={url} download="merged.pdf" style={downloadBtn}>
          Download Merged PDF
        </a>
      )}
    </main>
  );
}

const container = { padding: "60px", textAlign: "center" as const, backgroundColor: "#f5f5f5", minHeight: "80vh" };
const title = { fontSize: "32px", marginBottom: "30px", color: "#111", fontWeight: "bold" };
const downloadBtn = { display: "inline-block", marginTop: "20px", backgroundColor: "#28a745", color: "white", padding: "12px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" };
