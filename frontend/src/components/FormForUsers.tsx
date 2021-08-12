import React, { useEffect, FC } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

type Params = {
  id: string;
};

const FormForUsers: FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { id } = useParams<Params>();

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/api/users/${id}`);
    form.setFieldsValue(result.data);
  };

  useEffect(() => {
    if (id !== 'create') {
      fetchData();
    }
  }, []);

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

      <Form.Item label="Lastname" name="lastName" rules={[{ message: 'User Lastname goes here' }]}>
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

export default FormForUsers;
