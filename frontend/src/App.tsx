/* eslint-disable jsx-a11y/aria-role */
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
import BlogRender from './pages/blogs/BlogsRender';
import LogIn from './pages/logIn/LogInIndex';
import ProtectedRoute from './pages/ProtectedRoute';
import LogOut from './pages/logIn/LogOut';

function App() {
  // const [isLogIn, setIsLogIn] = useState(false);
  // setIsLogIn(false);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <ProtectedRoute path="/users" role="Admin" component={Users} exact />
        <ProtectedRoute path="/users/:id" role="Admin" component={UserForm} exact />
        <ProtectedRoute path="/blogs" role="" component={Blogs} exact />
        <ProtectedRoute path="/blogs/:id" role="" component={BlogsForm} exact />
        <Route path="/blog/:id" component={BlogRender} exact />
        <Route path="/logIn" component={LogIn} exact />
        <Route path="/logOut" component={LogOut} exact />
      </Switch>
    </div>
  );
}

export default App;
