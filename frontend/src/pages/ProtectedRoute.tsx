/* eslint-disable react/jsx-props-no-spreading */
import { message } from 'antd';
import axios from 'axios';
import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
  role: string;
  // auth: boolean;
}
const accessTokenName = 'accessToken';
const refreshTokenName = 'refreshToken';
const host = process.env.REACT_APP_HOST;

const ProtectedRoute = ({ component: Component, role, ...extra }: IProtectedRouteProps) => {
  const accessToken = localStorage.getItem(accessTokenName);
  const refreshToken = localStorage.getItem(refreshTokenName);
  let auth = false;
  if (accessToken && refreshToken) {
    const token = JSON.parse(atob(accessToken.split('.')[1]));
    const tokenExp = JSON.parse(atob(refreshToken.split('.')[1]));
    if (token.exp >= Date.now() / 1000) {
      auth = true;
      if (role) {
        if (token.role === role) {
          auth = true;
        } else {
          auth = false;
        }
      } else {
        auth = true;
      }
    } else if (tokenExp.exp >= Date.now() / 1000) {
      auth = true;
      validateUser({
        token: refreshToken,
        id: tokenExp.user_id,
        email: tokenExp.email,
        role: tokenExp.role
      }).then((result) => {
        if (result?.data?.accessToken && result?.data?.refreshToken) {
          localStorage.setItem(accessTokenName, JSON.stringify(result.data.accessToken));
          localStorage.setItem(refreshTokenName, JSON.stringify(result.data.refreshToken));
        }
      });
    } else {
      localStorage.removeItem(accessTokenName);
      localStorage.removeItem(refreshTokenName);
    }
    // const d = new Date(0);
    // d.setUTCSeconds(token.exp);
    // console.log(d);
  }
  return (
    <Route
      {...extra}
      render={(props) => (auth === true ? <Component {...props} /> : <Redirect to="/logIn" />)}
    />
  );
};

function validateUser(userData: object) {
  return axios
    .post(`${host}/api/users/refreshToken`, userData, {
      headers: { 'Content-Type': 'application/json' }
    })
    .catch(() => {
      message.error('Something went wrong!');
    });
}

export default ProtectedRoute;
