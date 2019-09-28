import { call, put, select } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { loadPDF, writeInPDF } from '../../services/pdfHandle';

import { Creators as UploaderActions } from '../ducks/uploader';
// import { Creators as ModalActions } from '../ducks/modal';

export function* loadFile(action) {
  try {
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
      const base64 = yield call(loadPDF, accepted[0]);
      // const ret = yield call(loadPDF, accepted[0]);

      yield put(UploaderActions.loadFileSuccess(base64));
    }
  } catch (err) {
    yield put(UploaderActions.loadFileFailure(err));
    toast.error('Ocorreu um erro durante o carregamento!', {
      position: toast.POSITION.TOP_CENTER,
    });
    console.log(err);
  } finally {
    // yield put(ModalActions.hideModal());
  }
}

export function* signDocument(action) {
  const base64Loaded = yield select((state) => state.uploader.urlLoadedFile);
  const { dataUrl } = action.payload;

  const writed = yield call(writeInPDF, base64Loaded, dataUrl);
  // window.open(teste, "_blank");
  yield put(UploaderActions.signDocumentSuccess(writed));
}
