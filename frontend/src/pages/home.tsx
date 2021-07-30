import React, { FC } from 'react';
import { Layout } from 'antd';
import './basics.css';

const { Content, Footer } = Layout;

const Home: FC = () => {
  const title: string = 'Home';

  return (
    <div>
      <Content className="content-fit">
        <h1>{title}</h1>
        <p>Example of the home page</p>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </div>
  );
};

export default Home;
