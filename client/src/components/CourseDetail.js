import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';

class CourseDetail extends Component {

    state = {
        course: [],
        user: []
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState( { 
                course: data,
                user: data.User} ))
    }

    render() {
        const { course, user } = this.state;
        console.log(course);
        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link className="button" to={''}>Update Course</Link>
                                <Link className="button" href="#">Delete Course</Link>
                            </span>
                            <Link className="button button-secondary" >Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title"> { course.title } </h3>
                        <p>By: { user.firstName } { user.lastName } </p>
                        </div>
                        <div className="course--description">
                            <Markdown source={ course.description } />
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3> { course.estimatedTime } </h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>                                
                                <Markdown source={ course.materialsNeeded } />                               
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default CourseDetail;