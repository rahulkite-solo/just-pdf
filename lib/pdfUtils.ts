"use client";

import { PDFDocument } from "pdf-lib";

export async function imageToPdf(file: File) {
  const pdfDoc = await PDFDocument.create();
  const buffer = await file.arrayBuffer();

  let image;

  if (file.type.includes("jpeg")) {
    image = await pdfDoc.embedJpg(buffer);
  } else {
    image = await pdfDoc.embedPng(buffer);
  }

  const page = pdfDoc.addPage([image.width, image.height]);

  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob(
    [new Uint8Array(pdfBytes)],
    { type: "application/pdf" }
  );
}
