import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/users/UsersIndex';
import UserForm from './pages/users/UsersForm';
import Navbar from './components/Navbar';
import Blogs from './pages/blogs/BlogsIndex';
import BlogsForm from './pages/blogs/BlogsForm';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} exact />
        <Route path="/users/:id" component={UserForm} exact />
        <Route path="/blogs" component={Blogs} exact />
        <Route path="/blogs/:id" component={BlogsForm} exact />
      </Switch>
    </div>
  );
}

export default App;
