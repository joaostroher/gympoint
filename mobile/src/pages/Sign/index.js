import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import Button from '~/components/Button';

import { Container, Form, FormInput } from './styles';

export default function Sign() {
  const dispatch = useDispatch();
  const [student, setStudent] = useState('');

  async function handleSubmit() {
    try {
      await Yup.number('Informe um número válido!')
        .integer('Informe um número inteiro válido!')
        .min(1, 'Informe um número maior ou igual a 1!')
        .typeError('Informe um número válido!')
        .validate(student);
      dispatch(signInRequest(student));
    } catch (err) {
      Alert.alert('Ocorreu um erro ao acessar', err.message);
    }
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          keyboardType="numeric"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={student}
          onChangeText={setStudent}
        />
        <Button onPress={handleSubmit}>Entrar no sistema</Button>
      </Form>
    </Container>
  );
}
