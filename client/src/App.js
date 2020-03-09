import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withContext from './Context';

import Header from './components/Header';
import Courses  from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';

const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(UserSignUp);

class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      loaded: false
    }
  }


  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component = {CoursesWithContext} />
              <Route path="/signup" component = {UserSignUpWithContext} />
              <Route path="/courses/:id" component = {CourseDetail} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
