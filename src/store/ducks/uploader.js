export const Types = {
  LOAD_FILE_REQUEST: 'uploader/LOAD_FILE_REQUEST',
  LOAD_FILE_SUCCESS: 'uploader/LOAD_FILE_SUCCESS',
  LOAD_FILE_FAILURE: 'uploader/LOAD_FILE_FAILURE',
  // REMOVE: 'uploader/REMOVE',
};

const INITIAL_STATE = {
  loading: false,
  loaded: false,
  loadedFile: null,
  urlLoadedFile: null,
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
        loaded: true,
        loadedFile: action.payload.data,
        urlLoadedFile: action.payload.urlFile,
        loading: true,
        error: null,
      };
    case Types.LOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        loadedFile: null,
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

  loadFileSuccess: (data, urlFile) => ({
    type: Types.LOAD_FILE_SUCCESS,
    payload: { data, urlFile },
  }),

  loadFileFailure: (error) => ({
    type: Types.LOAD_FILE_FAILURE,
    payload: { error },
  }),
  removeUser: (user) => ({
    type: Types.REMOVE,
    payload: { user },
  }),
};
