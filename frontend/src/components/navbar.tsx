import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar: FC = () => (
  <Header>
    <Menu mode="horizontal" theme="dark">
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/blogs">Blogs</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/logIn">Log in</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default Navbar;
