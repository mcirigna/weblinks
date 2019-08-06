import React, { Component } from 'react';

export class Link extends Component {
    render() {
        return (
                <li style={style} key={this.props.index}><a style={aStyle} href={this.props.link.link}>{this.props.link.name}</a><button className='btn' type='button' onClick={this.props.deleteLink.bind(this, this.props.link.linkId)}>x</button></li>
        )
    }
}

let style = {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

let aStyle = {
    textDecoration: 'none',
    color: 'inherit'
}

export default Link
