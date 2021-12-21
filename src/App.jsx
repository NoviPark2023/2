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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetaljiKlijenta from 'Pages/DetaljiKlijenta/DetaljiKlijenta';

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
          <Switch>
            <GuardedRoute exact path="/" auth={isLoggedIn} logIn={logIn} component={Stanovi}>
              <LoginPage />
            </GuardedRoute>
            <Route path="/korisnici" component={PregledKorisnika}/>
            <Route path="/stanovi" component={PregledStanova}/>
            <Route path="/stanovi/:id" component={DetaljiStana}/>
            <Route path="/klijenti" component={PregledKlijenta}/>
            <Route path="/klijenti/:id" component={DetaljiKlijenta}/>
            <Route path="/novistan" component={NoviStan}/>
            <Route path="/ponude" component={PregledPonuda}/>
            <Route path="/novaponuda" component={NovaPonuda}/>
          </Switch>
        </MainLayout>

        <ToastContainer position="bottom-right" autoClose={2500} />
      </loginContext.Provider>
    </div>
  );
}

export default App;
