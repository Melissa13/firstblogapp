import axios, { AxiosInstance } from 'axios';
import { message } from 'antd';

const host = process.env.REACT_APP_HOST;

class ApiClient {
  modelName: string;

  headers = { 'Content-Type': 'application/json' };

  axiosInstance: AxiosInstance;

  constructor(modelName) {
    this.modelName = modelName;
    this.axiosInstance = axios.create({
      baseURL: `${host}/api/${this.modelName}`,
      timeout: 1000,
      headers: this.headers
    });
  }

  createRecord(data: object) {
    return this.axiosInstance.post('/', data).catch(() => {
      message.error('Something went wrong creating the Record!');
    });
  }

  editRecord(recordId: string, recordData: object) {
    return this.axiosInstance.put(`/${recordId}`, recordData).catch(() => {
      message.error('Something went wrong!');
    });
  }

  deleteRecord(recordId: string, recordData: object) {
    return this.axiosInstance.delete(`/${recordId}`, recordData).catch(() => {
      message.error('Something went wrong!');
    });
  }
}

export default ApiClient;
