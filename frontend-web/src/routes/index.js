import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Home';
import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Enrollments from '~/pages/Enrollments';
import HelpOrders from '~/pages/HelpOrders';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import RegisterStudent from '~/pages/RegisterStudent';
import RegisterPlan from '~/pages/RegisterPlan';
import RegisterEnrollment from '~/pages/RegisterEnrollment';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/students" exact component={Students} />
      <Route path="/plans" exact component={Plans} />
      <Route path="/enrollments" exact component={Enrollments} />
      <Route path="/help-orders" exact component={HelpOrders} />
      <Route path="/students/:studentId" exact component={RegisterStudent} />
      <Route path="/plans/:planId" exact component={RegisterPlan} />
      <Route
        path="/enrollments/:enrollmentId"
        exact
        component={RegisterEnrollment}
      />

      <Route path="/login" exact component={SignIn} isPublic />
      <Route path="/register" exact component={SignUp} isPublic />

      <Redirect to="/" />
    </Switch>
  );
}
