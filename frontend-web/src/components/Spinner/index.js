import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { Container } from './styles';

export default function Spinner() {
  return (
    <Container>
      <AiOutlineLoading size={36} />
    </Container>
  );
}
