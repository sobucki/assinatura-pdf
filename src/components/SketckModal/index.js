import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from 'react-modal';
import { SketchField, Tools } from 'react-sketch';
import { Creators as ModalActions } from '../../store/ducks/modal';
import { Creators as UploaderActions } from '../../store/ducks/uploader';

import {
 Container, DrawContainer, ButtonsContainer, Button 
} from './styles';

Modal.setAppElement(document.getElementById('root'));

class SketckModal extends Component {
  handleHideModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  signDocument = () => {
    const { signDocumentRequest } = this.props;
    signDocumentRequest(this.sketckRef.toDataURL());
  };

  clearSketck = () => {
    this.sketckRef.clear();
  };

  render() {
    const { visible } = this.props;
    return (
      <Modal
        isOpen={visible}
        onRequestClose={this.handleHideModal}
        contentLabel="Field to assing"
      >
        <Container>
          <span>Faça sua assinatura na caixa abaixo:</span>
          <DrawContainer>
            <SketchField
              ref={(c) => (this.sketckRef = c)}
              width="100%"
              height="100%"
              tool={Tools.Pencil}
              lineColor="black"
              lineWidth={3}
            />
          </DrawContainer>
          <ButtonsContainer>
            <Button onClick={() => this.signDocument()}>Assinar</Button>
            <Button onClick={() => this.clearSketck()}>Limpar</Button>
            <Button onClick={() => this.handleHideModal()}>Cancelar</Button>
          </ButtonsContainer>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  visible: state.modal.visible,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...ModalActions, ...UploaderActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SketckModal);
