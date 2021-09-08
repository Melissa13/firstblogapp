import React, { FC } from 'react';
import { Layout, Typography } from 'antd';
import './basics.css';

const { Content, Footer } = Layout;
const { Paragraph, Title } = Typography;

const About: FC = () => (
  <Layout>
    <Content className="content-fit">
      <Title>About page</Title>
      <Paragraph>Example of the about page</Paragraph>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      FirstBlog app proyect, by Melissa Lantigua Fermin
    </Footer>
  </Layout>
);

export default About;
