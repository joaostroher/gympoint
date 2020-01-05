import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { types, signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { student } = payload;

    console.tron.log('oi');
    const response = yield call(api.get, `/students/${student}/verify`);

    const student_id = response.data.id;
    console.tron.log(student_id);
    yield put(signInSuccess(student_id));
  } catch (err) {
    Alert.alert('Ocorreu um erro ao acessar', 'ID de estudante inexistente!');
    yield put(signFailure());
  }
}

export default all([takeLatest(types.SIGN_IN_REQUEST, signIn)]);
