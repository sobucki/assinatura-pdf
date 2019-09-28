import { all, takeLatest, take } from 'redux-saga/effects';

import { Types as UploaderTypes } from '../ducks/uploader';
import { loadFile, signDocument } from './uploader';

export default function* rootSaga() {
  yield all([
    takeLatest(UploaderTypes.LOAD_FILE_REQUEST, loadFile),
    takeLatest(UploaderTypes.SIGN_DOCUMENT_REQUEST, signDocument),
  ]);
}
