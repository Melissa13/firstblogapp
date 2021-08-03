import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { Layout, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import '../basics.css';

const { Content, Footer } = Layout;

const Users: FC = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await axios('http://localhost:8080/api/users');

    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Edit user',
      key: 'id',
      dataIndex: 'id',
      render: (userid: any) => (
        <Link to={{ pathname: `/users/${userid}`, state: userid }}>
          <Button type="primary">Edit user</Button>
        </Link>
      )
    }
  ];

  // Typografy
  return (
    <div>
      <Content className="content-fit">
        <h1>Users Page</h1>
        <p>this is where the users are going to be presented</p>
        <Table columns={columns} dataSource={data} />
        <Link to="/users/create">
          <Button type="primary">Create User</Button>
        </Link>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </div>
  );
};

export default Users;
