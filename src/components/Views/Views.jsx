import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PregledStanova from 'Tabele/PregledStanova/PregledStanova';
import PregledKlijenta from 'Tabele/PregledKlijenata/PregledKlijenata';
import PregledKorisnika from 'Tabele/PregledKorisnika/PregledKorisnika';
import PregledPonuda from 'Tabele/PregledPonuda/PregledPonuda';
import NovaPonuda from 'Form/NovaPonuda/NovaPonuda';
import DetaljiStana from 'Pages/DetaljiStana/DetaljiStana';
import DetaljiKlijenta from 'Pages/DetaljiKlijenta/DetaljiKlijenta';
import Izvestaj from '../../Pages/Izvestaji/index';
import { Layout } from 'antd';
import AppFooter from './Footer/Footer';
import AppHeader from './Header/Header';
import NotFound from 'Pages/NotFound/NotFound';
import style from './Views.module.css';
import Scroll from 'components/Scroll/Scroll';
const { Content } = Layout;

function Views() {
  return (
    <Layout className={style.layout}>
      <AppHeader />
      <Content className={style.content}>
        <Switch>
          <Route exact path="/" component={PregledStanova}></Route>
          <Route exact path="/stanovi/:id" component={DetaljiStana}></Route>
          <Route exact path="/korisnici" component={PregledKorisnika}></Route>
          <Route exact path="/klijenti" component={PregledKlijenta}></Route>
          <Route exact path="/klijenti/:id" component={DetaljiKlijenta}></Route>
          <Route exact path="/ponude" component={PregledPonuda}></Route>
          <Route exact path="/novaponuda" component={NovaPonuda}></Route>
          <Scroll>
            <Route exact path="/izvestaji" component={Izvestaj}></Route>
          </Scroll>
          <Route path="/**" component={NotFound}></Route>
        </Switch>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default Views;
