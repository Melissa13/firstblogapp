/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Form, Input, Button, Layout, Checkbox, message, Typography } from 'antd';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import './Users.css';

const { Title } = Typography;
const { Content, Footer } = Layout;
type Params = {
  id: string;
};

interface UserInfo {
  name: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
}

const UsersForm: FC = () => {
  const history = useHistory();
  const [form] = Form.useForm<UserInfo>();
  const { id } = useParams<Params>();
  const isNew = id === 'create';
  const description = isNew ? 'This is the create user page' : 'This is the edit page';

  useEffect(() => {
    if (!isNew) {
      const fetchData = async () => {
        const result = await axios(`http://localhost:8080/api/users/${id}`);
        form.setFieldsValue(result.data);
      };
      fetchData();
    }
  }, [form, isNew]);

  const onFinish = (values: any) => {
    const userData = {
      ...values
    };
    if (isNew) {
      createUser(userData).then(() => {
        history.push('/users');
      });
    } else {
      editUser(id, userData).then(() => {
        history.push('/users');
      });
    }
  };

  return (
    <Layout className="content-color">
      <Content className="content-fit">
        <Link to="/users">
          <Button type="primary">Go back</Button>
        </Link>
        <Title level={3}>{description}</Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name" rules={[{ message: 'User name goes here' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ message: 'User Last name goes here' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'User email goes here' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Country" name="country" rules={[{ message: 'User country goes here' }]}>
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

function createUser(userData: object) {
  return axios
    .post('http://localhost:8080/api/users', userData, {
      headers: { 'Content-Type': 'application/json' }
    })
    .catch(() => {
      message.error('Something went wrong!');
    });
}

function editUser(userId: string, userData: object) {
  return axios
    .put(`http://localhost:8080/api/users/${userId}`, userData, {
      headers: { 'Content-Type': 'application/json' }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong!', error);
    });
}

export default UsersForm;
