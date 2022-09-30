/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button, Layout, Checkbox, message, Typography, Switch, Radio } from 'antd';
import axios from 'axios';
import { EditorState, convertToRaw, convertFromRaw, ContentState, convertFromHTML } from 'draft-js';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Blogs.css';
import slugify from 'slugify';
import ApiClient from '../../services/blogClient';

const BlogClient = new ApiClient();
const { Title } = Typography;
const { Content, Footer } = Layout;
type Params = {
  id: string;
};

interface BlogInfo {
  id: string;
  title?: string;
  content?: string;
  authorId?: string;
  published?: boolean;
  publishedUrl?: string;
}

type EditorInputProps = {
  onChange?: (e: string) => void;
  value?: string;
};

const EditorInput: FC<EditorInputProps> = (props: EditorInputProps) => {
  const { onChange, value = '' } = props;
  const blocksFromHTML = convertFromHTML(value);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // root of the problem, solucion en un ref
  useEffect(() => {
    if (value) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
        )
      );
    }
  }, [value]);

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
  const [form] = Form.useForm<BlogInfo>(); // implementar algo asi en la funcion del editor
  const { id } = useParams<Params>();
  const isNew = id === 'create';
  const [formData, setFormData] = useState<BlogInfo>({ id: `0` });
  // const [content, setContent] = useState('');

  useEffect(() => {
    if (!isNew) {
      const fetchData = async () => {
        const result = await axios(`http://localhost:8080/api/blogs/${id}`);
        setFormData(result.data);
        form.setFieldsValue(result.data);
      };
      fetchData();
    }
  }, [form, isNew]);

  const onFinish = (values: any) => {
    const slug = slugify(values.title);
    const blogData = {
      ...values,
      published: formData?.published,
      publishedUrl: slug
    };
    setFormData(blogData);
    if (isNew) {
      BlogClient.createRecord(blogData).then(() => {
        message.success('New blog data saved', 3);
      });
    } else {
      BlogClient.editRecord(id, blogData).then(() => {
        // history.push('/blogs');
        message.success('blog data Update', 3);
      });
    }
  };

  const publishChanges = () => {
    const blogData = {
      ...formData,
      published: true
    };
    setFormData(blogData);
    BlogClient.createUpdatePublishedBlog(id, formData).then(() => {
      message.success('Blog Published', 3);
    });
  };

  const unPublish = () => {
    const blogData = {
      ...formData,
      published: false
    };
    setFormData(blogData);
    BlogClient.deletePublishedBlog(id, formData).then(() => {
      message.success('Blog Unpublished', 3);
    });
  };

  const yetToPublishButton = (
    <div className="blog-center-content">
      <Button type="primary" onClick={() => publishChanges()}>
        Publish Blog
      </Button>
    </div>
  );

  const alreadyPublishButton = (
    <div className="blog-center-content">
      <Button type="primary" className="blog-center-button" onClick={() => publishChanges()}>
        Republish Blog
      </Button>
      <Button type="primary" onClick={() => unPublish()}>
        Unpublish Blog
      </Button>
    </div>
  );

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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="blog-center-button"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'blog title goes here' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Author"
            name="authorId"
            rules={[{ required: true, message: 'blog author goes here' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Content" name="content" rules={[{ message: 'blog content goes here' }]}>
            <EditorInput />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Guardar Cambios
            </Button>
          </Form.Item>
        </Form>
        {formData?.published ? alreadyPublishButton : yetToPublishButton}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </Layout>
  );
};

export default BlogsForm;
