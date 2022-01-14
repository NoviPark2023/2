import React, { useState } from 'react';
import { Button, Modal, Layout, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { authService } from 'auth/auth.service';
import logostanovi from 'assets/stanovi-logo-header.png';

const { Header } = Layout;
function AppHeader() {
  const activeRole = authService.getRole();
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const confirmSignout = () => {
    authService.removeToken();
    authService.removeUser();
    authService.removeRole();
    history.push('/login');
  };
  const showModal = () => {
    setVisible(true);
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <img style={{ width: '8rem', height: '3rem', marginRight: '22px' }} src={logostanovi} alt="Logo"></img>
        <Space size={'large'}>
          <span>
            <Link to="/">Stanovi</Link>
          </span>
          <Link to="/klijenti">Klijenti</Link>
          {activeRole !== 'Prodavac' && (
            <>
              <Link to="/korisnici">Korisnici</Link>
              <Link to="/izvestaji">Izveštaji</Link>
            </>
          )}
        </Space>
      </div>

      <div>
        <Space>
          <Button>{authService.getUser()}</Button>
          <Button onClick={showModal} type="danger">
            Odjava
          </Button>
        </Space>
      </div>
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(confirmSignout)}
        onCancel={() => setVisible(false)}
        width={400}
        okText="DA"
        cancelText="NE"
      >
        <p>Da li ste sigurni da želite da se odjavite?</p>
      </Modal>
    </Header>
  );
}

export default AppHeader;
