import React, { useContext, useState } from 'react';
import { Input, Button, Form } from 'antd';
import style from './LoginPage.module.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from 'assets/stanovi-logo.png';
import FormItem from 'antd/lib/form/FormItem';
import { loginContext } from 'App';
import { useHistory } from 'react-router-dom';
import { authService } from 'auth/auth.service';
import to from 'await-to-js';

function LoginPage() {
  const [form] = Form.useForm();
  console.log('dsdsds');
  const history = useHistory();
  ////provera logovanja
  const { setIsLoggedIn, setLogUser } = useContext(loginContext);

  ////error poruka za pogresne podatke
  const [errorMessage, setErrorMessage] = useState('');
  ////logovanje
  const [loading, setLoading] = useState(false);

  const loginUser = async values => {
    try {
      setLoading(true);
      const user = await authService.loginUser(values);
      authService.setToken(user.data.access);
      authService.setUser(values.username);
      history.push('/');
      console.log(user);
    } catch (error) {
      console.log(form);

      if (error.status === 401) {
        form.setFields([
          {
            name: 'username',
            errors: ['username nije dobar'],
          },
          {
            name: 'password',
            errors: ['password nije dobar'],
          },
        ]);
        // setErrorMessage('Uneli ste pogrešne podatke!');
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        form={form}
        initialValues={{
          remember: true,
          username: '',
          password: '',
        }}
        onFinish={onFormSubmit}
        onFinishFailed={onFormSubmitFail}
      >
        <FormItem
          name="username"
          normalize={value => value.trim()}
          rules={[
            {
              required: true,
              message: 'Unesite Korisničko ime!',
            },
          ]}
        >
          <Input trim size="default" placeholder="Korisničko ime" prefix={<UserOutlined />} />
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
