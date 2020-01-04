import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Text } from './styles';

export default function Button({ children, enabled, ...rest }) {
  return (
    <Wrapper>
      <Container enabled={enabled} {...rest}>
        <Text>{children}</Text>
      </Container>
    </Wrapper>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  enabled: true,
};
