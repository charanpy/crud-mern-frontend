import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/routing/PrivateRoute';
import CreateProfile from './component/profile-form/CreateProfile';
import EditProfile from './component/profile-form/EditProfile';
import Experience from './component/profile-form/Experience';
import Education from './component/profile-form/Education';
import Profile from './component/profiles/Profile';
import Profiles from './component/Profile/Profile';
import Post from './component/post/Post';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './action/auth';
import PostForm from './component/post/PostForm';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/profile/:id' component={Profiles} />

              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={Experience}
              />
              <PrivateRoute exact path='/add-education' component={Education} />
              <PrivateRoute exact path='/posts' component={Post} />
              <PrivateRoute exact path='/add-posts' component={PostForm} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}
