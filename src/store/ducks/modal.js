export const Types = {
  SHOW: 'modal/SHOW',
  HIDE: 'modal/HIDE',
};

const INITIAL_STATE = {
  visible: false,
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      return {
        visible: true,
      };
    case Types.HIDE:
      return {
        visible: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  showModal: () => ({
    type: Types.SHOW,
  }),

  hideModal: () => ({
    type: Types.HIDE,
  }),
};
