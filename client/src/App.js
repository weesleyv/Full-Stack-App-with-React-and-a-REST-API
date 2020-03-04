import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Courses  from './components/Courses';
import CourseDetail from './components/CourseDetail';

class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      loaded: false
    }
  }

componentDidMount() {
  axios.get('http://localhost:5000/api/courses')
    .then(response => {
      this.setState( {
        courses: response.data,
        loaded: true
      } )
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });;
}

  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component = {Courses} />
              <Route path="/courses/:id" component = {CourseDetail} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
