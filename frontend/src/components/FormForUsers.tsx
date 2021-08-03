import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect, useParams } from 'react-router-dom';

type Params = {
  id: string;
};

function FormForUsers() {
  let editData = {
    name: '',
    lastName: '',
    email: '',
    country: '',
    password: ''
  };
  const { id } = useParams<Params>();
  if (id) {
    const userData: any = getUser(id);
    editData = userData;
  }
  const onFinish = (values: any) => {
    const userData = {
      name: values.name,
      lastName: values.lastname,
      email: values.email,
      country: values.country,
      password: values.password
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    if (id) {
      editUser(userData, headers, id);
    } else {
      createUser(userData, headers);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true, name: 'editData.name' }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'User name goes here' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Lastname" name="lastname" rules={[{ message: 'User Lastname goes here' }]}>
        <Input placeholder={editData.lastName} />
      </Form.Item>

      <Form.Item label="E-mail" name="email" rules={[{ message: 'User email goes here' }]}>
        <Input placeholder={editData.email} />
      </Form.Item>

      <Form.Item label="Country" name="country" rules={[{ message: 'User country goes here' }]}>
        <Input placeholder={editData.country} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password placeholder={editData.password} />
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
}

function getUser(userId: any) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/api/users/${userId}`);

    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
}
function createUser(userData: object, headers: object) {
  return axios
    .post('http://localhost:8080/api/users', userData, { headers })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log('Status: ', response.status);
      return <Redirect to="/users" />;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong!', error);
    });
}

function editUser(userData: object, headers: object, userId: any) {
  return axios
    .put(`http://localhost:8080/api/users/${userId}`, userData, { headers })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log('Status: ', response.status);
      return <Redirect to="/users" />;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong!', error);
    });
}

export default FormForUsers;
