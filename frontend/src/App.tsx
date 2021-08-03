import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import about from './pages/about';
import Users from './pages/users/usersIndex';
import UserForm from './pages/users/usersForm';
import Navbar from './components/navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={about} />
        <Route path="/users" component={Users} exact />
        <Route path="/users/create" component={UserForm} />
        <Route path="/users/:id" component={UserForm} />
      </Switch>
    </div>
  );
}

export default App;
