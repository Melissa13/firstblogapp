/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface TsStopBotheringMe extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
  // auth: boolean;
}

const ProtectedRoute = ({ component: Component, ...extra }: TsStopBotheringMe) => {
  const accessToken = localStorage.getItem('accessToken');
  const auth = !!accessToken;
  return (
    <Route
      {...extra}
      render={(props) => (auth === true ? <Component {...props} /> : <Redirect to="/logIn" />)}
    />
  );
};

export default ProtectedRoute;
