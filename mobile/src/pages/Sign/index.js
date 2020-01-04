import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import Button from '~/components/Button';

import { Container, Form, FormInput } from './styles';

export default function Sign() {
  const dispatch = useDispatch();
  const [student, setStudent] = useState('');

  function handleSubmit() {
    const parsedStudent = Number.parseFloat(student, 10);
    console.tron.log(parsedStudent);
    if (parsedStudent && Number.isInteger(parsedStudent) && parsedStudent > 0) {
      dispatch(signInRequest(student));
    } else {
      Alert.alert('Ocorreu um erro ao acessar', 'Valor inválido!');
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
