import React, { Component } from 'react';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Dropzone from 'react-dropzone';

import {
 Container, Header, Field, Button 
} from './styles';

export default class Uploader extends Component {
  state = { invalidFile: false, selectedFile: null };

  onDrop = (accepted, rejected) => {
    if (Object.keys(rejected).length !== 0) {
      this.setState({ invalidFile: true });
    } else {
      this.setState({ invalidFile: false, selectedFile: accepted });

      console.log(accepted[0].preview);

      const blobPromise = new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(accepted[0]);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      blobPromise.then((value) => {
        console.log(value);
      });
    }
  };

  render() {
    const { invalidFile } = this.state;
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

        <Button>Assinar</Button>
      </Container>
    );
  }
}
