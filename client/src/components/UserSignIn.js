import React, { Component } from 'react';
import Form from './Form';
import {Link} from 'react-router-dom';

//This component provides the "Sign In" screen by rendering a form 
//that allows a user to sign using their existing account information. 
class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    render() {
        const { emailAddress, password, errors } = this.state;
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <Form 
                        submit = {this.submit}
                        cancel = {this.cancel}
                        errors = {errors}
                        buttonText = "Sign In"
                        elements = { () => (
                            <React.Fragment>
                                <input 
                                    id = "emailAddress"
                                    name = "emailAddress"
                                    type = "text"
                                    value = {emailAddress}
                                    onChange = {this.change}
                                    placeholder = "Email Address"
                                />
                                <input 
                                    id = "password"
                                    name = "password"
                                    type = "password"
                                    value = {password}
                                    onChange = {this.change}
                                    placeholder = "Password"
                                />
                            </React.Fragment>
                        )}
                    />
                </div>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
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

    //signs in the user
    submit = () => {
        const { context } = this.props;
        const { emailAddress, password } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        context.actions.signIn(emailAddress, password)
            .then( user => {
                console.log(user);
                if (user === null) {
                    this.setState(() => {
                        return { errors: ["Sign in was unsuccessful"]};
                    } );
                } else {
                    this.props.history.push(from);
                    console.log( ` ${emailAddress} is signed in`);
                }
            }).catch( error => {
                console.log(error);
                this.props.history.push('/error');
            })
    }

    //returns the user to the default route
    cancel = () => {
        this.props.history.push('/');
    }
}

export default UserSignIn;