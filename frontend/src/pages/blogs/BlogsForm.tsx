/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button, Layout, Checkbox, message, Typography } from 'antd';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Blogs.css';

const { Title } = Typography;
const { Content, Footer } = Layout;
type Params = {
  id: string;
};

interface BlogInfo {
  id: string;
  title: string;
  description: string;
  authorId: string;
}

type EditorInputProps = {
  onChange?: (e: string) => void;
  value?: string;
};

const EditorInput: FC<EditorInputProps> = (props: EditorInputProps) => {
  const { onChange, value } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (_editorState: any) => {
    setEditorState(_editorState);
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    onChange?.(html);
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

const BlogsForm: FC = () => {
  const history = useHistory();
  const [form] = Form.useForm<BlogInfo>();
  const { id } = useParams<Params>();
  const isNew = id === 'create';
  // const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isNew) {
      const fetchData = async () => {
        const result = await axios(`http://localhost:8080/api/blogs/${id}`);
        form.setFieldsValue(result.data);
      };
      fetchData();
    }
  }, [form, isNew]);

  const onFinish = (values: any) => {
    const blogData = {
      ...values
    };
    if (isNew) {
      createBlog(blogData).then(() => {
        history.push('/blogs');
      });
    } else {
      editBlog(id, blogData).then(() => {
        history.push('/blogs');
      });
    }
  };

  return (
    <Layout className="content-color">
      <Content className="content-fit">
        <Link to="/blogs">
          <Button type="primary">Go back</Button>
        </Link>
        <Title level={3}>
          {isNew ? 'This is the create blog page' : 'This is the edit blog page'}
        </Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item label="Title" name="title" rules={[{ message: 'blog title goes here' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Author"
            name="authorId"
            rules={[{ required: true, message: 'blog author goes here' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: 'blog description goes here' }]}
          >
            <EditorInput />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

function createBlog(blogData: object) {
  return axios
    .post('http://localhost:8080/api/blogs', blogData, {
      headers: { 'Content-Type': 'application/json' }
    })
    .catch(() => {
      message.error('Something went wrong!');
    });
}

function editBlog(blogId: string, blogData: object) {
  return axios
    .put(`http://localhost:8080/api/blogs/${blogId}`, blogData, {
      headers: { 'Content-Type': 'application/json' }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong!', error);
    });
}

export default BlogsForm;
