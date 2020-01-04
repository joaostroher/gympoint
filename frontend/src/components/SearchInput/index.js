import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function SearchInput({ ...props }) {
  return (
    <Container>
      <MdSearch size={16} color="#999999" />
      <input {...props} />
    </Container>
  );
}
