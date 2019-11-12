import React from 'react';
import PropTypes from 'prop-types';
import { Route as RouteDOM, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

export default function Route({ component: Component, isPublic, ...rest }) {
  const signed = false;

  if (!signed && !isPublic) {
    return <Redirect to="/login" />;
  }

  if (signed && isPublic) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <RouteDOM
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

Route.propTypes = {
  component: PropTypes.func.isRequired,
  isPublic: PropTypes.bool,
};

Route.defaultProps = {
  isPublic: false,
};
