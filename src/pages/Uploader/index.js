import React, { Component } from 'react';

import SketckModal from '../../components/SketckModal';
import DropField from '../../components/DropField';
import Header from '../../components/Header';

import { Container } from './styles';

export default class Uploader extends Component {
  printTest = async () => {
    const { pdfLoaded } = this.state;
    const dataUrl = this._sketch.toDataURL();
    const pngImageBytes = await fetch(dataUrl).then((res) => res.arrayBuffer());
    const pngImage = await pdfLoaded.embedPng(pngImageBytes);
    const pngDims = pngImage.scale(0.5);

    const firstPage = pdfLoaded.getPages()[0];
    const { width, height } = firstPage.getSize();
    console.log(`width:${width} height: ${height}`);
    console.log(
      `pngDims.width:${pngDims.width} pngDims.height: ${pngDims.height}`,
    );
    firstPage.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2,
      y: 0,
      width: pngDims.width,
      height: pngDims.height,
    });

    const pdfBytes = await pdfLoaded.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');

    // const pdfUrl = URL.createObjectURL(dataUrl);
    // window.open(pdfUrl, '_blank');
    console.log(dataUrl);
  };

  render() {
    return (
      <Container>
        <Header />
        <DropField />
        <SketckModal />
      </Container>
    );
  }
}
