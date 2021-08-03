import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

function Navbar() {
  return (
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
      </Menu>
    </Header>
  );
}

export default Navbar;
