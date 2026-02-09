import { PDFDocument } from "pdf-lib";

// IMAGE → PDF (works for JPG + PNG)
export async function imageToPdf(file: File) {
  const pdfDoc = await PDFDocument.create();
  const buffer = await file.arrayBuffer();

  let image;

  if (file.type.includes("jpeg") || file.type.includes("jpg")) {
    image = await pdfDoc.embedJpg(buffer);
  } else if (file.type.includes("png")) {
    image = await pdfDoc.embedPng(buffer);
  } else {
    throw new Error("Unsupported image format");
  }

  const page = pdfDoc.addPage([image.width, image.height]);

  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });
}

// MERGE PDFs
export async function mergePdfs(files: File[]) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();

  return new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });
}

// SIMPLE PDF COMPRESSION (re-save optimization)
export async function compressPdf(file: File) {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);

  const compressed = await pdf.save({
    useObjectStreams: true,
  });

  return new Blob([new Uint8Array(compressed)], {
    type: "application/pdf",
  });
}
