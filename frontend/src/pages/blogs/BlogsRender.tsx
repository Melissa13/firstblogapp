/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
// import slugify from 'slugify';
import { Button, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './BlogsRender.css';
import axios from 'axios';

const { Content, Footer } = Layout;
const { Paragraph, Title } = Typography;

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
  content: string;
  authorId: string;
  published: boolean;
  authorInfo?: UserInfo;
  publishedUrl?: string;
}

interface LocationProps {
  location: StateProps;
}

interface StateProps {
  pathname: string;
}

const BlogRender: FC<LocationProps> = (props: LocationProps) => {
  const { location } = props;
  const urlArray = location.pathname.split('/');
  const urlArrayLast = urlArray[urlArray.length - 1];
  const [data, setData] = useState<BlogInfo>();

  const fetchData = async () => {
    const result = await axios(
      `http://localhost:8080/api/publishedBlogs/published/${urlArrayLast}`
    );
    const result2 = await axios(`http://localhost:8080/api/users/${result.data.authorId}`);
    result.data.authorInfo = result2.data;

    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contentHtml = data ? (
    <div className="blog-center-render">
      <Title>{data?.title}</Title>
      <Paragraph>
        By: {data?.authorInfo?.name} {data?.authorInfo?.lastName}
      </Paragraph>
      <div className="page-content" dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
    </div>
  ) : (
    <div className="blog-center-render">
      <Title> Error 404 </Title>
      <Paragraph>Blog no found</Paragraph>
    </div>
  );

  return (
    <Layout className="content-color">
      <Content>
        <Link to="/blogs">
          <Button type="primary" className="content-fit-button">
            Go back
          </Button>
        </Link>
        {contentHtml}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app project, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

export default BlogRender;
