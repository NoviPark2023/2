import React, { useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import ReviewApartment from 'Tabele/ReviewApartment/ReviewApartment';
import ReviewClients from 'Tabele/ReviewClients/ReviewClients';
import ReviewUsers from 'Tabele/ReviewUsers/ReviewUsers';
import ReviewOffers from 'Tabele/ReviewOffers/ReviewOffers';
import DetailsApartment from 'Pages/DetailsApartment/DetailsApartment';
import DetailsLocal from 'Pages/DetailsLocal/DetailsLocal';
import DetailsClients from 'Pages/DetailsClients/DetailsClients';
import Reports from 'Pages/Reports/Reports';
import { Layout } from 'antd';
import AppFooter from 'components/Footer/Footer';
import AppHeader from 'components/Header/Header';
import NotFound from 'Pages/NotFound/NotFound';
import style from './Views.module.css';
import ViewPermisionGate from 'components/ViewPermisionGate/ViewPermisionGate';
import { authService } from 'auth/auth.service';
import ReviewApartmentPrice from 'Tabele/ReviewApartmentPrice/ReviewApartmentPrice';
import ReviewLocal from 'Tabele/ReviewLocal/ReviewLocal';
import ReviewGarage from 'Tabele/ReviewGarage/ReviewGarage';
import ReviewOffersLocal from 'Tabele/ReviewOffersLocal/ReviewOffersLocal';
import garageReducer, { initialState as garageInitialState } from 'context/GarageReducer.jsx';
import apartmentReducer, { initialState as apartmentInitialState } from 'context/ApartmentReducer.jsx';
import clientReducer, { initialState as clientInitialState } from 'context/ClientReducer.jsx';

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
            <GlobalStoreContext.Provider value={useReducer(apartmentReducer, apartmentInitialState)}>
              <ViewPermisionGate role={activeRole} routeName="pregledStanova" component={ReviewApartment} />
            </GlobalStoreContext.Provider>
          </Route>
          <Route exact path="/stanovi/:id">
            <ViewPermisionGate role={activeRole} routeName="stanovi" component={DetailsApartment} />
          </Route>
          <Route exact path="/lokali">
            <ViewPermisionGate role={activeRole} routeName="pregledLokala" component={ReviewLocal} />
          </Route>
          <Route exact path="/lokali/:id">
            <ViewPermisionGate role={activeRole} routeName="stanovi" component={DetailsLocal} />
          </Route>
          <Route exact path="/garaze">
            <GlobalStoreContext.Provider value={useReducer(garageReducer, garageInitialState)}>
              <ViewPermisionGate role={activeRole} routeName="pregledGaraza" component={ReviewGarage} />
            </GlobalStoreContext.Provider>
          </Route>
          <Route exact path="/korisnici">
            <ViewPermisionGate role={activeRole} routeName="korisnici" component={ReviewUsers} />
          </Route>
          <Route exact path="/klijenti">
            <GlobalStoreContext.Provider value={useReducer(clientReducer, clientInitialState)}>
              <ViewPermisionGate role={activeRole} routeName="klijenti" component={ReviewClients} />
            </GlobalStoreContext.Provider>
          </Route>
          <Route exact path="/klijenti/:id">
            <ViewPermisionGate role={activeRole} routeName="klijentiid" component={DetailsClients} />
          </Route>
          <Route exact path="/ponude">
            <ViewPermisionGate role={activeRole} routeName="ponude" component={ReviewOffers} />
          </Route>
          <Route exact path="/ponude-lokala">
            <ViewPermisionGate role={activeRole} routeName="ponudeLokala" component={ReviewOffersLocal} />
          </Route>
          <Route exact path="/izvestaji">
            <ViewPermisionGate role={activeRole} routeName="izvestaji" component={Reports} />
          </Route>
          <Route exact path="/cenaStana">
            <ViewPermisionGate role={activeRole} routeName="cenaStana" component={ReviewApartmentPrice} />
          </Route>
          <Route path="/*" component={NotFound}></Route>
        </Switch>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default Views;
