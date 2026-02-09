"use client";

import { useState } from "react";
import { imageToPdf } from "@/lib/pdfUtils";

export default function PNGtoPDF() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(e: any) {
    if (loading) return;

    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const blob = await imageToPdf(file);
    setUrl(URL.createObjectURL(blob));

    setLoading(false);
  }

  return (
    <main style={page}>
      <h1 style={heading}>PNG → PDF Converter</h1>

      <input
        type="file"
        accept="image/png"
        onChange={handleFile}
        disabled={loading}
      />

      {url && (
        <a href={url} download="converted.pdf" style={download}>
          Download PDF
        </a>
      )}
    </main>
  );
}

const page = {
  padding: "60px",
  textAlign: "center" as const,
};

const heading = {
  color: "black",
  marginBottom: "20px",
};

const download = {
  display: "block",
  marginTop: "20px",
  fontWeight: "bold",
};
