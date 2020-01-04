import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Toolbar({ title, children }) {
  return (
    <Container>
      <h2>{title}</h2>
      {children && <div>{children}</div>}
    </Container>
  );
}

Toolbar.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

Toolbar.defaultProps = {
  children: null,
  title: '',
};
