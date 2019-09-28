import { PDFDocument } from 'pdf-lib';

const BASE64_MARKER = ';base64,';

const convertDataURIToBinary = (dataURI) => {
  console.log(typeof dataURI);
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
};

const convertToURL = (file) => URL.createObjectURL(file);

const convertToByteArray = async (url) => {
  const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
  return arrayBuffer;
};

export const loadPDF = async (file) => {
  const url = convertToURL(file);
  const bytesFile = await convertToByteArray(url);
  const pdfDocument = await PDFDocument.load(bytesFile);
  const base64 = await pdfDocument.saveAsBase64({ dataUri: true });
  return base64;
};

export const writeInPDF = async (base64, image) => {
  const byteArray = convertDataURIToBinary(base64);
  const pdfDocument = await PDFDocument.load(byteArray);
  const pngImage = await pdfDocument.embedPng(image);

  const pngDims = pngImage.scale(0.5);

  const pages = pdfDocument.getPages();
  pages.forEach((page) => {
    const { width } = page.getSize();

    page.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2,
      y: 0,
      width: pngDims.width,
      height: pngDims.height,
    });
  });

  const pdfBytes = await pdfDocument.saveAsBase64({ dataUri: true });
  return pdfBytes;
};
