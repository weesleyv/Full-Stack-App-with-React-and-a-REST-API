import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';

// This component provides the "Course Detail" screen by retrieving the detail for a course
// from the REST API's /api/courses/:id route and rendering the course.
class CourseDetail extends Component {

    state = {
        course: []
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    this.props.history.push('/notfound')
                } else {
                    this.setState( {course: data} )
                }
            })
            .catch( error => {
                console.log('fetch:', error);
                this.props.history.push('/error')
            })
    }

    render() {
        const { course } = this.state;
        const { context } = this.props;
        const user = context.authenticatedUser;
        const userName = user ? `${user.firstName} ${user.lastName}` : null;
        
        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {/* {if course created by user, display "delete" and update buttons, else hide} */}
                            {
                                user && user.id === course.userId ? (
                                    <React.Fragment>
                                        <span>
                                            <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                            <button className="button" onClick={this.handleDelete}>Delete Course</button>
                                        </span>
                                    </React.Fragment>
                                )
                                : 
                                (<React.Fragment></React.Fragment>)
                            }
                            <Link className="button button-secondary" to='/'>Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title"> { course.title } </h3>
                        <p>By: {userName} </p>
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

    handleDelete = () => {
        if (window.confirm('Delete this course?')) {
            const { id } = this.props.match.params;
            const { context } = this.props;
            const { emailAddress } = context.authenticatedUser;
            const { password } = context.authenticatedUser;

            context.data.deleteCourse( id, emailAddress, password )
                .then(() => this.props.history.push('/'))
                .catch( error => {
                    console.log('Delete course error', error);
                    this.props.history.push('/error')
                })

        }
    }
}

export default CourseDetail;