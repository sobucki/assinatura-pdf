import { combineReducers } from 'redux';

import modal from './modal';
import uploader from './uploader';

const reducers = combineReducers({ modal, uploader });

export default reducers;
