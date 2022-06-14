/* eslint-disable no-console */
import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { Layout, Button, Table, Typography, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './Blogs.css';
import slugify from 'slugify';
import ApiClient from '../../services/backendCall';

const BlogClient = new ApiClient();
const modelName = 'blogs';
const { Paragraph, Title } = Typography;
const { Content, Footer } = Layout;

interface BlogInfo {
  id: string;
  title?: string;
  content?: string;
  authorId?: string;
  published?: boolean;
}

/* interface UserInfo {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  country?: string;
  password?: string;
} */

const Blogs: FC = () => {
  const [data, setData] = useState<BlogInfo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [singleBlog, setSingleBlog] = useState<BlogInfo>({ id: `0` });

  const fetchData = async () => {
    const result = await axios('http://localhost:8080/api/blogs');

    setData(result.data);
  };

  const fetchData2 = async (authorId: any) => {
    const result = await axios(`http://localhost:8080/api/users/${authorId}`);

    return result.data;
  };

  /* 
  const fetchData = async () => {
    const result = await axios('http://localhost:8080/api/blogs');

    const completeResult: BlogInfo[] = result.data;
    completeResult.forEach(async (blogElement: BlogInfo) => {
      const result2 = await axios(`http://localhost:8080/api/users/${blogElement.authorId}`);
      // eslint-disable-next-line no-param-reassign
      blogElement.authorInfo = result2.data;
    });
    setData(completeResult);
  };
  */

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Author',
      dataIndex: 'authorId',
      key: 'authorId',
      render: (authorId: any) => {
        const result = fetchData2(authorId).then((val) => val);
        console.log('----axios data---');
        console.log(result);
        const resultUser = result;
        console.log('----Result user---');
        console.log(resultUser);
        return <Paragraph>name: {authorId}</Paragraph>;
      }
    },
    {
      title: 'Published status',
      key: 'published',
      dataIndex: ['published', 'title'],
      render: (text: any, row: any) => {
        const slug = slugify(row.title);
        console.log(slug);
        const HtmlText = row.published ? (
          <Link to={`/blog/${slug}`}>
            <Button type="primary">Published</Button>
          </Link>
        ) : (
          <Paragraph>Unpublished</Paragraph>
        );
        return HtmlText;
      }
    },
    {
      title: 'Edit blog',
      key: 'id',
      dataIndex: 'id',
      render: (blogId: any) => (
        <Link to={`/blogs/${blogId}`}>
          <Button type="primary">Edit blog</Button>
        </Link>
      )
    },
    {
      title: 'Delete blog',
      key: 'id',
      dataIndex: 'id',
      render: (blogId: string) => (
        <Button type="primary" onClick={() => showModal(blogId)}>
          Delete blog
        </Button>
      )
    }
  ];

  const showModal = (blogId: string) => {
    const blogData = data.filter((element) => element.id === blogId);
    setSingleBlog(blogData[0]);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await BlogClient.deleteInstance(singleBlog.id, singleBlog, modelName);
    fetchData();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="content-color">
      <Content className="blog-center-content">
        <Title>Blogs Page</Title>
        <Paragraph>this is where the blogs are going to be presented</Paragraph>
        <Link to="/blogs/create">
          <Button type="primary" className="blog-space-buttons">
            Create Blog
          </Button>
        </Link>
        <Table columns={columns} dataSource={data} />
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div className="blog-center-content">
            <Title>Are you sure you want to delete?</Title>
            <Paragraph>
              Delete Blog: {singleBlog.title} {singleBlog.authorId}
            </Paragraph>
          </div>
        </Modal>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app project, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

export default Blogs;
