import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/users/UsersIndex';
import UserForm from './pages/users/UsersForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} exact />
        <Route path="/users/:id" component={UserForm} exact />
      </Switch>
    </div>
  );
}

export default App;
