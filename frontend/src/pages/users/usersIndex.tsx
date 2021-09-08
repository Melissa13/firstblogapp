import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { Layout, Button, Table, Typography, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import './Users.css';

const { Paragraph, Title } = Typography;
const { Content, Footer } = Layout;

interface UserInfo {
  id: string;
  name?: string;
  lastName?: string;
  email?: string;
  country?: string;
  password?: string;
}

const Users: FC = () => {
  const [data, setData] = useState<UserInfo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [singleUser, setSingleUser] = useState<UserInfo>({ id: `0` });

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
      render: (userId: any) => (
        <Link to={`/users/${userId}`}>
          <Button type="primary">Edit user</Button>
        </Link>
      )
    },
    {
      title: 'Delete user',
      key: 'id',
      dataIndex: 'id',
      render: (userId: string) => (
        <Button type="primary" onClick={() => showModal(userId)}>
          Delete user
        </Button>
      )
    }
  ];

  const showModal = (userId: string) => {
    const userData = data.filter((element) => element.id === userId);
    setSingleUser(userData[0]);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await deleteUser(singleUser.id, singleUser);
    fetchData();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="content-color">
      <Content className="user-center-content">
        <Title>Users Page</Title>
        <Paragraph>this is where the users are going to be presented</Paragraph>
        <Link to="/users/create">
          <Button type="primary" className="user-space-buttons">
            Create User
          </Button>
        </Link>
        <Table columns={columns} dataSource={data} />
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div className="user-center-content">
            <Title>Are you sure you want to delete?</Title>
            <Paragraph>
              Delete user: {singleUser.name} {singleUser.lastName}
            </Paragraph>
          </div>
        </Modal>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app project, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

function deleteUser(userId: string, userData: object) {
  return axios.delete(`http://localhost:8080/api/users/${userId}`, userData).catch(() => {
    message.error('Something went wrong!');
  });
}

export default Users;
