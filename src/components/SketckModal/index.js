import React, { Component } from 'react';

import Modal from 'react-modal';

import { SketchField, Tools } from 'react-sketch';

import {
  Container,
  DrawContainer,
  ButtonsContainer,
  Button,
  CancelButton,
} from './styles';

export default class SketckModal extends Component {
  handleHideModal = () => {};

  render() {
    const isOpenFlag = false;
    return (
      <Modal
        isOpen={isOpenFlag}
        onRequestClose={this.handleHideModal}
        contentLabel="Field to assing"
      >
        <Container>
          <span>Faça sua assinatura na caixa abaixo:</span>
          <DrawContainer>
            <SketchField
              ref={(c) => (this._sketch = c)}
              width="100%"
              height="100%"
              tool={Tools.Pencil}
              lineColor="black"
              lineWidth={3}
            />
          </DrawContainer>
          <ButtonsContainer>
            <Button>Assinar</Button>
            <CancelButton>Cancelar</CancelButton>
            <CancelButton>Limpar</CancelButton>
          </ButtonsContainer>
        </Container>
      </Modal>
    );
  }
}
