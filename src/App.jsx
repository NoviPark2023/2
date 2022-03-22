import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'Pages/Login/LoginPage';
import ProtectedRoute from 'components/Protected-route/ProtectedRoute';
import Views from 'components/Views/Views';
// import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    // <GlobalProvider>
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} exact></Route>
        <ProtectedRoute component={Views} path="/" />
      </Switch>
    </div>
    // </GlobalProvider>
  );
}

export default App;
