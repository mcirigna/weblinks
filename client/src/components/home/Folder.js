import React, { Component } from 'react';
import Link from './Link';
import AddLink from './AddLink';

export class Folder extends Component {

    render() {
        return (
            <div style={style}>
                <header style={headerStyle}>
                    <h3>{this.props.folder.name}</h3>    
                    <button className='btn' type='button' onClick={this.props.deleteFolder.bind(this, this.props.folder.folderId)}>x</button>
                </header>
                <ul style={{overflow: 'scroll'}}>
                    {this.props.folder.links.map((value, index) => {
                        return <Link key={index} link={value} deleteLink={this.props.deleteLink}/>
                    })}
                </ul>
                <AddLink addLink={this.props.addLink} folderId={this.props.folder.folderId}/>
            </div>
        )
    }
}

let style = {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    padding: '15px',
    height: '50vh',
    border: '1px solid lightgrey',
    borderRadius: '5px'
}

let headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export default Folder;
