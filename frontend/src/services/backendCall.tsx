/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { message } from 'antd';

const host = process.env.REACT_APP_HOST;

class ApiClient {
  createRecord(data: object, modelName: string) {
    return axios
      .post(`${host}/api/${modelName}`, data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch(() => {
        message.error('Something went wrong creating the Record!');
      });
  }

  validateUser(userData: object) {
    return axios
      .post(`${host}/api/users/login`, userData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch(() => {
        message.error('Something went wrong!');
      });
  }

  editRecord(recordId: string, recordData: object, modelName: string) {
    return axios
      .put(`${host}/api/${modelName}/${recordId}`, recordData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong!', error);
      });
  }

  createUpdatePublishedBlog(blogId: string, blogData: object) {
    return axios
      .put(`${host}/api/blogs/${blogId}/publish`, blogData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong!', error);
      });
  }

  deletePublishedBlog(blogId: string, blogData: object) {
    return axios
      .put(`${host}/api/blogs/${blogId}/unpublish`, blogData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong!', error);
      });
  }

  deleteRecord(recordId: string, recordData: object, modelName: string) {
    return axios.delete(`${host}/api/${modelName}/${recordId}`, recordData).catch(() => {
      message.error('Something went wrong!');
    });
  }
}

export default ApiClient;
