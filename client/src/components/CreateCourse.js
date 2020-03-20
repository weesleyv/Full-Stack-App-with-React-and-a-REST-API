import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
        userId: null
    }

    render() {
        const { context } = this.props;
        const {title, description, estimatedTime, materialsNeeded, errors} =  this.state;
        const name = `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`;
        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <Form 
                    submit = {this.submit}
                    cancel = {this.cancel}
                    errors = {errors}
                    buttonText = "Create Course"
                    elements = { () => (
                        <React.Fragment>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <input 
                                    id = "title"
                                    name = "title"
                                    type = "text"
                                    value = {title}
                                    onChange = {this.change}
                                    placeholder = "Course title..."
                                />
                                <p> By {name}</p>
                            </div>
                            <div className = "course--description">
                                <textarea
                                    id = "description"
                                    name = "description"
                                    type = "text"
                                    value = {description}
                                    onChange = {this.change}
                                    placeholder = "Course description..."
                                ></textarea>
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
                                    className="course--time--input"
                                    value={estimatedTime}
                                    onChange={this.change}
                                    placeholder="Hours"
                                    />
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
                                    placeholder="List materials..."
                                    ></textarea>
                                </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </React.Fragment>
                    )}                    
                />
            </div>
        )
    }

    change = event => {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState(() => {
            return {
                [name]: value
            }
        })
    }
// zakon4itj submit
    submit = () => {
        const { context } = this.props;
        const { password, emailAddress }= context.authenticatedUser;
    
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: context.authenticatedUser.id
        };
        console.log(course);
        context.data.createCourse(course, emailAddress, password)
            .then(errors => {
                console.log(errors);
                if (errors.length) {
                    this.setState({ errors })
                } else {
                    console.log(`${context.authenticatedUser.emailAddress} created course ${course}`);
                    this.props.history.push('/')
                }
            })
            .catch(error => {
                console.log('create course error', error);
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }
}

export default CreateCourse;