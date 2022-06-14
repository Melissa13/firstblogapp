import React, { FC } from 'react';
import { Button, Layout } from 'antd';
import './LogIn.css';
import { Link } from 'react-router-dom';

const { Content, Footer } = Layout;

const LogOut: FC = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  return (
    <Layout className="content-color">
      <Content className="content-fit">
        <Link to="/">
          <Button type="primary">Go Back</Button>
        </Link>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

export default LogOut;
