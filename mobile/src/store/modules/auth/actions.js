export const types = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
};

export function signInRequest(student) {
  return {
    type: types.SIGN_IN_REQUEST,
    payload: { student },
  };
}

export function signInSuccess(student) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: { student },
  };
}

export function signFailure() {
  return {
    type: types.SIGN_FAILURE,
  };
}
