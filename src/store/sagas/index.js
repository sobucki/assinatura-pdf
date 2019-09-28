import { all, takeLatest } from 'redux-saga/effects';

import { Types as UploaderTypes } from '../ducks/uploader';
import { loadFile, signDocument } from './uploader';

export default function* rootSaga() {
  yield all([takeLatest(UploaderTypes.LOAD_FILE_REQUEST, loadFile)]);
  yield all([takeLatest(UploaderTypes.SIGN_DOCUMENT_REQUEST, signDocument)]);
}
