import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PregledStanova from 'Tabele/PregledStanova/PregledStanova';
import PregledKlijenta from 'Tabele/PregledKlijenata/PregledKlijenata';
import PregledKorisnika from 'Tabele/PregledKorisnika/PregledKorisnika';
import PregledPonuda from 'Tabele/PregledPonuda/PregledPonuda';
import NovaPonuda from 'Form/NovaPonuda/NovaPonuda';
import DetaljiStana from 'Pages/DetaljiStana/DetaljiStana';
import DetaljiKlijenta from 'Pages/DetaljiKlijenta/DetaljiKlijenta';
import Izvestaj from ' ../../Pages/Izvestaji/index';
import { Layout } from 'antd';
import AppFooter from './Footer/Footer';
import AppHeader from './Header/Header';
import NotFound from 'Pages/NotFound/NotFound';
import style from './Views.module.css';
import ViewPermisionGate from 'components/ViewPermisionGate/ViewPermisionGate';
import { authService } from 'auth/auth.service';

const { Content } = Layout;

function Views() {
  const activeRole = authService.getRole();
  console.log(activeRole);
  return (
    <Layout className={style.layout}>
      <AppHeader />
      <Content className={style.content}>
        <Switch>
          <Route exact path="/">
            <ViewPermisionGate role={activeRole} routeName="pregledStanova" component={PregledStanova} />
          </Route>
          <Route exact path="/stanovi/:id">
            <ViewPermisionGate role={activeRole} routeName="stanovi" component={DetaljiStana} />
          </Route>
          <Route exact path="/korisnici">
            <ViewPermisionGate role={activeRole} routeName="korisnici" component={PregledKorisnika} />
          </Route>
          <Route exact path="/klijenti">
            <ViewPermisionGate role={activeRole} routeName="klijenti" component={PregledKlijenta} />
          </Route>
          <Route exact path="/klijenti/:id">
            <ViewPermisionGate role={activeRole} routeName="klijentiid" component={DetaljiKlijenta} />
          </Route>
          <Route exact path="/ponude">
            <ViewPermisionGate role={activeRole} routeName="ponude" component={PregledPonuda} />
          </Route>
          <Route exact path="/novaponuda">
            <ViewPermisionGate role={activeRole} routeName="novaponuda" component={NovaPonuda} />
          </Route>
          <Route exact path="/izvestaji">
            <ViewPermisionGate role={activeRole} routeName="izvestaji" component={Izvestaj} />
          </Route>
          <Route path="/*" component={NotFound}></Route>
        </Switch>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default Views;
