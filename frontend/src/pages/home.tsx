import React, { FC } from 'react';
import { Layout, Typography } from 'antd';
import './basics.css';

const { Content, Footer } = Layout;
const { Paragraph, Title } = Typography;

const Home: FC = () => {
  const title: string = 'Home';

  return (
    <Layout>
      <Content className="content-fit">
        <Title>{title}</Title>
        <Paragraph>Example of the home page</Paragraph>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app project, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

export default Home;
