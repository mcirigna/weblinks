const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

const authenticate = require('./utility/authenticate');

const {
    signup,
    login
} = require('./handlers/users');

const {
    getData,
    addLink,
    deleteLink,
    addFolder,
    deleteFolder
} = require('./handlers/data');

app.post('/login', login);
app.post('/signup', signup);

app.get('/data', authenticate, getData);
app.post('/link', authenticate, addLink);
app.delete('/link/:linkId', authenticate, deleteLink);
app.post('/folder', authenticate, addFolder);
app.delete('/folder/:folderId', authenticate, deleteFolder);

exports.api = functions.https.onRequest(app);