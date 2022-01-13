import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PregledStanova from 'Tabele/PregledStanova/PregledStanova';
import PregledKlijenta from 'Tabele/PregledKlijenata/PregledKlijenata';
import PregledKorisnika from 'Tabele/PregledKorisnika/PregledKorisnika';
// import Stanovi from 'Pages/Stanovi/Stanovi';
import PregledPonuda from 'Tabele/PregledPonuda/PregledPonuda';
import NovaPonuda from 'Form/NovaPonuda/NovaPonuda';
import DetaljiStana from 'Pages/DetaljiStana/DetaljiStana';
import DetaljiKlijenta from 'Pages/DetaljiKlijenta/DetaljiKlijenta';
import Izvestaj from '../../Pages/Izvestaji/index';
import { Layout } from 'antd';
import AppFooter from './Footer/Footer';
import AppHeader from './Header/Header';
import NotFound from 'Pages/NotFound/NotFound';
const { Header, Content } = Layout;
function Views() {
  return (
    <Layout>
      <AppHeader></AppHeader>

      <Content>
        <Switch>
          <Route exact path="/" component={PregledStanova}></Route>
          <Route exact path="/stanovi/:id" component={DetaljiStana}></Route>
          <Route exact path="/korisnici" component={PregledKorisnika}></Route>
          <Route exact path="/klijenti" component={PregledKlijenta}></Route>
          <Route exact path="/klijenti/:id" component={DetaljiKlijenta}></Route>
          <Route exact path="/izvestaji" component={Izvestaj}></Route>
          <Route exact path="/ponude" component={PregledPonuda}></Route>
          <Route exact path="/novaponuda" component={NovaPonuda}></Route>
          <Route path="/**" component={NotFound}></Route>
        </Switch>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default Views;
