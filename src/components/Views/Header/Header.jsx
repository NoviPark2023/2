import React, { useState } from 'react';
import { Button, Menu, Modal, Layout, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { authService } from 'auth/auth.service';
// import logostanovi from 'assets/stanovi-logo-header.png';
const { Header } = Layout;
function AppHeader({ loggedUser, logOut }) {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const confirmSignout = () => {
    authService.removeToken();
    authService.removeUser();
    history.push('/login');
  };
  const showModal = () => {
    setVisible(true);
  };
  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <Space>
          <Link to="/">Stanovi</Link>
          <Link to="/klijenti">Klijenti</Link>
          <Link to="/korisnici">Korisnici</Link>
          <Link to="/izvestaji">Izveštaji</Link>
        </Space>
      </div>
      {/* <Button>{loggedUser}</Button> */}
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
