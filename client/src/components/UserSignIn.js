import React, { Component } from 'react';
import Form from './Form';
import {Link} from 'react-router-dom';

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

    submit = () => {
        console.log('submited');
        const { context } = this.props;
        const { emailAddress, password } = this.state;
        console.log(emailAddress, password);
        context.actions.signIn(emailAddress, password)
            .then( user => {
                console.log(user);
                if (user === null) {
                    this.setState(() => {
                        return { errors: ["Sign in was unsuccessful"]};
                    } );
                } else {
                    this.props.history.push('/');
                    console.log( ` ${emailAddress} is signed in`);
                }
            }).catch( error => {
                console.log(error);
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }
}

export default UserSignIn;