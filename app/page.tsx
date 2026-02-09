"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const convertToPDF = async (files: FileList | null) => {
    if (!files) return;

    setLoading(true);

    const pdfDoc = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bytes = await file.arrayBuffer();

      let image;
      if (file.type === "image/jpeg") {
        image = await pdfDoc.embedJpg(bytes);
      } else if (file.type === "image/png") {
        image = await pdfDoc.embedPng(bytes);
      }

      if (!image) continue;

      const page = pdfDoc.addPage([
        image.width,
        image.height,
      ]);

      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfArray = new Uint8Array(pdfBytes);

    const blob = new Blob([pdfArray.buffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    a.click();

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        JPEG to PDF Converter
      </h1>

      <input
        type="file"
        accept="image/jpeg,image/png"
        multiple
        onChange={(e) => convertToPDF(e.target.files)}
        className="mb-4"
      />

      {loading && <p>Converting...</p>}
    </main>
  );
}
