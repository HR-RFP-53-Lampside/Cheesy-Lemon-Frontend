/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import App from './component/App';
import config from './config/config';

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: 'cheesy-lemons.firebaseapp.com',
  projectId: 'cheesy-lemons',
  databaseURL: 'https://cheesy-lemons-default-rtdb.firebaseio.com/',
  storageBucket: 'cheesy-lemons.appspot.com',
  messagingSenderId: '87894079592',
  appId: config.APPID,
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
