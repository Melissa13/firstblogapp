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

function App() {
  // const [isLogIn, setIsLogIn] = useState(false);
  // setIsLogIn(false);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <ProtectedRoute path="/users" component={Users} exact />
        <ProtectedRoute path="/users/:id" component={UserForm} exact />
        <Route path="/blogs" component={Blogs} exact />
        <Route path="/blogs/:id" component={BlogsForm} exact />
        <Route path="/blog/:id" component={BlogRender} exact />
        <Route path="/logIn" component={LogIn} exact />
      </Switch>
    </div>
  );
}

export default App;
