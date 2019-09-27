import { call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { PDFDocument } from 'pdf-lib';
// import api from '../../services/api';

import { Creators as UploaderActions } from '../ducks/uploader';
// import { Creators as ModalActions } from '../ducks/modal';

function convertToURL(file) {
  return URL.createObjectURL(file);
}

async function convertToByteArray(url) {
  const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
  return arrayBuffer;
}

export function* loadFile(action) {
  try {
    // const { data } = yield call(api.get, `/users/${action.payload.user}`);
    const { accepted, rejected } = action.payload;

    if (Object.keys(rejected).length !== 0) {
      toast.error('Arquivo inválido!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (Object.keys(accepted).length > 1) {
      toast.warn('É permitido o carregamento de somente um arquivo por vez.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const urlFile = convertToURL(accepted[0]);
      const bytesFile = yield call(convertToByteArray, urlFile);
      const pdfLoaded = yield call(PDFDocument.load, bytesFile);

      yield put(UploaderActions.loadFileSuccess(pdfLoaded, urlFile));

      //* ******************* */
      // const pdfBytes = await pdfDoc.save();

      // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      // const pdfUrl = URL.createObjectURL(blob);
      // // window.open(pdfUrl, '_blank');
      // this.setState({ downloadLink: pdfUrl });
    }
  } catch (err) {
    yield put(UploaderActions.loadFileFailure(err));
    toast.error('Ocorreu um erro durante o carregamento!', {
      position: toast.POSITION.TOP_CENTER,
    });
    console.error(err);
  } finally {
    // yield put(ModalActions.hideModal());
  }
}
