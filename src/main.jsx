import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import App from './component/App';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC3MfYIGqpTRmiURX5kfIAzYKI3cd0FSXg',
  authDomain: 'cheesy-lemons.firebaseapp.com',
  projectId: 'cheesy-lemons',
  databaseURL: 'https://cheesy-lemons-default-rtdb.firebaseio.com/',
  storageBucket: 'cheesy-lemons.appspot.com',
  messagingSenderId: '87894079592',
  appId: '1:87894079592:web:0e70c91d369ac3a67c23dd',
  measurementId: 'G-39GT3EL25Q',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
