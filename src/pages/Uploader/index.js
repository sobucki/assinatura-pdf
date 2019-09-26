import React, { Component } from "react";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

import Modal from "react-modal";
import Dropzone from "react-dropzone";
import { SketchField, Tools } from "react-sketch";

import { Container, Header, Field, Button } from "./styles";

export default class Uploader extends Component {
  state = {
    invalidFile: false,
    selectedFile: null,
    downloadLink: null,
    pdfLoaded: null
  };

  onDrop = async (accepted, rejected) => {
    if (Object.keys(rejected).length !== 0) {
      this.setState({ invalidFile: true });
    } else {
      this.setState({ invalidFile: false, selectedFile: accepted });

      console.log(accepted);
      const url = URL.createObjectURL(accepted[0]);

      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      this.setState({ pdfLoaded: pdfDoc });
      // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // const pages = pdfDoc.getPages();
      // const firstPage = pages[0];
      // const { width, height } = firstPage.getSize();
      // firstPage.drawText('This text was added with JavaScript!', {
      //   x: 5,
      //   y: height / 2 + 300,
      //   size: 50,
      //   font: helveticaFont,
      //   color: rgb(0.95, 0.1, 0.1),
      //   rotate: degrees(-45),
      // });
      //* ******************* */
      // const pdfBytes = await pdfDoc.save();

      // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      // const pdfUrl = URL.createObjectURL(blob);
      // // window.open(pdfUrl, '_blank');
      // this.setState({ downloadLink: pdfUrl });
    }
  };

  printTest = async () => {
    const { pdfLoaded } = this.state;
    const dataUrl = this._sketch.toDataURL();
    const pngImageBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
    const pngImage = await pdfLoaded.embedPng(pngImageBytes);
    const pngDims = pngImage.scale(0.5);

    const firstPage = pdfLoaded.getPages()[0];
    const { width, height } = firstPage.getSize();
    console.log(`width:${width} height: ${height}`);
    console.log(
      `pngDims.width:${pngDims.width} pngDims.height: ${pngDims.height}`
    );
    firstPage.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2,
      y: 0,
      width: pngDims.width,
      height: pngDims.height
    });

    const pdfBytes = await pdfLoaded.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl, "_blank");

    // const pdfUrl = URL.createObjectURL(dataUrl);
    // window.open(pdfUrl, '_blank');
    console.log(dataUrl);
  };

  render() {
    const { invalidFile, downloadLink } = this.state;
    return (
      <Container>
        <Header>
          <FontAwesomeIcon icon={faPenNib} size="lg" />
          <span>Assinador de PDF</span>
        </Header>

        <Dropzone
          onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
          accept="application/pdf"
        >
          {({ getRootProps, getInputProps }) => (
            <Field {...getRootProps()}>
              <input {...getInputProps()} />
              {invalidFile ? (
                <span>Arquivo inválido, favor selecionar um .pdf</span>
              ) : (
                <span>Arraste um arquivo PDF ou clique aqui</span>
              )}
            </Field>
          )}
        </Dropzone>

        <SketchField
          ref={c => (this._sketch = c)}
          width="500px"
          height="500px"
          tool={Tools.Pencil}
          lineColor="black"
          lineWidth={3}
        />
        <Button onClick={() => this.printTest()}>Assinar</Button>
        {/* <Modal isOpen>Teste</Modal> */}
      </Container>
    );
  }
}
