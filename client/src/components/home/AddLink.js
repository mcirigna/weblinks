import React, { Component } from 'react';

export class AddLink extends Component {

    state = {
        name: '',
        link: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addLink(this.state.name, this.state.link, this.props.folderId);
        this.setState({ name: '', link: ''})
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <form style={style} onSubmit={this.onSubmit}>
                <input 
                name='name'
                type='text' 
                value={this.state.name}
                placeholder='Name...'
                onChange={this.onChange}/>    

                <input 
                name='link'
                type='text' 
                value={this.state.link}
                placeholder='Link...'
                onChange={this.onChange}/>           

                <input type="submit" value="Add Link"/>
            </form>
        )
    }
}

let style = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto'
}

export default AddLink
