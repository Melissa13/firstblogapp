import React, { FC } from 'react';
import { Layout } from 'antd';
import './basics.css';

const { Content, Footer } = Layout;

const about: FC = () => (
  <div>
    <Content className="content-fit">
      <h1>About page</h1>
      <p>Example of the about page</p>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      FirstBlog app proyect, by Melissa Lantigua Fermin
    </Footer>
  </div>
);

export default about;
