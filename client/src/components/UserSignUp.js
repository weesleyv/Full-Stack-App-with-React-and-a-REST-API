import React , { Component } from 'react';
import Form from './Form';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    };

    render() {
        const { firstName, lastName, emailAddress, password, errors, confirmPassword } = this.state;
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                    <Form 
                        submit = {this.submit}
                        cancel = {this.cancel}
                        errors = {errors}
                        elements = {() => (
                            <React.Fragment>
                                <input 
                                    id = "firstName"
                                    name = "firstName"
                                    type = "text"
                                    value = {firstName}
                                    onChange = {this.change}
                                    placeholder = "First Name"
                                />
                                <input
                                    id = "lastName"
                                    name = "lastName"
                                    type = "text"
                                    value = {lastName}
                                    onChange = {this.change}
                                    placeholder = "Last Name"

                                 />
                                 <input 
                                     id = "emailAddress"
                                     name = "emailAddress"
                                     type = "text"
                                     value = {emailAddress}
                                     onChange = {this.change}
                                     placeholder = "email address"
                                 />
                                 <input 
                                     id = "password"
                                     name = "password"
                                     type = "password"
                                     value = {password}
                                     onChange = {this.change}
                                     placeholder = "Password"
                                 />
                                 <input 
                                     id = "confirmPassword"
                                     name = "confirmPassword"
                                     type = "password"
                                     value = {confirmPassword}
                                     onChange = {this.change}
                                     placeholder = "Confirm Password"
                                 />
                            </React.Fragment>
                        )}
                    />
                       
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
                </div>
            </div>
        )
    }

    change = event => {
        const name =  event.target.name;
        const value = event.target.value;
    
        this.setState( () => {
            return {
                [name]: value
            }
        } );
    }
   //submit ne rabotaet
    submit = () => {
        console.log('submited');
        const { context } = this.props;
        const { firstName, lastName, emailAddress, password } = this.state;
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }
    
        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({
                        errors
                    })
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then( () => this.props.history.push('/path'));
                    console.log( `${emailAddress} is successfully signed up and authenticated!`)
                }
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/')
    }
}

export default UserSignUp