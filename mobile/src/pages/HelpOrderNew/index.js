import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import api from '~/services/api';
import Button from '~/components/Button';
import { Container, HelpOrderTextInput } from './styles';

export default function HelpOrderNew({ navigation }) {
  const [question, setQuestion] = useState('');
  const student = useSelector(state => state.auth.student);

  async function handleSubmit() {
    await api.post(`/students/${student}/help-orders`, { question });
    navigation.navigate('HelpOrder');
  }

  return (
    <Container>
      <HelpOrderTextInput
        placeholder="Inclua seu pedido de auxílio"
        onChangeText={setQuestion}
        value={question}
      />
      <Button onPress={handleSubmit} enabled={question.trim() !== ''}>
        Enviar Pedido
      </Button>
    </Container>
  );
}

HelpOrderNew.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
