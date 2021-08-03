import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import about from './pages/About';
import Users from './pages/users/UsersIndex';
import UserForm from './pages/users/UsersForm';
import Navbar from './components/Navbar';

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
