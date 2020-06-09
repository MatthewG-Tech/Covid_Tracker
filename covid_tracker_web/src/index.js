import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var firebaseConfig = {
  apiKey: "AIzaSyCr_liHpdn4FOYWVNUQheglOCwLfLnYrQE",
  authDomain: "covid-tracker-web-app.firebaseapp.com",
  databaseURL: "https://covid-tracker-web-app.firebaseio.com",
  projectId: "covid-tracker-web-app",
  storageBucket: "covid-tracker-web-app.appspot.com",
  messagingSenderId: "827851511323",
  appId: "1:827851511323:web:ad9ca1636062d8b63bcabe",
  measurementId: "G-V6B0ELJ3C5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
