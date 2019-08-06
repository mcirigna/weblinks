import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div style={headerStyle}>
                <h1>Weblinks</h1>
                <button className='btn' type='button' onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}

let headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15vh',
    borderBottom: '1px solid lightgray',
    marginBottom: '10px'
}

export default Header;