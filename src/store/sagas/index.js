import { all, takeLatest } from 'redux-saga/effects';

import { Types as UploaderTypes } from '../ducks/uploader';
import { loadFile } from './uploader';

export default function* rootSaga() {
  yield all([takeLatest(UploaderTypes.LOAD_FILE_REQUEST, loadFile)]);
}
