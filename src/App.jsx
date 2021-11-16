import React, { createContext, useState } from 'react';
import MainLayout from 'components/MainLayout/MainLayout';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from 'Pages/Login/LoginPage';
import PregledStanova from '../src/Tabele/PregledStanova/PregledStanova';
import NoviStan from 'Form/NoviStan/NoviStan';
import PregledKlijenta from 'Tabele/PregledKlijenata/PregledKlijenata';
import PregledKorisnika from 'Tabele/PregledKorisnika/PregledKorisnika';
import Stanovi from 'Pages/Stanovi/Stanovi';
import PregledPonuda from 'Tabele/PregledPonuda/PregledPonuda';
import NovaPonuda from 'Form/NovaPonuda/NovaPonuda';
import DetaljiStana from 'Pages/DetaljiStana/DetaljiStana';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loginContext = createContext(null);

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (auth === true ? <Component {...props} /> : <Redirect to="/" />)} />
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('Token'));
  const [logUser, setLogUser] = useState('');

  const logOut = () => {
    setIsLoggedIn(false);
    setLogUser('');
  };

  const logIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <loginContext.Provider value={{ setIsLoggedIn, setLogUser, logUser }}>
        <MainLayout isLoggedIn={isLoggedIn} logOut={logOut}>
          <GuardedRoute exact path="/" auth={isLoggedIn} logIn={logIn} component={Stanovi}>
            <LoginPage />
          </GuardedRoute>
          <Switch>
            <Route exact path="/korisnici" component={PregledKorisnika}></Route>
            <Route exact path="/stanovi" component={PregledStanova}></Route>
            <Route exact path="/stanovi/:id" component={DetaljiStana}></Route>
            <Route exact path="/klijenti" component={PregledKlijenta}></Route>
            <Route exact path="/novistan" component={NoviStan}></Route>
            <Route exact path="/ponude" component={PregledPonuda}></Route>
            <Route exact path="/novaponuda" component={NovaPonuda}></Route>
          </Switch>
        </MainLayout>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </loginContext.Provider>
    </div>
  );
}

export default App;
