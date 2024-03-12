import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD6imQjzNbQEusMIhUhXdgt4Y0nCcl75mM",
    authDomain: "home-61f94.firebaseapp.com",
    databaseURL: "https://home-61f94-default-rtdb.firebaseio.com",
    projectId: "home-61f94",
    storageBucket: "home-61f94.appspot.com",
    messagingSenderId: "175610382019",
    appId: "1:175610382019:web:0f27e0923b5093d0a08476"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;