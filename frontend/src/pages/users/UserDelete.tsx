import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Button, message, Typography } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import './Users.css';

const { Paragraph, Title } = Typography;
const { Content, Footer } = Layout;
type Params = {
  id: string;
};

interface UserInfo {
  name?: string;
  lastName?: string;
  email?: string;
  country?: string;
  password?: string;
}

const UserDelete: FC = () => {
  const history = useHistory();
  const [data, setData] = useState<UserInfo>({});
  const { id } = useParams<Params>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/users/${id}`);
      setData(result.data);
    };

    if (id !== 'create') {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <Content>
        <div className="user-center-content">
          <div>
            <Title>
              Borrar datos de {data.name} {data.lastName}
            </Title>
          </div>
          <div>
            <Paragraph>Estas seguro que quieres borrar a este usuario del sistema?</Paragraph>
          </div>
          <div>
            <Button
              className="user-space-buttons"
              type="primary"
              onClick={() =>
                deleteUser(id, data).then(() => {
                  history.push('/users');
                })
              }
            >
              Si
            </Button>
            <Link to="/users">
              <Button type="primary">No</Button>
            </Link>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FirstBlog app proyect, by Melissa Lantigua Fermin
      </Footer>
    </div>
  );
};

function deleteUser(userId: string, userData: object) {
  return axios.delete(`http://localhost:8080/api/users/${userId}`, userData).catch(() => {
    message.error('Something went wrong!');
  });
}

export default UserDelete;
