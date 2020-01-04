import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function HelpOrder({ question, onChange }) {
  return (
    <Container>
      <h2>Pergunta do Aluno</h2>
      <div>{question}</div>
      <h2>Sua Resposta</h2>
      <textarea type="text" rows="5" onChange={onChange} />
    </Container>
  );
}

HelpOrder.propTypes = {
  question: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

HelpOrder.defaultProps = {
  onChange: null,
};
