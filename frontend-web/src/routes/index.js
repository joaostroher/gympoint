import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={SignIn} isPublic />
    </Switch>
  );
}
