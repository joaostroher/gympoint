import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Home';
import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Enrollments from '~/pages/Enrollments';
import HelpOrders from '~/pages/HelpOrders';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/students" component={Students} />
      <Route path="/plans" component={Plans} />
      <Route path="/enrollments" component={Enrollments} />
      <Route path="/help-orders" component={HelpOrders} />

      <Route path="/login" component={SignIn} isPublic />
      <Route path="/register" component={SignUp} isPublic />
    </Switch>
  );
}
