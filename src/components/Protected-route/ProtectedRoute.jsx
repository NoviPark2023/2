import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { authService } from 'auth/auth.service';

function ProtectedRoute({ component: Component, ...rest }) {
  const history = useHistory();
  if (!authService.getToken()) {
    history.push('/login');
    return null;
  }
  return (
    <Route {...rest}>
      <Component></Component>
    </Route>
  );
}

export default ProtectedRoute;
