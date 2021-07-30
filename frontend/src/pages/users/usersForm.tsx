import React, { FC } from 'react';
import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import '../basics.css';
import Formularie from '../../components/formularie';

const { Content, Footer } = Layout;

const UsersForm: FC = () => (
  <div>
    <Content className="content-fit">
      <div style={{ marginTop: 10 }}>
        <Link to="/users">
          <Button type="primary">Go back</Button>
        </Link>
        <h3>Edit User</h3>
        <Formularie />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      FirstBlog app proyect, by Melissa Lantigua Fermin
    </Footer>
  </div>
);

export default UsersForm;
