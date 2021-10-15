/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import './Blogs.css';
import axios from 'axios';

const { Content, Footer } = Layout;
const { Paragraph, Title } = Typography;

type Params = {
  id: string;
};

interface UserInfo {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  country?: string;
  password?: string;
}

interface BlogInfo {
  id: string;
  title: string;
  description: string;
  authorId: string;
  published: boolean;
  authorInfo?: UserInfo;
  publishedUrl?: string;
}

const BlogRender: FC = () => {
  const { id } = useParams<Params>();
  const [data, setData] = useState<BlogInfo>();

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/api/blogs/${id}`);
    const result2 = await axios(`http://localhost:8080/api/users/${result.data.authorId}`);
    result.data.authorInfo = result2.data;

    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout className="content-color">
      <Content>
        <Link to="/blogs">
          <Button type="primary" className="content-fit-button">
            Go back
          </Button>
        </Link>
        <div className="blog-center-render">
          <Title>{data?.title}</Title>
          <Paragraph>
            By: {data?.authorInfo?.name} {data?.authorInfo?.lastName}
          </Paragraph>
          <Paragraph>{data?.publishedUrl}</Paragraph>
          <div
            className="page-content"
            dangerouslySetInnerHTML={{ __html: data?.description || '' }}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app project, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

export default BlogRender;
