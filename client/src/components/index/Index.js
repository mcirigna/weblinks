import React, { Component } from 'react';
import Login from './LoginForm';
import Signup from './SignupForm';
import axios from 'axios';
import '../../css/Index.css';


const forms = {
    login: 'login',
    signup: 'signup'
}

export class Index extends Component {

    state = {
        form: forms.login
    }

    componentDidMount() {
        if (localStorage.token) {
            window.location.href = '/home';
        }
    }

    login = (email, password) => {
        axios.post('/login', {email, password})
        .then((res) => {
            localStorage.setItem('token', `Bearer ${res.data.token}`);
            axios.defaults.headers.common['Authorization'] = localStorage.token;
            window.location.href = '/home';
        })
        .catch(err => console.log(err))
    }

    signup = (email, password, confirmPassword, handle) => {
        axios.post('/signup', {email, password, confirmPassword, handle})
            .then((res) => {
                localStorage.setItem('token', `Bearer ${res.data.token}`);
                axios.defaults.headers.common['Authorization'] = localStorage.token;
                window.location.href = '/home';
            })
            .catch(err => console.log(err))
    }

    toggleForm = () => {
        if (this.state.form === forms.login) {
            this.setState({form: forms.signup})
        } else {
            this.setState({form: forms.login})
        }
    }

    render() {
        let title, form, button;

        if (this.state.form === forms.login) {
            title = <h3 style={{textAlign: 'center', marginBottom: '15px'}}>Login</h3>;
            form = <Login login={this.login}/>;
            button = <button className='btn' type='button' onClick={this.toggleForm}>Sign up</button>;
        } else {
            title = <h3 style={{textAlign: 'center', marginBottom: '15px'}}>Sign up</h3>;
            form = <Signup signup={this.signup}/>;
            button = <button className='btn' type='button' onClick={this.toggleForm}>Login</button>;
        }

        return (
            <div style={style}>
                <h1 style={headerStyle}>Weblinks</h1>
                <div style={{textAlign: 'center', marginTop: '10vh'}}>
                    {title}
                    {form}
                    {button}
                </div>
            </div>
        )
    }
}

let headerStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
}

let style = {
    display: 'grid',
    gridTemplateRows: '20vh 80vh',
    gridTemplateColumns: '50vw',
    justifyContent: 'center'
}

export default Index
