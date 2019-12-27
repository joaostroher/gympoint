import React, { useState } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';
import Button from '~/components/Button';

import { Container, Form, FormInput } from './styles';

export default function Sign() {
  const [student, setStudent] = useState('');

  function handleSubmit() {}

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          keyboardType="default"
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
