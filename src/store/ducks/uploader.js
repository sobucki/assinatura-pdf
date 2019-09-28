export const Types = {
  LOAD_FILE_REQUEST: 'uploader/LOAD_FILE_REQUEST',
  LOAD_FILE_SUCCESS: 'uploader/LOAD_FILE_SUCCESS',
  LOAD_FILE_FAILURE: 'uploader/LOAD_FILE_FAILURE',
  SIGN_DOCUMENT_REQUEST: 'uploader/SIGN_DOCUMENT_REQUEST',
  SIGN_DOCUMENT_SUCCESS: 'uploader/SIGN_DOCUMENT_SUCCESS',
  SIGN_DOCUMENT_FAILURE: 'uploader/SIGN_DOCUMENT_FAILURE',
  // REMOVE: 'uploader/REMOVE',
};

const INITIAL_STATE = {
  loading: false,
  uploaded: false,
  loadedFile: null,
  error: null,
};

export default function uploader(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.LOAD_FILE_SUCCESS:
      return {
        uploaded: true,
        loadedFile: action.payload.data,
        loading: false,
        error: null,
      };
    case Types.LOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case Types.SIGN_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.SIGN_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loadedFile: action.payload.data,
      };
    case Types.SIGN_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // case Types.REMOVE:
    //   return {
    //     ...state,
    //     data: state.data.filter((user) => user.id !== action.payload.user.id),
    //   };
    default:
      return state;
  }
}

export const Creators = {
  loadFileRequest: (accepted, rejected) => ({
    type: Types.LOAD_FILE_REQUEST,
    payload: { accepted, rejected },
  }),

  loadFileSuccess: (data) => ({
    type: Types.LOAD_FILE_SUCCESS,
    payload: { data },
  }),

  loadFileFailure: (error) => ({
    type: Types.LOAD_FILE_FAILURE,
    payload: { error },
  }),

  signDocumentRequest: (dataUrl) => ({
    type: Types.SIGN_DOCUMENT_REQUEST,
    payload: { dataUrl },
  }),
  signDocumentSuccess: (data) => ({
    type: Types.SIGN_DOCUMENT_SUCCESS,
    payload: { data },
  }),
  signDocumentFailure: (error) => ({
    type: Types.SIGN_DOCUMENT_FAILURE,
    payload: { error },
  }),
  removeUser: (user) => ({
    type: Types.REMOVE,
    payload: { user },
  }),
};
