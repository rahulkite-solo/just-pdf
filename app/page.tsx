"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function convertToPdf(file: File) {
    try {
      setLoading(true);
      setError("");
      setDownloadUrl(null);

      // 🔒 SECURITY 1 — file size limit (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File too large. Max size is 5MB.");
        setLoading(false);
        return;
      }

      // 🔒 SECURITY 2 — allow only images
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        setLoading(false);
        return;
      }

      const arrayBuffer = await file.arrayBuffer();

      const pdfDoc = await PDFDocument.create();

      let image;

      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } else if (file.type === "image/png") {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        setError("Unsupported image format.");
        setLoading(false);
        return;
      }

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

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob(
        [new Uint8Array(pdfBytes)],
        { type: "application/pdf" }
      );

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError("Conversion failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (loading) return; // 🔒 SECURITY 3 — anti spam

    const file = event.target.files?.[0];
    if (file) convertToPdf(file);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (loading) return;

    const file = event.dataTransfer.files[0];
    if (file) convertToPdf(file);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Just PDF — Image to PDF
      </h1>

      <p style={{ marginBottom: "30px", color: "#555" }}>
        Convert your JPEG or PNG images to PDF instantly
      </p>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #999",
          borderRadius: "10px",
          padding: "40px",
          textAlign: "center",
          backgroundColor: "white",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <label
          style={{
            display: "inline-block",
            backgroundColor: loading ? "#999" : "#0070f3",
            color: "white",
            padding: "14px 24px",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Converting..." : "Choose Image"}
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFile}
            hidden
            disabled={loading}
          />
        </label>

        <p style={{ marginTop: "15px", color: "#777" }}>
          or drag & drop image here
        </p>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="converted.pdf"
          style={{
            marginTop: "25px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Download PDF
        </a>
      )}
    </main>
  );
}
