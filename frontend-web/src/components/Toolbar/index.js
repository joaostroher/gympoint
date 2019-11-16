import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Toolbar({ title, children }) {
  return (
    <Container>
      <h2>{title}</h2>
      <div>{children}</div>
    </Container>
  );
}

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Toolbar.defaultProps = {
  title: '',
};
