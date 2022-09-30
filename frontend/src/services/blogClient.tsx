import { message } from 'antd';
import ApiClient from './apiClient';

class BlogClient extends ApiClient {
  constructor() {
    super('blogs');
  }

  createUpdatePublishedBlog(blogId: string, blogData: object) {
    return this.axiosInstance.put(`/${blogId}/publish`, blogData).catch(() => {
      message.error('Something went wrong publising the blog!');
    });
  }

  deletePublishedBlog(blogId: string, blogData: object) {
    return this.axiosInstance.put(`/${blogId}/unpublish`, blogData).catch(() => {
      message.error('Something went wrong unpublising the blog!');
    });
  }
}

export default BlogClient;
