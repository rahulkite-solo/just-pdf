"use client";

import { useState } from "react";
import { imageToPdf } from "../../lib/pdfUtils";

export default function JPGtoPDF() {
  const [url, setUrl] = useState<string | null>(null);

  async function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const blob = await imageToPdf(file);
    setUrl(URL.createObjectURL(blob));
  }

  return (
    <main style={page}>
      <h1>JPG → PDF</h1>

      <input type="file" accept="image/jpeg" onChange={handleFile} />

      {url && (
        <a href={url} download="file.pdf">
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
