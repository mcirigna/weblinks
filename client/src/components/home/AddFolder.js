import React, { Component } from 'react'

export class AddFolder extends Component {

    state = {
        name: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addFolder(this.state.name);
        this.setState({ name: ''})
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <div style={style}>
                <form onSubmit={this.onSubmit}>
                    <input 
                    name='name'
                    type='text' 
                    value={this.state.name}
                    placeholder='Name...'
                    onChange={this.onChange}/>           

                    <input type="submit" value="Add Folder"/>
                </form>
            </div>
        )
    }
}

// let style = {
//     margin: 'auto'
// }

let style = {
    padding: '15px',
    height: '50vh',
    border: '1px solid lightgrey',
    borderRadius: '5px',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center'
}

export default AddFolder
