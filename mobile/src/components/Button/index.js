import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Text } from './styles';

export default function Button({ children, ...rest }) {
  return (
    <Wrapper>
      <Container {...rest}>
        <Text>{children}</Text>
      </Container>
    </Wrapper>
  );
}

Button.propTypes = {
  children: PropTypes.node,
};

Button.defaultProps = {
  children: null,
};
