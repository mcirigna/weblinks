import React, { Component } from 'react'

export class SignupForm extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.state.email, this.state.password, this.state.confirmPassword, this.state.handle);
        this.setState({ email: '', password: '', confirmPassword: '', handle: ''})
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    
    render() {
        return (
            <form className='form' style={this.props.style} onSubmit={this.onSubmit}>
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
                <input 
                name='confirmPassword'
                type='password' 
                value={this.state.confirmPassword}
                placeholder='confirm password...'
                onChange={this.onChange}/>
                <input 
                name='handle'
                type='text' 
                value={this.state.handle}
                placeholder='handle...'
                onChange={this.onChange}/>
                <input type="submit" value="Signup"/>
            </form>
        )
    }
}

export default SignupForm
