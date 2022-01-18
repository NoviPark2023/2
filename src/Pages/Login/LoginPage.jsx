import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import style from './LoginPage.module.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from 'assets/stanovi-logo.png';
import FormItem from 'antd/lib/form/FormItem';
import { useHistory } from 'react-router-dom';
import { authService } from 'auth/auth.service';

function LoginPage() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const loginUser = async values => {
    try {
      setLoading(true);
      const user = await authService.loginUser(values);
      authService.setToken(user.data.access);
      authService.setUser(values.username);
      authService.setRole(user.data.role);
      history.push('/');
    } catch (error) {
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
      }
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
          <Input trim={true} size="default" placeholder="Korisničko ime" prefix={<UserOutlined />} />
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
