import React, { FC, useEffect } from 'react';
import { Form, Input, Button, Layout, Checkbox, message } from 'antd';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import '../basics.css';
// import FormForUsers from '../../components/FormForUsers';

const { Content, Footer } = Layout;
type Params = {
  id: string;
};

interface LocationState {
  description: string;
  pathname: string;
  state: object;
}

interface UserInfo {
  name: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
}

const UsersForm: FC = () => {
  const history = useHistory<LocationState>();
  let description = 'This is the create user page';
  const [form] = Form.useForm<UserInfo>();
  const { id } = useParams<Params>();
  if (history.location.state !== undefined) {
    description = history.location.state.description;
  }

  useEffect(() => {
    if (id !== 'create') {
      const fetchData = async () => {
        const result = await axios(`http://localhost:8080/api/users/${id}`);
        form.setFieldsValue(result.data);
      };
      fetchData();
    }
  }, [form, id]);

  const onFinish = (values: any) => {
    const userData = {
      ...values
    };
    if (id !== 'create') {
      editUser(id, userData).then(() => {
        history.push('/users');
      });
    } else {
      createUser(userData).then(() => {
        history.push('/users');
      });
    }
  };

  return (
    <div>
      <Content className="content-fit">
        <div style={{ marginTop: 10 }}>
          <Link to="/users">
            <Button type="primary">Go back</Button>
          </Link>
          <h3>{description}</h3>
          <h3>Edit User</h3>
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
              label="Lastname"
              name="lastName"
              rules={[{ message: 'User Lastname goes here' }]}
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

            <Form.Item
              label="Country"
              name="country"
              rules={[{ message: 'User country goes here' }]}
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
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </div>
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
