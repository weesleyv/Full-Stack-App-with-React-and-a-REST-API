import React , { Component} from 'react';
import Form from './Form';

class UpdateCourse extends Component {

    state = {
        id: null,
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: null,
        errors: []
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(course => {
                if (course.message) {
                    this.props.history.push('/notfound')
                } else {
                    this.setState({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                        userId: course.userId
                    })
                }
            })

    }

    render(){
        const { title, description, estimatedTime, materialsNeeded, errors} = this.state;
        const { context } = this.props;
        const user = context.authenticatedUser;
        const userName = user ? `${user.firstName} ${user.lastName}` : null;
        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form
                        submit = {this.submit}
                        cancel = {this.cancel}
                        errors = {errors}
                        buttonText = "Update Course"
                        elements = {() => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            value={title}
                                            onChange={this.change}
                                            className="input-title course--title--input" 
                                            placeholder="Title" />
                                        </div>
                                        <p>By {userName}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                type="text"
                                                value={description}
                                                onChange={this.change}
                                                className="" 
                                                placeholder="Course description...">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input 
                                                    id="estimatedTime" 
                                                    name="estimatedTime" 
                                                    type="text" 
                                                    value={estimatedTime}
                                                    onChange={this.change}
                                                    className="course--time--input"
                                                    placeholder="Hours"  />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded" 
                                                    name="materialsNeeded"
                                                    value={materialsNeeded}
                                                    onChange={this.change} 
                                                    className="" 
                                                    placeholder="List materials...">
                                                </textarea>
                                            </div>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    />
                </div>
            </div>
        )
    }

    change = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState( () => {
            return {
                [name]: value
            }
        } )
    }

    submit = () => {
        const { context } = this.props;
        const { id, userId, title, description, materialsNeeded, estimatedTime} = this.state;
        const updatedCourse = {
            id,
            userId,
            title,
            description,
            materialsNeeded,
            estimatedTime
        };
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        context.data.updateCourse(updatedCourse, emailAddress, password)
            .then( errors => {
                if (errors.length) {
                    this.setState({errors})
                } else {
                    console.log(`Course "${updatedCourse.title}" has been updated!`);
                    this.props.history.push(`/courses/${updatedCourse.id}`)
                }
            })
            .catch( error => {
                console.log(error);
                this.props.history.push('/error');
            })
    }
    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`)
    }
}

export default UpdateCourse;