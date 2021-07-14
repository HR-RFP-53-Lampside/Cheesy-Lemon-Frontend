/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Paper, Box, Typography, TextField, Button, Container, Hidden,
} from '@material-ui/core';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SpacingDesign from '../context/design/SpacingDesign';
import backgroundBG from '../../assets/lowpoly2.png';

const RegisterStart = () => {
  const themeDesign = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const setDbUser = (user) => {
    const dbUser = {
      aboutMe: '',
      dietaryPrefs: '',
      email: user.email,
      firstName: '',
      lastName: '',
      photoURL: user.photoURL || '',
      uid: user.uid,
      username: user.email.split('@')[0],
      yummyPoints: 0,
    };
    firebase.database().ref(`users/${user.uid}`).set(dbUser).catch((error) => new Error(error));
  };

  const updateFormUser = (event) => {
    if (userMessage) { setUserMessage(''); }
    setUsername(event.target.value);
  };

  const updateFormPass = (event) => {
    if (userMessage) { setUserMessage(''); }
    setPassword(event.target.value);
  };

  const updateFormPassVerify = (event) => {
    if (userMessage) { setUserMessage(''); }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setUserMessage('Successfully registered!');
        setDbUser(user);
      })
      .catch((error) => {
        const { message } = error;
        event.target.reset();
        setUsername('');
        setPassword('');
        setUserMessage(message);
      });
  };

  const passwordValidity = () => {
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');

    if (password1.value === password2.value) {
      password2.setCustomValidity('');
    } else {
      password2.setCustomValidity('Passwords must match');
    }
  };

  return (
    <Box display="flex">
      <Container
        maxWidth="sm"
        style={{
          flexGrow: 1, flexBasis: '20%', alignSelf: 'center', maxHeight: '90vh',
        }}
      >
        <Typography variant="h2" align="center" style={{ color: themeDesign.custom.muted.grey }}>
          Register
        </Typography>
        <Typography variant="h5" align="center" style={{ color: themeDesign.custom.muted.grey }}>
          Be elevated
        </Typography>
        <Paper elevation={3} style={{ ...SpacingDesign.margin(3), ...SpacingDesign.padding(3) }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              helperText="email@mail.com"
              variant="filled"
              type="email"
              required
              style={{ width: '100%' }}
              onChange={(event) => updateFormUser(event)}
            />
            <TextField
              label="Password"
              helperText="account password"
              variant="filled"
              required
              inputProps={{ minLength: 6 }}
              type="password"
              id="password1"
              style={{ width: '100%' }}
              onChange={(event) => { setPassword(event.target.value); passwordValidity(); }}
            />
            <TextField
              label="Re-password"
              helperText="re enter password"
              variant="filled"
              required
              inputProps={{ minLength: 6 }}
              type="password"
              id="password2"
              style={{ width: '100%' }}
              onChange={(event) => { setPassword(event.target.value); passwordValidity(); }}
            />
            <Box align="right" style={SpacingDesign.marginy(1.5)}>
              <Button
                variant="contained"
                color="primary"
                style={SpacingDesign.paddingx(5)}
                type="submit"
                align="right"
              >
                <Typography color="textPrimary">
                  Be elevated
                </Typography>
              </Button>
            </Box>
          </form>
          { userMessage
            ? (
              <Box bgcolor="warning.main" align="center" borderRadius={5} style={SpacingDesign.padding(1)}>
                <Typography color="textPrimary">
                  {userMessage}
                </Typography>
              </Box>
            )
            : null}
          <Button component={Link} to="/login">
            <Typography style={{ color: themeDesign.palette.info.light }}>
              been elevated? Rise up!
            </Typography>
          </Button>
        </Paper>
      </Container>
      <Hidden mdDown>
        <Paper
          style={{
            flexBasis: '40%',
            flexGrow: 0.5,
            height: 'calc(90vh + 3.5em)',
            overflow: 'hidden',
            borderRadius: '0',
          }}
          elevation={20}
        >
          <Image
            src={backgroundBG}
            cover
            imageStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
            style={{ height: '100%' }}
          />
        </Paper>
      </Hidden>
    </Box>
  );
};

export default RegisterStart;
