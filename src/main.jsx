/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import App from './component/App';
import config from './config/config';
import test from './routing/routingtest';

test();

const firebaseConfig = config;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
