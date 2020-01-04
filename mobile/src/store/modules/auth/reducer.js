import produce from 'immer';

import { types } from './actions';

const INITIAL_STATE = {
  signed: false,
  loading: false,
  student: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.SIGN_IN_SUCCESS: {
        draft.student = action.payload.student;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case types.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
