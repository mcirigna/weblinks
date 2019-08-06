const admin = require('firebase-admin');
admin.initializeApp();

const config = {
    apiKey: "AIzaSyBJBpoT19Fj7ifB_oMoAFKzB1FA02yZcg4",
    authDomain: "weblinks-3e8ab.firebaseapp.com",
    databaseURL: "https://weblinks-3e8ab.firebaseio.com",
    projectId: "weblinks-3e8ab",
    storageBucket: "weblinks-3e8ab.appspot.com",
    messagingSenderId: "721970314079",
    appId: "1:721970314079:web:1191ecb4eb96ed44"
};

module.exports = { admin, config };