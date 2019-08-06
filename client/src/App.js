import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Index from './components/index/Index';
import Home from './components/home/Home';
import './css/App.css';

// axios.defaults.baseURL =
//   'http://localhost:5000/weblinks-3e8ab/us-central1/api';

axios.defaults.baseURL =
'https://us-central1-weblinks-3e8ab.cloudfunctions.net/api';

const token = localStorage.token;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
  }
}

class App extends React.Component {

  render() {
    
    return (
      <Router>
        <Route exact path='/' component={Index} />
        <Route exact path='/home' component={Home} />
      </Router>
    );
  }
}

export default App;
