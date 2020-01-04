import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '~/services/api';
import { types, signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { student } = payload;

    console.tron.log(student);

    const response = yield call(api.get, `/students/${student}/verify`);

    console.tron.log(response);
    const student_id = response.data.id;
    yield put(signInSuccess(student_id));
  } catch (err) {
    yield put(signFailure());
  }
}

export default all([takeLatest(types.SIGN_IN_REQUEST, signIn)]);
