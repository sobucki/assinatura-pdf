import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropzone from 'react-dropzone';

import { Creators as UploaderActions } from '../../store/ducks/uploader';
import { Creators as ModalActions } from '../../store/ducks/modal';
import {
 Container, Field, Button, ContainerIframe 
} from './styles';

class DropField extends Component {
  onDrop = async (accepted, rejected) => {
    const { loadFileRequest } = this.props;
    loadFileRequest(accepted, rejected);
  };

  openModal = () => {
    const { showModal } = this.props;
    showModal();
  };

  cleanFields = () => {
    const { cleanFields } = this.props;
    cleanFields();
  };

  render() {
    const {
 loadedFile, uploaded, modalVisible, signed 
} = this.props;
    return (
      <Container>
        {!loadedFile ? (
          <Dropzone
            onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
            multiple={false}
            accept="application/pdf"
          >
            {({ getRootProps, getInputProps }) => (
              <Field {...getRootProps()}>
                <input {...getInputProps()} />
                <span>Arraste um arquivo PDF ou clique aqui</span>
              </Field>
            )}
          </Dropzone>
        ) : (
          <ContainerIframe>
            <iframe
              disabled={modalVisible}
              title="viewer"
              src={loadedFile}
              width="80%"
              height="80%"
            />
          </ContainerIframe>
        )}
        {!!uploaded && !signed && (
          <Button onClick={() => this.openModal()}>Assinar documento</Button>
        )}
        {signed && (
          <Button onClick={() => this.cleanFields()}>
            Carregar outro documento
          </Button>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.uploader.loading,
  loadedFile: state.uploader.loadedFile,
  uploaded: state.uploader.uploaded,
  signed: state.uploader.signed,
  modalVisible: state.modal.visible,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...UploaderActions, ...ModalActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropField);
