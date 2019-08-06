import React, { Component } from 'react';

export class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
        this.setState({ email: '', password: ''})
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit} style={this.props.style} className='form'>
                    <input 
                    name='email' 
                    type='text' 
                    value={this.state.email}
                    placeholder='email...'
                    onChange={this.onChange}/>           
                    <input 
                    name='password' 
                    type='password' 
                    value={this.state.password}
                    placeholder='password...'
                    onChange={this.onChange}/>
                    <input type="submit" value="Login"/>
                </form>
            </React.Fragment>
        )
    }
}

export default LoginForm
