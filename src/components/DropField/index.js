import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Dropzone from "react-dropzone";

import { Creators as UploaderActions } from "../../store/ducks/uploader";
import { Creators as ModalActions } from "../../store/ducks/modal";
import { Container, Field, Button } from "./styles";

class DropField extends Component {
  onDrop = async (accepted, rejected) => {
    const { loadFileRequest } = this.props;
    loadFileRequest(accepted, rejected);
  };

  openModal = () => {
    const { showModal } = this.props;
    showModal();
  };

  render() {
    const { urlLoadedFile, loaded, modalVisible } = this.props;
    return (
      <Container>
        {!urlLoadedFile ? (
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
          <iframe
            disabled={modalVisible}
            title="viewer"
            src={urlLoadedFile}
            width="80%"
            height="500px"
          />
        )}
        {!!loaded && (
          <Button onClick={() => this.openModal()}>Assinar documento</Button>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.uploader.loading,
  urlLoadedFile: state.uploader.urlLoadedFile,
  loaded: state.uploader.loaded,
  modalVisible: state.modal.visible
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...UploaderActions, ...ModalActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropField);
