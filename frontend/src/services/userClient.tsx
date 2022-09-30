import { message } from 'antd';
import ApiClient from './apiClient';

class UserClient extends ApiClient {
  constructor() {
    super('users');
  }

  validateUser(userData: object) {
    return this.axiosInstance.post('/login', userData).catch(() => {
      message.error('Something went wrong!');
    });
  }
}

export default UserClient;
