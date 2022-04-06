import React, { useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import PregledStanova from 'Tabele/PregledStanova/PregledStanova';
import PregledKlijenta from 'Tabele/PregledKlijenata/PregledKlijenata';
import PregledKorisnika from 'Tabele/PregledKorisnika/PregledKorisnika';
import PregledPonuda from 'Tabele/PregledPonuda/PregledPonuda';
import DetaljiStana from 'Pages/DetaljiStana/DetaljiStana';
import DetaljiLokala from 'Pages/DetaljiLokala/DetaljiLokala';
import DetaljiKlijenta from 'Pages/DetaljiKlijenta/DetaljiKlijenta';
import Izvestaj from ' ../../Pages/Izvestaji/Izvestaji';
import { Layout } from 'antd';
import AppFooter from 'components/Footer/Footer';
import AppHeader from 'components/Header/Header';
import NotFound from 'Pages/NotFound/NotFound';
import style from './Views.module.css';
import ViewPermisionGate from 'components/ViewPermisionGate/ViewPermisionGate';
import { authService } from 'auth/auth.service';
import PregledCenaStana from 'Tabele/PregledCenaStana/PregledCenaStana';
import PregledLokala from 'Tabele/PregledLokala/PregledLokala';
import PregledGaraza from 'Tabele/PregledGaraza/PregledGaraza';
import PregledPonudaLokala from 'Tabele/PregledPonudaLokala/PregledPonudaLokala';
import garazaReducer, { initialState as garazaInitialState } from 'context/GarazaReducer.jsx';
import stanReducer, { initialState as stanInitialState } from 'context/StanReducer.jsx';
import klijentiReducer, { initialState as klijentiInitialState } from 'context/KlijentiReducer.jsx';

const { Content } = Layout;
export const GlobalStoreContext = React.createContext();

function Views() {
  const activeRole = authService.getRole();

  return (
    <Layout className={style.layout}>
      <AppHeader />
      <Content className={style.content}>
        <Switch>
          <Route exact path="/">
            <GlobalStoreContext.Provider value={useReducer(stanReducer, stanInitialState)}>
              <ViewPermisionGate role={activeRole} routeName="pregledStanova" component={PregledStanova} />
            </GlobalStoreContext.Provider>
          </Route>
          <Route exact path="/stanovi/:id">
            <ViewPermisionGate role={activeRole} routeName="stanovi" component={DetaljiStana} />
          </Route>
          <Route exact path="/lokali">
            <ViewPermisionGate role={activeRole} routeName="pregledLokala" component={PregledLokala} />
          </Route>
          <Route exact path="/lokali/:id">
            <ViewPermisionGate role={activeRole} routeName="stanovi" component={DetaljiLokala} />
          </Route>
          <Route exact path="/garaze">
            <GlobalStoreContext.Provider value={useReducer(garazaReducer, garazaInitialState)}>
              <ViewPermisionGate role={activeRole} routeName="pregledGaraza" component={PregledGaraza} />
            </GlobalStoreContext.Provider>
          </Route>
          <Route exact path="/korisnici">
            <ViewPermisionGate role={activeRole} routeName="korisnici" component={PregledKorisnika} />
          </Route>
          <Route exact path="/klijenti">
            <GlobalStoreContext.Provider value={useReducer(klijentiReducer, klijentiInitialState)}>
              <ViewPermisionGate role={activeRole} routeName="klijenti" component={PregledKlijenta} />
            </GlobalStoreContext.Provider>
          </Route>
          <Route exact path="/klijenti/:id">
            <ViewPermisionGate role={activeRole} routeName="klijentiid" component={DetaljiKlijenta} />
          </Route>
          <Route exact path="/ponude">
            <ViewPermisionGate role={activeRole} routeName="ponude" component={PregledPonuda} />
          </Route>
          <Route exact path="/ponude-lokala">
            <ViewPermisionGate role={activeRole} routeName="ponudeLokala" component={PregledPonudaLokala} />
          </Route>
          <Route exact path="/izvestaji">
            <ViewPermisionGate role={activeRole} routeName="izvestaji" component={Izvestaj} />
          </Route>
          <Route exact path="/cenaStana">
            <ViewPermisionGate role={activeRole} routeName="cenaStana" component={PregledCenaStana} />
          </Route>
          <Route path="/*" component={NotFound}></Route>
        </Switch>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default Views;
