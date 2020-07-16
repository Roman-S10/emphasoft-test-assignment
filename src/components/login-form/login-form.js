import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import './login-form.css';
import EmphasoftApiService from '../../services/emphasoft-api-service';

class LoginForm extends Component {

    state = {
        username: '',
        password: '',
        usernameError: '',
        passwordError: ''
    };

    EmphasoftApiService = new EmphasoftApiService();

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            usernameError: '',
            passwordError: ''
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if(this.isValide()){
            this.EmphasoftApiService.logIn(this.state.username, this.state.password)
            .then(()=> this.props.history.push('/users'));
        }
    }

    isValide = () => {

        if(!this.state.username){
            this.setState({
                usernameError: 'Username must contain at least one character!'
            });
            return false;
        }

        if(!this.state.password){
            this.setState({
                passwordError: 'Password must contain at least one character!'
            });
            return false;
        }

        return true;
    }

    render(){

        const {username, password, usernameError, passwordError} = this.state;

        return (
            <form onSubmit={ this.onFormSubmit } className ="login-form" >
                <h1>Please log in</h1>
                <input 
                    name="username"
                    type="text"
                    onChange={ this.onInputChange }
                    value={ username }
                    autoFocus
                    placeholder="Username"/>
                { usernameError ? <div className="error-message"> {usernameError} </div> : null}
                <input 
                    name="password"
                    type="password"
                    onChange={ this.onInputChange }
                    value={ password }
                    placeholder="Password"/>
                { passwordError ? <div className="error-message"> {passwordError} </div> : null}
                <button>Log in</button>
            </form>
        );
    }
}

export default withRouter(LoginForm);