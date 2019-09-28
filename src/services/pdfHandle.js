import { PDFDocument } from 'pdf-lib';

const convertToURL = (file) => URL.createObjectURL(file);

const convertToByteArray = async (url) => {
  const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
  return arrayBuffer;
};

export const loadPDF = async (file) => {
  const url = convertToURL(file);
  const bytesFile = await convertToByteArray(url);
  const pdfDocument = await PDFDocument.load(bytesFile);

  return { url, pdfDocument };
};

export const writeInPDF = async (documentPDF, image) => {
  const pngImage = await documentPDF.embedPng(image);

  const pngDims = pngImage.scale(0.5);

  const pages = documentPDF.getPages();
  pages.forEach((page) => {
    const { width } = page.getSize();

    page.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2,
      y: 0,
      width: pngDims.width,
      height: pngDims.height,
    });
  });

  // console.log(documentPDF.getPages());

  const pdfBytes = await documentPDF.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const pdfUrl = URL.createObjectURL(blob);
  console.log(pdfUrl);
};
