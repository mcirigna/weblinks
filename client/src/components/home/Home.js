import React, { Component } from 'react';
import Folder from './Folder';
import AddFolder from './AddFolder';
import Header from './Header';
import axios from 'axios';
import '../../css/Home.css';


export class Home extends Component {

    state = {
        folders: []
    }

    componentDidMount() {
        axios.get('/data')
          .then(res => {
                let folders = []
                res.data.folders.forEach(folder => {
                    folders.push({
                        name: folder.name,
                        folderId: folder.folderId,
                        links: res.data.links.filter(link => link.folderId === folder.folderId)
                    });
                });
                this.setState({folders});
                console.log(this.state);
            })
          .catch((err) => console.log(err));
    }

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/';
    }

    addLink = (name, link, folderId) => {
        axios.post('/link', {name, link, folderId})
          .then(res => {
            this.state.folders.forEach((folder) => {
                if (folder.folderId === folderId) {
                    folder.links.push(res.data);
                }
            });
            this.setState(this.state);
          })
          .catch((err) => console.log(err));
    }

    addFolder  = (name) => {
        axios.post('/folder', {name})
        .then(res => {
            res.data.links = []
            this.setState({folders: [...this.state.folders, res.data]})
        })
        .catch((err) => console.log(err));
    }

    deleteLink = (linkId) => {
        axios.delete(`/link/${linkId}`)
            .then(res => {
                this.state.folders.forEach(folder => {
                    folder.links = [...folder.links.filter(link => link.linkId !== linkId)]
                })
                this.setState({folders: this.state.folders})
            })
            .catch((err) => console.log(err));
    }

    deleteFolder = (folderId) => {
        axios.delete(`/folder/${folderId}`)
            .then(res => {
                this.setState({folders: this.state.folders.filter(folder => folder.folderId !== folderId)})
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div style={style}>
                <Header logout={this.logout}/>
                <main style={mainStyle}>
                    <AddFolder addFolder={this.addFolder}/>
                    {this.state.folders.map(folder => {
                        return <Folder addLink={this.addLink} deleteLink={this.deleteLink} deleteFolder={this.deleteFolder} folder={folder} key={folder.folderId}/>
                    })} 
                </main>
                <footer style={{borderTop: '1px solid lightgray', margin: '10px 0'}}>Copyright</footer>
            </div>
        )
    }
}

let style = {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    width: '80vw',
    minHeight: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto'
}

let mainStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px'
}

export default Home
