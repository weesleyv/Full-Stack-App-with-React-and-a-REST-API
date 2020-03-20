import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withContext from './Context';

import Header from './components/Header';
import Courses  from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './PrivateRoute';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <HeaderWithContext />
            <Switch>
              <Route exact path="/" component = {Courses} />
              <Route path="/signup" component = {UserSignUpWithContext} />
              <Route path="/signin" component = {UserSignInWithContext} />
              <Route path="/signout" component ={UserSignOutWithContext} />
              <PrivateRoute path="/courses/create" component = {CreateCourseWithContext} />
              <Route path="/courses/:id/update" component = {UpdateCourse} />
              <Route path="/courses/:id" component = {CourseDetailWithContext} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
