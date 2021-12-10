import React, { useContext, useState } from 'react';
import { Input, Button, Form } from 'antd';
import style from './LoginPage.module.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from 'assets/logo.png';
import FormItem from 'antd/lib/form/FormItem';
import { loginContext } from 'App';
import { useHistory } from 'react-router-dom';
import { authService } from 'auth/api.service';
import to from 'await-to-js';

function LoginPage() {
  const history = useHistory();
  ////provera logovanja
  const { setIsLoggedIn, setLogUser } = useContext(loginContext);

  ////error poruka za pogresne podatke
  const [errorMessage, setErrorMessage] = useState('');
  ////logovanje
  const [loading, setLoading] = useState(false);

  const loginUser = async values => {
    setLoading(true);
    setErrorMessage('');
    const [err, res] = await to(authService.loginUser(values));
    setLoading(false);
    if (err) {
      console.log(err);
      setErrorMessage('Uneli ste pogrešne podatke!');
      return;
    }
    sessionStorage.setItem('Token', res.data.access);
    setIsLoggedIn(true);

    setLoading(false);
    setIsLoggedIn(true);
    setLogUser(values.username);
    history.push('/stanovi');
  };

  const onFormSubmit = values => {
    loginUser(values);
  };

  const onFormSubmitFail = error => {
    console.log('err', error);
  };

  return (
    <div className={style.loginPage}>
      <div className={style.logo}>
        <img src={logo} alt="Logo"></img>
      </div>
      {errorMessage && (
        <div className={style.textLogo}>
          <p>{errorMessage}</p>
        </div>
      )}
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFormSubmit}
        onFinishFailed={onFormSubmitFail}
      >
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: 'Unesite Korisničko ime!',
            },
          ]}
        >
          <Input size="default" placeholder="Korisničko ime" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: 'Unesite lozinku!',
            },
          ]}
        >
          <Input.Password size="default" placeholder="Lozinka" prefix={<LockOutlined />} />
        </FormItem>
        <Form.Item>
          <div className={style.buttonInput}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
