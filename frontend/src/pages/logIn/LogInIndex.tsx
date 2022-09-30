import React, { FC } from 'react';
import { Button, Checkbox, Form, Input, Layout, Typography } from 'antd';
import './LogIn.css';
import { Link, useHistory } from 'react-router-dom';
import ApiClient from '../../services/userClient';

const UserClient = new ApiClient();
const { Content, Footer } = Layout;
const { Title } = Typography;

const LogIn: FC = () => {
  const history = useHistory();
  const onFinish = (values: any) => {
    const userData = {
      ...values
    };
    UserClient.validateUser(userData).then((result) => {
      if (result?.data?.accessToken && result?.data?.refreshToken) {
        localStorage.setItem('accessToken', JSON.stringify(result.data.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(result.data.refreshToken));
      }
      history.push('/blogs');
    });
  };

  return (
    <Layout className="content-color">
      <Content className="content-fit">
        <Link to="/users/create">
          <Button type="primary">Sign In</Button>
        </Link>
        <Title level={3}>Log In</Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'User email goes here' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

export default LogIn;
