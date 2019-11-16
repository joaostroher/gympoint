import { all, takeLatest, call, put } from 'redux-saga/effects';

import { types, signInSuccess, signFailure } from './actions';
import api, { setAuthorization } from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    setAuthorization(token);

    yield put(signInSuccess(token, user));
    history.push('/');
  } catch (err) {
    yield put(signFailure());
  }
}

function setToken({ payload }) {
  const { token } = payload.auth;
  if (token) setAuthorization(token);
}

export default all([
  takeLatest(types.SIGN_IN_REQUEST, signIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
