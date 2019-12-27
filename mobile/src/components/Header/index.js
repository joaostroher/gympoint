import React from 'react';
import { Image } from 'react-native';

import logoHeader from '~/assets/logo_header.png';
import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={logoHeader} />
    </Container>
  );
}
