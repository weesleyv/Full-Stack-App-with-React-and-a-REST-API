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

    render(){
        const { title, description, estimatedTime, materialsNeeded, errors} = this.state;
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
                                            placeholder="Course title..." />
                                        </div>
                                        <p>By Joe Smith</p>
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

    }
    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`)
    }
}

export default UpdateCourse;